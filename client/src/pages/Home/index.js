import React, { useState, useEffect } from "react";
import "./style.scss";
// import axios from "axios";
// import { apiURL } from "../../utils/apiURL";
import { Images } from "../../utils/Images";

import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorsListComponet from "../../components/User/DoctorsList/index";

const Index = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //fetch Doctors
  // const fetchDoctors = async () => {
  //   try {
  //     const response = await axios.get(`${apiURL}/client/doctors`);
  //     console.log(response);
  //     setDoctor(response.data.doctor);
  //     setLoading(false);
  //   } catch (error) {
  //     if (error) console.log(console.response);
  //   }
  // };

  useEffect(() => {
    // const geo = navigator.geolocation;
    // if (!geo) {
    //   alert("Geoloacation is not supported");
    //   return;
    // }
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    // });
    console.log("Home");
    setLoading(true);
  }, []);
  return (
    <>
      <div className="home">
        <NavbarComponent />
        <div className="header py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 content d-none d-lg-block">
                <h1>Search Doctors</h1>
                <h5>Choose your nearest specialist</h5>
              </div>
              <div className="col-12 col-lg-6 image-column text-center">
                <img src={Images.PeopleSearch} alt="..." />
              </div>
            </div>
          </div>
        </div>

        {/* Nearest or suggested Doctor */}

        <div className="col-12 py-4 py-lg-5 text-center">
          <h3 className="font-weight-bold mb-0 text-white">
            {doctor.length !== 0
              ? `Found  ${doctor.length} Doctors`
              : "Search Nearest Doctors"}
          </h3>
        </div>

        <SearchComponent setDoctor={setDoctor} setLoading={setLoading} />

        <div className="suggested-doctors">
          <DoctorsListComponet doctors={doctor} loading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Index;
