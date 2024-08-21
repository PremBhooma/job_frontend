import React, { useEffect, useState } from "react";
import { BASEURL } from "../../Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { UserState } from "../../Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import "../DataTable/Table.css";

const UserList = () => {
  const { user } = UserState();
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [selected, setSelected] = useState();

  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ================================= Get Categoryies Start =============================== //

  const getData = async () => {
    try {
      const response = await axios.get(`${BASEURL}api/category/get`);
      console.log("Categories", response);
      setData(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (render) setRender(false);
    getData();
  }, [render]);

  // ================================= Get Categoryies End ================================= //

  // ================================= Delete Categoryies Start ============================ //

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}api/category/delete/${id}`);
      if (response?.data?.errorcode === 0) {
        setRender(true);
        toast.error("Category Delete Successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ================================= Delete Categoryies End =============================== //

  // ================================= Table Start ========================================== //

  const customStyles = {
    header: {
      style: {},
    },
    headRow: {
      style: {
        backgroundColor: "#3f687f",
        color: "white",
        // width: "max-content",
      },
    },
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "700",
      },
    },
    cells: {
      style: {},
    },
  };

  const columns = [
    {
      name: "Sr.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Id",
      selector: (row) => <div>{row?._id}</div>,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => <div>{row?.name}</div>,
      sortable: true,
    },
    {
      name: "Date & Time",
      selector: (row) => <div>{moment(row?.created_ts).format("llll")}</div>,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => "Edit | Delete",
      sortable: true,
      cell: (row) => (
        <div className="action-cell">
          <div onClick={() => handleEdit(row?._id)}>Edit</div> | <div onClick={() => handleDelete(row?._id)}>Delete</div>
        </div>
      ),
    },
  ];

  // ================================= Table End =========================================== //

  const handleEdit = (id) => {
    setSelectedData(id);
    setEditModalShow(true);
  };

  return (
    <>
      <ToastContainer />

      <AddModal show={addModalShow} onHide={() => setAddModalShow(false)} setRender={setRender} setIsLoading={setIsLoading} isLoading={isLoading} />
      <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} setRender={setRender} setIsLoading={setIsLoading} isLoading={isLoading} selectedData={selectedData} data={data} />

      <div className="addBtn">

        <button className="exportBtn" onClick={() => setAddModalShow(true)}>
          Add
        </button>
      </div>

      <div className="productTable">
        <DataTable columns={columns} data={data} className="DataTableStyle adminorder catBlock" customStyles={customStyles} highlightOnHover pagination></DataTable>
      </div>
    </>
  );
};

export default UserList;

function AddModal(props) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.setIsLoading(true);

      const validationErrors = {};
      if (!name) {
        validationErrors.name = "Name is required";
      }
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const response = await axios.post(`${BASEURL}api/category/create`, {
          name: name,
        });
        if (response?.data?.errorcode === 0) {
          setName("");
          props.setIsLoading(false);
          props.setRender(true);
          toast.success("Category Created", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          props.onHide();
        } else if (response?.data?.errorcode === 2) {
          props.setIsLoading(false);
          toast.error("Category Already Exist", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
      props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      console.error("Error in Creating Category", error);
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="addCategoryModal reportedProblemModal">
          <div className="closeModalBtn" onClick={props.onHide}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <h4>Add Category</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              {!name && errors?.name && <div className="errorMessage">{errors?.name}</div>}
            </Form.Group>

            <div className="formBtn">
              {props.isLoading ? (
                <button type="button">
                  <Spinner animation="border" role="status" /> Loading...
                </button>
              ) : (
                <button type="button" className="exportAddBtn" onClick={handleSubmit}>
                  Add
                </button>
              )}

              <button type="button" className="cancleBtn" onClick={props.onHide}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function EditModal(props) {
  const [name, setName] = useState("");

  let categoryId = props.selectedData;

  useEffect(() => {
    const item = props?.data?.find((item) => categoryId === item?._id);

    if (item) {
      setName(item?.name || "");
    }
  }, [props?.selectedData, props?.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.setIsLoading(true);

      const response = await axios.patch(`${BASEURL}api/category/edit`, {
        id: categoryId,
        name: name,
      });
      if (response?.data?.errorcode === 0) {
        props.setIsLoading(false);
        props.setRender(true);
        toast.success("Category Updated", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        props.onHide();
      } else if (response?.data?.errorcode === 1) {
        props.setIsLoading(false);
        toast.error("Id Not Found", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (response?.data?.errorcode === 2) {
        props.setIsLoading(false);
        toast.error("Category Not Found", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error in Updating category", error);
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="bgModal">
      <Modal.Body>
        <div className="addCategoryModal reportedProblemModal">
          <div className="closeModalBtn" onClick={props.onHide}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <h4>Update Category</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <div className="formBtn">
              {props.isLoading ? (
                <button type="button">
                  <Spinner animation="border" role="status" /> Loading...
                </button>
              ) : (
                <button type="button" className="exportAddBtn" onClick={handleSubmit}>
                  Update
                </button>
              )}

              <button type="button" className="cancleBtn" onClick={props.onHide}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
