import React, { useEffect, useState } from "react";
import { BASEURL } from "../../Constant";
import { UserState } from "../../Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import "../DataTable/Table.css";

const UserList = () => {
    const { user } = UserState();
    const [data, setData] = useState([]);

    const [render, setRender] = useState(false);

    // ================================= Get Categoryies Start =============================== //

    const getData = async () => {
        try {
            const response = await axios.get(`${BASEURL}api/newsletter/get-all-newsletter`);
            console.log("NewsLetter", response);
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
            const response = await axios.delete(`${BASEURL}api/newsletter/delete/${id}`);
            if (response?.data?.errorcode === 0) {
                setRender(true);
                toast.error("NewsLetter Delete Successfully", {
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

    // ================================= Table Start ========================================= //

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
            name: "Email",
            selector: (row) => <div>{row?.email}</div>,
            sortable: true,
        },
        {
            name: "Date & Time",
            selector: (row) => <div>{moment(row?.created_ts).format("llll")}</div>,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => "Delete",
            sortable: true,
            cell: (row) => (
                <div className="action-cell">
                    <div className="delBtn" onClick={() => handleDelete(row?._id)}>Delete</div>
                </div>
            ),
        },
    ];

    // ================================= Table End =========================================== //


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
                    pagination>
                </DataTable>
            </div>
        </>
    );
};

export default UserList;

