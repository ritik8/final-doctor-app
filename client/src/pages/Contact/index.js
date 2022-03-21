import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { ic_phone, ic_markunread, ic_location_on } from "react-icons-kit/md";
import { printer } from "react-icons-kit/icomoon";
import { Images } from "../../utils/Images";
import NavbarCompoent from "../../components/User/Navbar/index";

import "./style.scss";

toast.configure({ autoClose: 2000 });
const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="contact">
      <NavbarCompoent />

      {/* Banner */}
      <div className="banner">
        <div className="container banner-container">
          <div className="row">
            <div className="col-12 col-lg-12 text-center text-lg-left">
              <img src={Images.Contact} className="img-fluid" alt="..." />
            </div>
            <div className="col-12 col-lg-12 text-center text-lg-right content text-white">
              <h1 className="text-white">Contact</h1>
              <p>
                Doctor OPD appointment web app to help you make appointments
                online
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-12 contact-utilities mb-4 mb-lg-0">
        <div className="card border-0 mb-5">
          <div className="card-body p-4">
            <div className="d-flex">
              <div>
                <Icon icon={ic_phone} size={18} className="icon" />
              </div>
              <div className="ms-5">
                <p>phone number</p>
                <small>+91 98456-79876</small>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 mb-5">
          <div className="card-body p-4">
            <div className="d-flex">
              <div>
                <Icon icon={ic_markunread} size={18} className="icon" />
              </div>
              <div className="ms-5">
                <p>email address</p>
                <small>example@gmail.com</small>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 mb-5">
          <div className="card-body p-4">
            <div className="d-flex">
              <div>
                <Icon icon={ic_location_on} size={18} className="icon" />
              </div>
              <div className="ms-5">
                <p>Location</p>
                <small>sector 14, udaipur</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
