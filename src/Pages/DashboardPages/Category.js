import React, { useEffect } from "react";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import "../DashboardPages/Dashboard.css";
import Header from "../Includes/Header/Header";
import CategoryTable from "./DataTable/CategoryTable";

import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { user, setUser } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="mainBlock">
        <div className="mobileHide">
          <LeftPanel />
        </div>
        <div className="container vhCat">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="dashboardContainer">
                <div className="dashboardBox dashboardMainBox">
                  <div className="title">
                    <h4>Category</h4>
                  </div>
                  <CategoryTable /> 
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
};

export default Category;
