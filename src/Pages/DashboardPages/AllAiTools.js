import React, { useEffect } from "react";
import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import Header from "../Includes/Header/Header";
import AllAiToolsTable from "./DataTable/AllAiToolsTable";
import "../DashboardPages/Dashboard.css";


const AllAiTools = () => {
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
        <div className="container vhDash">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="dashboardContainer">
                <div className="dashboardBox dashboardMainBox">
                  <div className="title">
                    <h4>AI Tools</h4>
                  </div>
                  <AllAiToolsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAiTools;
