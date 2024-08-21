import React, { useState } from "react";
import { UserState } from "../../Context";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faFileCircleQuestion, faHome, faLayerGroup, faPowerOff, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../../img/logo/mantralogo.png";
import "./LeftPanel.css";

const LeftPanel = () => {
  const { user, setUser } = UserState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser({});
    navigate("/login");
  };

  return (
    <>
      <div className="leftPanel">
        <div className="leftPanelList">
          <div className="navigationLogo">
            {/* <img src={logo} alt="logo" className="img-fluid" /> */}
            <h2 className="logoText">AI Eternals</h2>
          </div>
          <ul>
            <NavLink exact="true" activeclassname="active" to="/">
              <div className="accSingleItems">
                <li>
                  <div className="leftPanelListIcon">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                  <div className="leftPanelListName">Dashboard</div>
                </li>
              </div>
            </NavLink>

            <NavLink exact="true" activeclassname="active" to="/category">
              <div className="accSingleItems">
                <li>
                  <div className="leftPanelListIcon">
                    <FontAwesomeIcon icon={faLayerGroup} />
                  </div>
                  <div className="leftPanelListName">Category</div>
                </li>
              </div>
            </NavLink>

            <Accordion flush>
              <Accordion.Item eventKey="0" className="accRadius">
                <Accordion.Header className="accBtn">
                  <div className="accSingleItems">
                    <div className="leftPanelListIcon">
                      <FontAwesomeIcon icon={faBoxOpen} />
                    </div>
                    <div className="leftPanelListNameA">AI Tools</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accBox">
                  <div className="accItems">
                    <div className="accSingleItems">
                      <NavLink exact="true" activeclassname="active" to="/allaitools">
                        <li>
                          <div className="leftPanelListIcon">
                            <FontAwesomeIcon icon={faWandMagicSparkles} />
                          </div>
                          <div className="leftPanelListName">All AI Tools</div>
                        </li>
                      </NavLink>
                    </div>
                    <div className="accSingleItems">
                      <NavLink exact="true" activeclassname="active" to="/addproduct">
                        <li>
                          <div className="leftPanelListIcon">
                            <FontAwesomeIcon icon={faWandMagicSparkles} />
                          </div>
                          <div className="leftPanelListName">Add AI Tools</div>
                        </li>
                      </NavLink>
                    </div>
                    {/* <p>Products</p> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <NavLink exact="true" activeclassname="active" to="/contact-enquire">
              <div className="accSingleItems">
                <li>
                  <div className="leftPanelListIcon">
                    <FontAwesomeIcon icon={faFileCircleQuestion} />
                  </div>
                  <div className="leftPanelListName">Contact Enquire</div>
                </li>
              </div>
            </NavLink>

            <NavLink exact="true" activeclassname="active" to="/newsletter">
              <div className="accSingleItems">
                <li>
                  <div className="leftPanelListIcon">
                    <FontAwesomeIcon icon={faFileCircleQuestion} />
                  </div>
                  <div className="leftPanelListName">NewsLetter</div>
                </li>
              </div>
            </NavLink>
          </ul>
        </div>
        <div className="profileBox">
          {/* <div className="profileImg" style={{ backgroundImage: `url(${user?.profilepic})` }}></div> */}
          <div className="profileName">
            <h2>{user?.name}</h2>
          </div>
          <div onClick={handleLogOut} className="logoutIcon">
            <FontAwesomeIcon icon={faPowerOff} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
