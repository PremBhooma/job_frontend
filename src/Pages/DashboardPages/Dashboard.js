import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../Constant";
import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";
import { faUsers, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import Header from "../Includes/Header/Header";
import axios from "axios";
import "../DashboardPages/Dashboard.css";

const Dashboard = () => {
  const { user } = UserState();
  const navigate = useNavigate();
  const [countdata, setCountData] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const getCountData = async () => {
    try {
      const response = await axios.get(`${BASEURL}api/count/get-count`);
      setCountData(response?.data?.data);
      console.log("Count", response?.data?.data)
    } catch (error) {
      console.log(error.msg);
    }
  };

  useEffect(() => {
    getCountData();
  }, []);



  const middata = [
    {
      route: "/allaitools",
      icon: faUsers,
      title: "AI Tools",
      value: 14208,
      total: countdata?.aiToolCount || 0,
      color: "#009444",
    },
    {
      route: "/category",
      icon: faShoppingCart,
      title: "Category",
      value: 2314,
      total: countdata?.categoryCount || 0,
      color: "#DF8600",
    },
    {
      route: "/contact-enquire",
      icon: faShoppingCart,
      title: "Contact Enquires",
      value: 2314,
      total: countdata?.contactUsCount || 0,
      color: "#00dfcc",
    },
    {
      route: "/newsletter",
      icon: faShoppingCart,
      title: "NewsLetter",
      value: 2314,
      total: countdata?.newsLetterCount || 0,
      color: "#00dfcc",
    },
  ];

  return (
    <>
      <Header />
      <div className="mainBlock">
        <div className="mobileHide">
          <LeftPanel />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="dashboardContainer">
                <div className="dashboardMainBox">
                  <div className="title">
                    <h4>Welcome to AI Eternals</h4>
                  </div>
                  <div className="dashboardCardBox">
                    <div className="row">
                      {middata.map((item, index) => (
                        <div key={index} className={`col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 `}>
                          <Link to={item?.route}>
                            <div className={`dashboardmidCard`} style={{ backgroundColor: `${item?.color}` }}>
                              <div className="dashboardmidcardtitle">
                                <p>{item?.total}</p>
                                <p>{item?.title}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
