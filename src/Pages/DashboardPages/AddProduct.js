import { BASEURL } from "../Constant";
import React, { useState, useEffect, useRef } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import Header from "../Includes/Header/Header";
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "react-bootstrap/Spinner";
import TagsInput from "react-tagsinput";
import "../DashboardPages/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState();
  const [category, setCategory] = useState();
  const [name, setName] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  // const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [coupon, setCoupon] = useState("");
  const [subscriptionTier, setSubscriptionTier] = useState("");

  const [tags, setTags] = useState([]);

  // ====== Image Drag and Drop Start ===== //

  const uploadFileHandler = (file) => {
    console.log("Uploaded file:", file);
    setImages((prevImages) => {
      const newImages = [
        ...prevImages,
        {
          name: file.name,
          url: URL.createObjectURL(file),
          file: file, // Store the file data
        },
      ];

      console.log("New images state:", newImages);
      return newImages;
    });
  };

  const onFileSelect = (event) => {
    const files = event.target.files;
    console.log("Selected files:", files);
    console.log("files", files[0].name);
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] === "image") {
        uploadFileHandler(files[i]);
      }
    }
  };

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    onFileSelect({ target: { files } });
  };

  // ===== Image Drag and Drop End ===== //

  const handleHideAlert = () => {
    setShowAlert(false);
    setShowErrorAlert(false);
    navigate(`/allproduct`);
    // window.location.reload();
  };

  const fetchCategory = async () => {
    await Axios.get(`${BASEURL}api/category/get`).then((data) => {
      setCategoryData(data.data.data);
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = {};

      if (!images) {
        validationErrors.images = "image is required";
      }

      if (!name) {
        validationErrors.name = "name is required";
      }

      if (!shortDescription) {
        validationErrors.shortDescription = "description is required";
      }

      if (!subscriptionTier) {
        validationErrors.subscriptionTier = "Sub Scription Tier is required";
      }

      if (!url) {
        validationErrors.url = "Website URL is required";
      }


      // if (!price) {
      //   validationErrors.price = "Price is required";
      // }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("name", name);
        formData.append("shortDescription", shortDescription);
        formData.append("subscriptionTier", subscriptionTier);
        formData.append("coupon", coupon ? coupon : null);
        formData.append("url", url);
        formData.append("tags", JSON.stringify({ tag: tags }));

        images.forEach((image, index) => {
          formData.append(`image`, image.file);
        });

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        setIsLoading(true);
        try {
          const response = await Axios.post(`${BASEURL}api/aitool/create`, formData, config);
          console.log(response);
          if (response.data.errorcode === 0) {
            setIsLoading(false);
            toast.success("AI Tool Created Sucessfully", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              onClose: () => {
                navigate("/allproduct");
              },
            });
          } else {
            setIsLoading(false);
            setShowErrorAlert(true);
            console.error("Server error:", response.status, response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          setShowErrorAlert(true);
          console.error("Request failed:", error);
          if (error.response) {
            console.error("Server responded with error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up the request:", error.message);
          }
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <SweetAlert success show={showAlert} title="Great" onConfirm={handleHideAlert}>
        <p>AI Tool Added Succesfully</p>
      </SweetAlert>
      <SweetAlert danger show={showErrorAlert} title="Ohh!" onConfirm={handleHideAlert}>
        <p>Product Already Exists</p>
      </SweetAlert>

      <Header />
      <div className="mainBlock vhProduct">
        <div className="mobileHide">
          <LeftPanel />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              {/* <div className="dashboardContainer">
                <div className="dashboardBox dashboardMainBox"> */}
              <div className="title">
                <h4>Add Product</h4>
              </div>
              {/* <div className="managementContent"> */}
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  <div className="contentBox">
                    <div className="row">
                      <div>
                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            AI Tool Title
                          </label>
                          <input type="text" className={`form-control inpControl  ${!name && errors.name ? "error" : ""}`} placeholder="AI Tool title here" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                          {!name && errors.name && <div className="errorMessage">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label inpCol">
                            AI Tool Discription
                          </label>
                          <textarea className={`form-control inpControl  ${!shortDescription && errors.shortDescription ? "error" : ""}`} rows={5} defaultValue={""} placeholder="Write your note..." type="text" name="description" value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} />
                          {!shortDescription && errors.shortDescription && <div className="errorMessage">{errors.shortDescription}</div>}
                        </div>

                        {/* <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Price
                          </label>
                          <input type="number" className={`form-control inpControl  ${!price && errors.price ? "error" : ""}`} placeholder="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                          {!price && errors.price && <div className="errorMessage">{errors.price}</div>}
                        </div> */}

                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Website URL
                          </label>
                          <input type="text" className={`form-control inpControl  ${!url && errors.url ? "error" : ""}`} placeholder="Website URL" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                          {!url && errors.url && <div className="errorMessage">{errors.url}</div>}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Subscription Tier
                          </label>
                          <select className={`form-select inpControl ${!subscriptionTier && errors.subscriptionTier ? "error" : ""}`} name="subscriptionTier" value={subscriptionTier} onChange={(e) => setSubscriptionTier(e.target.value)}>
                            <option>Select Subscription Tier</option>
                            <option value="freemium">Freemium</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                          </select>
                          {!subscriptionTier && errors.subscriptionTier && <div className="errorMessage">{errors.subscriptionTier}</div>}
                        </div>

                        {subscriptionTier && subscriptionTier === "paid" && (
                          <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                              Coupon
                            </label>
                            <input type="text" className={`form-control inpControl`} placeholder="Coupon" name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                          </div>
                        )}


                        <div className="row mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Tags
                          </label>
                          <div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div>
                                <TagsInput className="form-control inpControl  custom-tags-input" value={tags.filter((tag) => tag.trim() !== "")} onChange={(tag) => setTags(tag)} />
                                {tags.error && <div className="text-danger">{tags.error}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="contentBoxLeft">
                    <div className="mb-3">
                      <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                        Category
                      </label>
                      <select className={`form-select inpControl ${!category && errors.category ? "error" : ""}`} name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option selected>Select Category</option>
                        {categoryData &&
                          categoryData?.map((curElt) => {
                            return (
                              <>
                                <option value={curElt?._id}>{curElt?.name}</option>
                              </>
                            );
                          })}
                      </select>
                      {!category && errors.category && <div className="errorMessage">{errors.category}</div>}
                    </div>
                  </div>

                  <div className="contentBoxLeft">
                    <div className="mb-3">
                      <div className="card1">
                        <div className="top">
                          <p>Drag & Drop image uploading</p>
                        </div>
                        <div className={`drag-area ${isDragging ? "drag-over" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                          {isDragging ? (
                            <span className="select">Drop Images here</span>
                          ) : (
                            <>
                              Drag & Drop image here or{" "}
                              <span className="select" role="button" onClick={() => fileInputRef.current.click()}>
                                Browse
                              </span>
                            </>
                          )}

                          <input name="file" type="file" accept="image/*" className={`file ${!images && errors.images ? "error" : ""}`} multiple ref={fileInputRef} onChange={onFileSelect} />
                        </div>
                        <div className="container">
                          {images.map((image, index) => (
                            <div className="image" key={index}>
                              <span className="delete" onClick={() => deleteImage(index)}>
                                &times;
                              </span>
                              <img src={image.url} alt={image.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="addProductBtn">
                {isLoading ? (
                  <button type="button">
                    <Spinner animation="border" role="status" /> Loading...
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit}>
                    Add
                  </button>
                )}
              </div>
              {/* </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
