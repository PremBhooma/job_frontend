import React, { useState } from "react";
import "./Header.css";
import logo from "../../../img/logo/mantralogo.png";
import { Link, NavLink, Navigate } from "react-router-dom";

import LeftPanel from "../LeftPanel/LeftPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxOpen,
  faEnvelope,
  faFileCircleQuestion,
  faHeadset,
  faHome,
  faLayerGroup,
  faPeopleGroup,
  faPowerOff,
  faRectangleList,
  faTimes,
  faUsers,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { UserState } from "../../Context";

const Header = () => {
  const handleLogOut = () => {
    setUser({});
    Navigate("/login");
  };

  const [active, setActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, setUser } = UserState();

  return (
    <>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="desktopHide">
                <div className="mobileNavigationBox">
                  <div>
                    {/* <Link to="/"> 
                      <img src={logo} alt="logo" className="img-fluid" />
                    </Link> */}
                    <h2 className="logoText">AI Eternals</h2>
                  </div>
                  <div className="mobileNavToggle" onClick={toggleMenu}>
                    {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                  </div>
                </div>
                <div className="toggleLeftPannel">
                  {isOpen && (
                    <div className="leftPanel assss">
                      <div className="leftPanelList">
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
                        <div className="profileName">
                          <h2>{user?.name}</h2>
                        </div>
                        <div onClick={handleLogOut} className="logoutIcon">
                          <FontAwesomeIcon icon={faPowerOff} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='desktopHide'>
                                <div className='mobileNavigation'>
                                    <ul>
                                        <li>
                                            <Link to="/">
                                                <img src={logo} alt="logo" className='img-fluid' />
                                            </Link>
                                        </li>
                                        <li>
                                            <div className="menubar">
                                                <div className="mobile-menu" onClick={() => setActive(!active)}>
                                                    <div className={active ? 'menu_click active' : 'menu_click'}>
                                                        <div id="top"></div>
                                                        <div id="middle"></div>
                                                        <div id="bottom"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className={active ? "mobilePanel active" : "mobilePanel"}>
        <LeftPanel />
      </div>
    </>
  );
};

export default Header;
