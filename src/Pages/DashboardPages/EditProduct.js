import React, { useState, useEffect, useRef } from "react";
import { BASEURL } from "../Constant";
import { UserState } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import Header from "../Includes/Header/Header";
import Spinner from "react-bootstrap/Spinner";
import TagsInput from "react-tagsinput";
import axios from "axios";
import "../DashboardPages/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [shortDescription, setshortDescription] = useState();
  const [subscriptionTier, setSubscriptionTier] = useState();
  const [coupon, setCoupon] = useState();
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [images, setImages] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [tags, setTags] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // ========================================= Get Single AI Tools Start ========================================= //

  const getData = async () => {
    try {
      const response = await axios.get(`${BASEURL}api/aitool/get-ai-tool-by-id/${id}`);
      const responseCat = await axios.get(`${BASEURL}api/category/get`);
      setCategoryData(responseCat?.data?.data);

      setData(response?.data?.data);
      setName(response?.data?.data?.name);
      setshortDescription(response?.data?.data?.shortDescription);
      // setPrice(response?.data?.data?.price);
      setCoupon(response?.data?.data?.coupon);
      setUrl(response?.data?.data?.url);
      setSubscriptionTier(response?.data?.data?.subscriptionTier);
      setTags(response?.data?.data?.tags?.tag || []);
      setCategory(response?.data?.data?.category?._id);
      if (response?.data?.data?.image) {
        setImages({ name: response.data.data.image, url: response.data.data.image });
      } else {
        setImages(null);
      }
    } catch (error) {
      console.log("Error in get single Ai Tools Data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  // ========================================= Get Single AI Tools End =========================================== //

  // ========================================= Image Drag and Drop Start ========================================= //

  // Image Drag and Drop Start
  const uploadFileHandler = (file) => {
    console.log("Uploaded file:", file);
    setImages({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file, // Store the file data
    });
  };

  const onFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFileHandler(file);
    }
  };

  const deleteImage = () => {
    setImages(null);
  };

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

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFileHandler(file);
    }
  };

  // ========================================= Image Drag and Drop End ============================================== //

  // ========================================= Patch Method AI Tools Starts =========================================== //

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("id", id);
      formData.append("category", category);
      formData.append("name", name);
      formData.append("shortDescription", shortDescription);
      formData.append("subscriptionTier", subscriptionTier);
      // formData.append("price", price);
      formData.append("url", url);
      formData.append("coupon", coupon ? coupon : null);
      formData.append("tags", JSON.stringify({ tag: tags }));
      formData.append("image", images.file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setIsLoading(true);
      try {
        const response = await axios.patch(`${BASEURL}api/aitool/edit`, formData, config);
        console.log(response);
        if (response.data.errorcode === 0) {
          setIsLoading(false);
          toast.success("AI Tool Updated Sucessfully", {
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
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // ========================================= Patch Method AI Tools End ============================================== //

  return (
    <>
      <ToastContainer />

      <Header />
      <div className="mainBlock vhProduct">
        <div className="mobileHide">
          <LeftPanel />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="title">
                <h4>Edit Product</h4>
              </div>
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  <div className="contentBox">
                    <div className="row">
                      <div>
                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            AI Tool Title
                          </label>
                          <input type="text" className={`form-control inpControl`} placeholder="AI Tool title here" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label inpCol">
                            AI Tool Discription
                          </label>
                          <textarea className={`form-control inpControl `} rows={5} defaultValue={""} placeholder="Write your note..." type="text" name="description" value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} />
                        </div>

                        {/* <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Price
                          </label>
                          <input type="number" className={`form-control inpControl`} placeholder="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div> */}

                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Website URL
                          </label>
                          <input type="text" className={`form-control inpControl`} placeholder="Website URL" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="formGroupExampleInput" className="form-label inpCol">
                            Subscription Tier
                          </label>
                          <select className={`form-select inpControl`} name="subscriptionTier" value={subscriptionTier} onChange={(e) => setSubscriptionTier(e.target.value)}>
                            <option>Select Subscription Tier</option>
                            <option value="freemium">Freemium</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                          </select>
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
                                <TagsInput className="form-control inpControl  custom-tags-input" value={tags} onChange={(tag) => setTags(tag)} />
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
                      <select className={`form-select inpControl`} name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option selected>Select Category</option>
                        {categoryData &&
                          categoryData?.map((curElt, index) => {
                            return (
                              <>
                                <option value={curElt?._id}>{curElt?.name}</option>
                              </>
                            );
                          })}
                      </select>
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

                          <input name="file" type="file" accept="image/*" className={`file`} multiple ref={fileInputRef} onChange={onFileSelect} />
                        </div>
                        <div className="container">
                          {images && (
                            <div className="image">
                              <span className="delete" onClick={deleteImage}>
                                &times;
                              </span>
                              <img src={images.url} alt={images.name} />
                            </div>
                          )}
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
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
