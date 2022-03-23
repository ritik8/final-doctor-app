import React, { useState } from "react";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_home, ic_people, ic_person, ic_lock } from "react-icons-kit/md";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
import { Images } from "../../../utils/Images";

const Index = ({ user }) => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // Logout
  const doLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/auth/logout`, header);
      if (response.status === 200) {
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      if (error) {
        localStorage.clear();
        history.push("/");
      }
    }
  };

  localStorage.setItem(
    "userEmail",
    JSON.stringify(user.email.substring(0, user.email.indexOf("@")))
  );
  localStorage.setItem("userName", JSON.stringify(user.name));
  localStorage.setItem("userImage", JSON.stringify(user.image));

  return (
    <div className="patient-sidemenu">
      {/* Header */}
      <div className="header">
        <div className="d-flex">
          <div className="img-box rounded-circle">
            {user.image ? (
              <img src={user.image} className="img-fluid" alt="..." />
            ) : (
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            )}
          </div>
          <div className="content pt-3">
            <p className="text-white">
              {user.name
                ? user.name
                : user.email.substring(0, user.email.indexOf("@"))}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="body">
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none text-white"
          to="/home"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_home} size={20} />
            </div>
          </div>
          <p>home</p>
        </NavLink>

        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none text-white"
          to="/patient/profile"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_person} size={20} />
            </div>
          </div>
          <p>my profile</p>
        </NavLink>

        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none text-white"
          to="/patient/appointments"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_people} size={20} />
            </div>
          </div>
          <p>appointments</p>
        </NavLink>

        <button
          type="button"
          className="btn btn-block shadow-none text-white"
          onClick={doLogout}
          disabled={isLoading}
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_lock} size={18} />
            </div>
          </div>
          {isLoading ? <span>Logging out...</span> : <span>logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Index;