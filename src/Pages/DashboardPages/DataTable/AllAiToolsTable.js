import React, { useEffect, useState } from "react";
import { BASEURL } from "../../Constant";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../Context";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import "./Table.css";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const navigate = useNavigate();
  const { user } = UserState();
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(null);

  const [render, setRender] = useState(false);
  const [errors, setErrors] = useState({});



  // =============================================== Get Specialities End =============================================== //

  const getAiToolsData = async (page, perPage) => {
    try {
      const resposne = await axios.get(`${BASEURL}api/aitool/get-all-tools`, {
        params: { page, limit: perPage },
      });
      console.log("AITools_Data", resposne.data.data);
      setCount(resposne?.data?.total);
      setData(resposne?.data?.data);
      setFilteredData(resposne?.data?.data);
      setTotalRows(resposne?.data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}api/aitool/search`, {
        params: { q: searchQuery, page, limit: perPage },
      });
      console.log(response?.data?.data, "Search");
      setFilteredData(response?.data?.data);
      setTotalRows(response?.data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (render) setRender(false);
    if (searchQuery) {
      getSearchData();
    } else {
      getAiToolsData(page, perPage);
    }
  }, [render, page, perPage, searchQuery]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  // =============================================== Get Specialities End =============================================== //

  //  ===================================================== Filter Data Start ============================================= //



  const filterOptions = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = data.filter((item) => item?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedDate !== "") {
      filtered = filtered.filter((ele) => {
        const pickedDate = new Date(ele?.created_ts).toISOString().slice(0, 10);
        return pickedDate === selectedDate;
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterOptions();
  }, [searchQuery, data, selectedDate]);

  //  ===================================================== Filter Data End ================================================ //


  // =============================================== Search and Date Start ======================================================= //

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // =============================================== Search and Date End ======================================================== //


  //  ============================================== Delete Start ===================================================== //

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}api/aitool/delete/${id}`);

      if (response?.data?.errorcode === 0) {
        setRender(true);
        toast.error("Deleted Successfully", {
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
      } else if (response?.data?.errorcode === 1) {
        toast.error("Id Should Present", {
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
        toast.error("Speciality Not Found", {
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
      console.log(error, "Error is Delete");
    }
  };

  //  ===================================================== Delete End ================================================= //

  // =============================================== Table Start ======================================================= //

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
      selector: (row, index) => (page - 1) * perPage + index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Id",
      selector: (row) => <div>{row?._id}</div>,
      sortable: true,

    },
    {
      name: "Image",
      selector: (row) => (
        <div className="productImg">
          <img src={row?.image.location || row?.image} alt="Speciality" />
        </div>
      ),
      width: "150px",
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
          <div onClick={() => navigate(`/editproduct/${row?._id}`)}>Edit</div> | <div onClick={() => handleDelete(row?._id)}>Delete</div>
        </div>
      ),

    },
  ];

  // =============================================== Table End ========================================================= //

  return (
    <>
      <ToastContainer />
      <div className="productTable">
        <DataTable
          columns={columns}
          data={data}
          className="DataTableStyle adminorder catBlock"
          customStyles={customStyles}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}>
        </DataTable>
      </div>
    </>
  );
};

export default UserList;
