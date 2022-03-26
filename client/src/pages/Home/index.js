import React, { useState, useEffect } from "react";
import { Images } from "../../utils/Images";
import { TEXT_CONSTANT } from "../../constants";
import NavbarComponent from "../../components/User/Navbar/index";
import FooterComponent from "../../components/User/Footer/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorsListComponet from "../../components/User/DoctorsList/index";
import { apiURL } from "../../utils/apiURL";
import "./style.scss";
import "./style.css";
import axios from "axios";

const Index = () => {
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [patient_count, setPatientCount]=useState();
  const [doctor_count,setDoctorCount]=useState();
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    setLoading(false);
    check_count();

  }, []);
const check_count=async ()=>{
  const response=await axios.get(`${apiURL}/patient/count`,
    header

  );
  if (response.status === 200) {
    console.log(response);
    setPatientCount(response.data.patient_count);
    setDoctorCount(response.data.doctor_count);
  }
}
  const publicOpinion = [
    {
      name: "Virgie Hatley",
      opinion: TEXT_CONSTANT.PUBLIC_OPINION_1,
      image: Images.Avatar1,
      imageWebP: Images.Avatar1WebP,
      color: "#56729C",
      backgroundColor: "#9EAFC9 ",
    },
    {
      name: "Joe Sanchez",
      opinion: TEXT_CONSTANT.PUBLIC_OPINION_3,
      image: Images.Avatar3,
      imageWebP: Images.Avatar3WebP,
      color: "#C05A6F",
      backgroundColor: "#E89A7D",
    },
    {
      name: "Lynlee Copenhaver",
      opinion: TEXT_CONSTANT.PUBLIC_OPINION_2,
      image: Images.Avatar2,
      imageWebP: Images.Avatar2WebP,
      color: "#926C0D",
      backgroundColor: "#D9B355",
    },
  ];

  const renderOpinionCards = () => {
    const opinionsOutput = publicOpinion.map((item, index) => (
      <div key={`${index} ${item.name}`} className="block- position-relative">
        <div
          className="avator-img position-absolute rounded-circle"
          style={{ backgroundColor: item.backgroundColor }}
        >
          <picture>
            <source type="image/webp" srcSet={item.imageWebP} />
            <img src={item.image} className="img-fluid" alt="user avatar" />
          </picture>
        </div>
        <div className="content pt-5">
          <p className="section-para">{item.opinion}</p>

          <h3 style={{ color: item.color }}>{item.name}</h3>
        </div>
      </div>
    ));
    return opinionsOutput;
  };

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

        <div className="px-lg-5">
          <h2 className="section-title-home text-center">
            What people are saying about Doctor App
          </h2>
          <div className="reviews">{renderOpinionCards()}</div>
        </div>
        <FooterComponent patient_count={patient_count} doctor_count={doctor_count}/>
      </div>
    </>
  );
};

export default Index;