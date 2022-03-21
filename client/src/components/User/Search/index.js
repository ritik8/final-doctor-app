import React, { useState } from "react";
import "./style.scss";
import Select from "react-select";
import { Icon } from "react-icons-kit";
import { ic_search } from "react-icons-kit/md";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
const Index = ({ setDoctor, setLoading }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [specialist, setSpecialist] = useState();
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const options = [
    { value: "Medecine", label: "Medecine" },
    { value: "Psychologist", label: "Psychologist" },
    { value: "Cardiologist", label: "Cardiologist" },
  ];

  //onchange Specialist select
  const onChangeSpecialist = (event) => {
    setSpecialist(event.value);
  };

  const onSubmit = (data) => {
    // const newData = {
    //     lattitude: lat,
    //     longitude: lang,
    //     deases: data.deases,
    //     specialist: specialist
    // }
     const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${apiURL}/patient/doctorlist/${data.city}/${specialist}`,header);
      console.log(response);
      setDoctor(response.data);
      setLoading(false);
    } catch (error) {
      if (error) console.log(console.response);
    }
  }
  fetchDoctors();
    // history.push(
    //   `/search?city=${data.city}&specialist=${
    //     specialist || options[0].value
    //   }`
    // );
  };
  return (
    <div className="search pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                  <div className="flex-fill">
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city", { required: true })}
                      className={
                        errors.deases
                          ? "form-control shadow-none form-control-error"
                          : "form-control shadow-none"
                      }
                    />
                  </div>
                  <div>
                    <Select
                      classNamePrefix="custom-select"
                      styles={customStyles}
                      placeholder={"Select Specialist"}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      options={options}
                      //   defaultValue={options[0]}
                      onChange={onChangeSpecialist}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn shadow-none search">
                      <Icon icon={ic_search} size={28} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: 170,
    height: 45,
    fontSize: 14,
    color: "#000",
    boxShadow: "none",
    "&:hover": { borderColor: "none" },
    border: state.isFocused ? "none" : "none",
    borderRadius: "25px",
  }),
};
