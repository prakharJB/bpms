import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Form = () => {

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    salutation: "",
    gender: "",
    country: "",
    phoneNumber: "",
    project: "",
    projectDeliverDate: "",
    agency: "",
    dob: "",
    timezone: "",
    language: "",
    email: "",
  });
  const [formPortfolio, setFormPortfolio] = useState({
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
  });
  const [portfolioImg, setPortfolioImg] = useState({
    image: "",
    logo: "",
  });
  const location = useLocation();
  const toggle = location?.state?.toggle;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, []);
  const submitData = async (e) => {
    e.preventDefault();

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/client`,
      formData
    );
    let myData = {
      toggle: toggle,
    };
    navigate("/dashboard", { state: myData });
  };
  const submitPortfolioData = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", portfolioImg.image[0]);
    formData.append("logo", portfolioImg.logo[0]);
    formData.append("data", JSON.stringify(formPortfolio));

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/portfolio`,
      formData
    );
    let myData = {
      toggle: toggle,
    };
    navigate("/dashboard", { state: myData });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePortfolioChange = (e) => {
    setFormPortfolio({ ...formPortfolio, [e.target.name]: e.target.value });
  };
  const handleAddDatafile = (e) => {
    setPortfolioImg({ ...portfolioImg, [e.target.name]: e.target.files });
  };

  return (
    <>
      {toggle === true ? (
        <div className="container">
          <div className="col-md-8 offset-md-2">
            <div className="mt-4">
              <h2 className="mt-4"> Add New client</h2>
            </div>

            <form className="mx-1 mx-md-4 mt-4" onSubmit={(e) => submitData(e)}>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
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
              <h2 className="mt-4"> Add New portfolio</h2>
            </div>

            <form
              className="mx-1 mx-md-4 mt-4"
              onSubmit={(e) => submitPortfolioData(e)}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control"
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
                    required
                    name="logo"
                    accept=".png, .gif, .jpeg, .webp"
                    onChange={handleAddDatafile}
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
                    required
                    name="image"
                    accept=".png, .gif, .jpeg, .webp"
                    onChange={handleAddDatafile}
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
