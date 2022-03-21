import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
import { Icon } from "react-icons-kit";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ic_menu, ic_close } from "react-icons-kit/md";
import { Images } from "../../../utils/Images";

const Index = ({}) => {
  const [isShow, setShow] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const history = useHistory();
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );
  console.log(token);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const doLogout = async () => {
    try {
      setLogout(true);
      const response = await axios(`${apiURL}/admin/auth/logout`, header);
      if (response.status === 200) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    } catch (error) {
      if (error) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    }
  };

  return (
    <div className="custom-navnar">
      <div className="main-navbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                {/*logo */}
                <div className="logo">
                  <Link to="/home">
                    <img src={Images.Logo} alt="logo" />
                  </Link>
                </div>
                {/* Toggle BArs */}

                <div className="ml-auto d-lg-none">
                  <Icon
                    icon={ic_menu}
                    size={25}
                    className="bars"
                    onClick={() => setShow(true)}
                  ></Icon>
                </div>
                {/* Menu bar backdrop */}
                <div
                  className={
                    isShow
                      ? "me-auto page-links-menu-bar show-backdrop"
                      : "me-auto page-links-menu-bar align-items-center"
                  }
                  onClick={isShow && (() => setShow(false))}
                >
                  <div className="menu-close d-lg-none">
                    <Icon
                      icon={ic_close}
                      size={35}
                      className="close-icon"
                      onClick={() => setShow(false)}
                    />
                  </div>
                  {/*menu */}
                  <div className={isShow ? "my-menu open-sidemenu" : "my-menu"}>
                    <div className="logo d-lg-none mt-5 text-center">
                      <Link to="/home">
                        <img src={Images.Logo} alt="logo" />
                      </Link>
                    </div>
                    <div className="d-block d-lg-none text-center">
                      <div className="img-box rounded-circle mt-5">
                        <img
                          src={Images.FakeUser}
                          className="img-fluid"
                          alt="fake-user"
                        />
                        {/* )} */}
                      </div>
                      <div className="content mt-3 text-white">
                        <p>Ronak Israni</p>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <NavLink
                          activeClassName="is-Active"
                          exact
                          to="/patient/appointments"
                        >
                          appointments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="is-Active"
                          exact
                          to="/contact-us"
                        >
                          contact
                        </NavLink>
                      </li>
                      {token ? (
                        <>
                          <li>
                            <NavLink
                              activeClassName="is-Active"
                              exact
                              to="/patient/profile"
                            >
                              profile
                            </NavLink>
                          </li>
                          <li>
                            <button
                              activeClassName="is-Active cursor-pointer"
                              onClick={doLogout}
                              disabled={isLogout}
                            >
                              {isLogout ? (
                                <span>Logging out</span>
                              ) : (
                                <span>Logout</span>
                              )}
                            </button>
                          </li>
                        </>
                      ) : (
                        <li>
                          <NavLink
                            activeClassName="is-Active"
                            exact
                            to="/login"
                          >
                            login
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="break"></div>
    </div>
  );
};

export default Index;
