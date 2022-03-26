import React, { useState,useEffect } from "react";
import "./style.scss";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";

const Index = () => {
  const [year] = useState(new Date().getFullYear());
  const [pending_count,setPendingCount]=useState();
  const [app_count,setAppCount]=useState();
  const [id] = useState(localStorage.getItem("id"));
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const [data] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Patient graph",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#fec200",
        borderColor: "#fec200",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fec200",
        pointHoverBorderColor: "#fec200",
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 30, 20],
      },
    ],
  });
  useEffect(() => {
    
    check_count();

  }, []);
  const check_count=async ()=>{
    const response=await axios.get(`${apiURL}/doctor/count/${id}`,
      header
  
    );
    if (response.status === 200) {
      console.log(response);
      setPendingCount(response.data.pending_count);
      setAppCount(response.data.app_count);
    }
  }
  return (
    <div className="dashboard">
      <div className="container-fluid pl-lg-0 py-3 py-lg-0">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="row">
              <div className="col-6 mb-3 pl-lg-0 pr-0">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="card-body">
                    <div className="flex-center flex-column text-center">
                      <h5 className="mb-0">{app_count}</h5>
                      <h6 className="mb-0">Appointments</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="card-body">
                    <div className="flex-center flex-column text-center">
                      <h5 className="mb-0">{pending_count}</h5>
                      <h6 className="mb-0">New Request</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
