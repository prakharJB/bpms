import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Form = () => {
  const location = useLocation();
  const toggle = location?.state?.toggle;
  const client = location?.state?.client;
  const portfolio = location?.state?.portfolio;
  const navigate = useNavigate();

  const [formvalue, setFormValue] = useState("");
  const [formvaluePortfolio, setFormValuePortfolio] = useState({
    title: "",
    feature: "",
    technology: "",
    plugin: "",
    client: "",
    domainName: "",
    natureOfbusiness: "",
    languageOfwebsite: "",
    theme: "",
    link: "",
    id: "",
    image: "",
    logo: "",
  });
  const [formfilesPortfolio, setFormFilesPortfolio] = useState({
    image: "",
    logo: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setFormValue(client);
    setFormValuePortfolio(portfolio);
  }, []);

  const handleChange = async (event) => {
    setFormValue(
      await {
        ...formvalue,

        [event.target.name]: event.target.value,
      }
    );
  };

  const updateClientData = async (e) => {
    e.preventDefault();
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/client/${formvalue._id}`,
      formvalue
    );
    let myData = {
      toggle: toggle,
    };
    navigate("/dashboard", { state: myData });
  };

  const handlePortfolioChange = async (event) => {
    setFormValuePortfolio({
      ...formvaluePortfolio,

      [event.target.name]: event.target.value,
    });
  };
  const handleChangefile = (event) => {
    setFormFilesPortfolio({
      ...formfilesPortfolio,
      [event.target.name]: event.target.files,
    });
    //setaddformImg(event.target.files[0]);
  };

  const updatePortfolioData = async (e) => {
    e.preventDefault();
    const formDataChange = new FormData();

    formDataChange.append("image", formfilesPortfolio.image[0]);
    formDataChange.append("logo", formfilesPortfolio.logo[0]);
    formDataChange.append("data", JSON.stringify(formvaluePortfolio));
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/portfolio/${formvaluePortfolio._id}`,
      formDataChange
    );
    let myData = {
      toggle: toggle,
    };
    navigate("/dashboard", { state: myData });
  };
  return (
    <>
      {toggle === true ? (
        <div className="container">
          <div className="col-md-8 offset-md-2">
            <div className="mt-4">
              <h2 className="mt-4"> Update client</h2>
            </div>

            <form
              className="mx-1 mx-md-4 mt-4"
              onSubmit={(e) => updateClientData(e)}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.salutation}
                    required
                    name="salutation"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Salutation
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example3c"
                    className="form-control"
                    value={formvalue.name}
                    required
                    name="name"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example3c">
                    Client Name
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example4c"
                    className="form-control"
                    value={formvalue.city}
                    required
                    name="city"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example4c">
                    City
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example4cd"
                    className="form-control"
                    value={formvalue.gender}
                    required
                    name="gender"
                    onChange={handleChange}
                  />

                  <label className="form-label" for="form3Example4cd">
                    gender
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.country}
                    required
                    name="country"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Country
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.phoneNumber}
                    required
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Phone number
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.project}
                    required
                    name="project"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Project
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.projectDeliverDate}
                    required
                    name="projectDeliverDate"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Project Delivery
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.agency}
                    required
                    name="agency"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Organization
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.dob}
                    required
                    name="dob"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    date of Birth
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="email"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.email}
                    required
                    name="email"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Email
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.timezone}
                    required
                    name="timezone"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Time Zone
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvalue.language}
                    required
                    name="language"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    Language
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="col-md-8 offset-md-2">
            <div className="mt-4">
              <h2 className="mt-4"> Update portfolio</h2>
            </div>

            <form
              className="mx-1 mx-md-4 mt-4"
              onSubmit={(e) => updatePortfolioData(e)}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.title}
                    required
                    name="title"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    title
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example3c"
                    className="form-control"
                    value={formvaluePortfolio.feature}
                    required
                    name="feature"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example3c">
                    feature
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example4c"
                    className="form-control"
                    value={formvaluePortfolio.technology}
                    required
                    name="technology"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example4c">
                    technology
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example4cd"
                    className="form-control"
                    value={formvaluePortfolio.plugin}
                    required
                    name="plugin"
                    onChange={handlePortfolioChange}
                  />

                  <label className="form-label" for="form3Example4cd">
                    plugin
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.client}
                    required
                    name="client"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    client
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.domainName}
                    required
                    name="domainName"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    domain Name
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.natureOfbusiness}
                    required
                    name="natureOfbusiness"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    nature Of business
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.languageOfwebsite}
                    required
                    name="languageOfwebsite"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    language Of website
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.theme}
                    required
                    name="theme"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    theme
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    value={formvaluePortfolio.link}
                    required
                    name="link"
                    onChange={handlePortfolioChange}
                  />
                  <label className="form-label" for="form3Example1c">
                    link
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="file"
                    id="form3Example1c"
                    className="form-control"
                    name="logo"
                    onChange={handleChangefile}
                  />
                  <label className="form-label" for="form3Example1c">
                    logo
                  </label>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="file"
                    id="form3Example1c"
                    className="form-control"
                    name="image"
                    onChange={handleChangefile}
                  />
                  <label className="form-label" for="form3Example1c">
                    Image
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
