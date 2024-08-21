import React, { useState, useEffect } from "react";
import { BASEURL } from "../Constant";
import { UserState } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import logo from "../../img/logo/mantralogo.png";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";
import "../DashboardPages/Dashboard.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = UserState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = {};

      if (!email) {
        validationErrors.email = "Email is required";
      }

      if (!password) {
        validationErrors.password = "Password is required";
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsLoading(true);
        await Axios.post(`${BASEURL}api/admin/login`, { email, password }).then((data) => {
          setUserData(data.data);
          console.log("user data", data.data);

          if (data.data.errorcode == 0) {
            setIsLoading(false);
            setUser(data.data.data);
            localStorage.setItem("userInfo", JSON.stringify(data.data.data));
            navigate("/");
          } else {
          }
        });
      }
    } catch (error) {
      setShowErrorAlert(true);
      console.log(error.message);
    }
  };

  const handleHideAlert = () => {
    setShowErrorAlert(false);
    window.location.reload();
  };

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);



  return (
    <>
      {isLoading && (
        <div className="loader">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <SweetAlert danger show={showErrorAlert} title="Ohh!" onConfirm={handleHideAlert}>
        <p>Incorrect Email/Password</p>
      </SweetAlert>
      <ToastContainer />

      <section className="container-fluid p-0">
        <div className="loginBg">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="loginLogo">
                  {/* <img src={logo} alt="logo" className="img-fluid" /> */}
                  <h2>AI Eternals</h2>
                </div>
                <div className="LoginForm">
                  <div className="addCategoryModal loginCard">
                    <h4>Login</h4>
                    <form>
                      <div className="formInput">
                        <input type="email" name="managerEmail" id="managerEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={!email && errors.email ? "error" : ""} />
                        {!email && errors.email && <div className="error-message">{errors.email}</div>}
                      </div>
                      <div className="formInput">
                        <input type="password" name="managerPassword" id="managerPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={!password && errors.password ? "error" : ""} />
                        {!password && errors.password && <div className="error-message">{errors.password}</div>}
                      </div>
                      <div className="formBtn">
                        <button type="button" onClick={handleLogin}>
                          {isLoading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
