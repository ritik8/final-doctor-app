import React, { useState } from "react";
import "./style.scss";
import DoctorShowComponent from "../Model/DoctorShow/index";

const Index = ({ doctors,loading }) => {
  const url = " https://doctor-patient-webapp.herokuapp.com/uploads/doctor/profiles/";
  const [show, setShow] = useState(false);
  const [doctor, setDoctor] = useState();
  const [load ,setLoad]= useState(false);

  const closeShow = () => setShow(false);

  // Show Doctor Info
  const shwoDoctorInfo = (data) => {
    setShow(true);
    setDoctor(data);
  };
console.log(loading);
  return (
    <div className="doctors-list-component">
      {!doctors && (
        <div className="container mb-4">
          <div className="row">
            <div className="col-12 text-center text-white">
              <h2>Search Nearset Doctors</h2>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row px-2 px-sm-0">
          {loading ? <div class='spinner-border spin' role='status' style={{marginLeft:"50%"}}><span class='visually-hidden'>Loading...</span></div> : doctors && doctors.map((doctor, i) => (
              <div
                className="doctor-card-container col-6 col-md-4 col-lg-3 p-2"
                key={i}
              >
                <div className="card doctor-card">
                  <div
                    className="card-body"
                    onClick={() => shwoDoctorInfo(doctor)}
                  >
                    <div className="img-box rounded-circle">
                      <img
                        src={url + doctor.image}
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                    <div className="content">
                      <h6>{doctor.name}</h6>
                      <p className="text-capitalize">
                        {doctor.specialist} Specialist
                      </p>
                      <p className="text-capitalize">
                        {doctor.currentHospital}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Show Doctor */}
      {show ? <DoctorShowComponent show={closeShow} doctor={doctor} /> : null}
    </div>
  );
};

export default Index;
