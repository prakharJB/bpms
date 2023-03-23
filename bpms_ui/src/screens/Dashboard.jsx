import { React, useEffect, useState } from "react";
import Header from "../component/Header";
import "../css/main.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clientData, setclientData] = useState();
  const [portfolioData, setPortfolioData] = useState();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, []);

  const fetchClient = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/client`;
      const res = await axios.get(url);
      setclientData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPortfolio = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/portfolio`;
      const res = await axios.get(url);
      setPortfolioData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      fetchPortfolio();
      fetchClient();
      setToggle(location?.state?.toggle);
    }
  }, []);

  const changePortal = () => {
    setToggle(true);
  };
  const changePortalNew = () => {
    setToggle(false);
  };
  const addData = () => {
    let myData = {
      toggle: toggle,
    };
    navigate("/add", { state: myData });
  };

  const deleteClient = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/client/${id}`
      );
      fetchClient();
    } catch (err) {
      console.log(err);
    }
  };

  const updateClient = async (client) => {
    let myData = {
      client: client,
      toggle: toggle,
    };
    navigate("/update", { state: myData });
  };

  const deletePortfolio = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/portfolio/${id}`
      );
      fetchPortfolio();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePortfolio = async (portfolio) => {
    let myData = {
      portfolio: portfolio,
      toggle: toggle,
    };
    navigate("/update", { state: myData });
  };

  const [key, setKey] = useState("");
  const getClientsearch = async (e) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/client/search/${key}`
      );
      setclientData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getPortfoliosearch = async (e) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/portfolio/search/${key}`
      );
      setPortfolioData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div id="container">
        {toggle === true ? (
          <div className="button">
            <button onClick={changePortal}>Client</button>
            <button onClick={changePortalNew}>portfolio</button>
            <button onClick={addData}>Add New Client</button>
          </div>
        ) : (
          <div className="button">
            <button onClick={changePortal}>Client</button>
            <button onClick={changePortalNew}>portfolio</button>
            <button onClick={addData}>Add New Portfolio</button>
          </div>
        )}

        {toggle === true ? (
          <div className="container-content">
            <div className="heading">
              <div>
                <h2>Client Portal</h2>
              </div>
              <div className="addalbumarea">
                <input
                  type="text"
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Search"
                ></input>
                <button onClick={(e) => getClientsearch(e)}>search</button>
              </div>
            </div>
            {clientData === "no data found"  ? (
              <h2>No Clients found</h2>
            ) : (
              <div className="info">
                <div className="table">
                  <table border="1" style={{ height: "770px", width: "100px" }}>
                    <tr className="tr">
                      <th>Salutation</th>
                    </tr>
                    <tr className="tr">
                      <th>Name</th>
                    </tr>
                    <tr className="tr">
                      <th>City</th>
                    </tr>
                    <tr className="tr">
                      <th>Gender</th>
                    </tr>
                    <tr className="tr">
                      <th>Country</th>
                    </tr>
                    <tr className="tr">
                      <th>Phone number</th>
                    </tr>
                    <tr className="tr">
                      <th>Project</th>
                    </tr>
                    <tr className="tr">
                      <th>Project Delivery</th>
                    </tr>
                    <tr className="tr">
                      <th>Organization</th>
                    </tr>
                    <tr className="tr">
                      <th>Time Zone</th>
                    </tr>
                    <tr className="tr">
                      <th>Language</th>
                    </tr>
                    <tr className="tr">
                      <th>Action</th>
                    </tr>
                  </table>
                </div>
                {clientData?.map((val) => {
                  return (
                    <div className="table">
                      <table
                        border="1"
                        style={{ height: "770px", width: "100%" }}
                      >
                        <tr className="tr">
                          <td>{val.salutation}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.name}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.city}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.gender}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.country}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.phoneNumber}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.project}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.projectDeliverDate}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.agency}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.timezone}</td>
                        </tr>
                        <tr className="tr">
                          <td>{val.language}</td>
                        </tr>
                        <tr className="tr">
                          <td>
                            <i
                              class="fa-solid fa-user-pen"
                              onClick={() => updateClient(val)}
                              style={{
                                "font-size": "20px",
                                "margin-right": "15px",
                                cursor: "pointer",
                              }}
                            ></i>
                            <i
                              class="fa-solid fa-trash"
                              onClick={() => deleteClient(val._id)}
                              style={{
                                "font-size": "20px",
                                "margin-left": "15px",
                                cursor: "pointer",
                              }}
                            ></i>
                          </td>
                        </tr>
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="container-content">
            <div className="heading">
              <div>
                <h2>Portfolio Portal</h2>
              </div>
              <div className="addalbumarea">
                <input
                  type="text"
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Search"
                ></input>
                <button onClick={(e) => getPortfoliosearch(e)}>search</button>
              </div>
            </div>
            {portfolioData === "no data found"  ? (
              <h2>No Portfolios Found</h2>
            ):(

            <div className="info">
              {/* <div className="links">
                    <a href="">Name</a>
                    <a href="">City</a>
                    <a href="">Gender</a>
                    <a href="">Country</a>
                    <a href="">Phone number</a>
                    <a href="">Project</a>
                    <a href="">Project Delivery</a>
                    <a href="">Organization</a>
                    <a href="">Time Zone</a>
                    <a href="">Language</a>
                    <a href="">Individual</a>
                    <a href="">Action/Add</a>
                </div> */}
              <div className="table">
                <table border="1" style={{ height: "770px", width: "100px" }}>
                  <tr className="tr">
                    <th>title</th>
                  </tr>
                  <tr className="tr">
                    <th>feature</th>
                  </tr>
                  <tr className="tr">
                    <th>technology</th>
                  </tr>
                  <tr className="tr">
                    <th>plugin</th>
                  </tr>
                  <tr className="tr">
                    <th>client</th>
                  </tr>
                  <tr className="tr">
                    <th>domain Name</th>
                  </tr>
                  <tr className="tr">
                    <th>nature Of business</th>
                  </tr>
                  <tr className="tr">
                    <th>language Of website</th>
                  </tr>
                  <tr className="tr">
                    <th>theme</th>
                  </tr>
                  <tr className="tr">
                    <th>link</th>
                  </tr>
                  <tr className="tr">
                    <th>logo</th>
                  </tr>
                  <tr className="tr">
                    <th>image</th>
                  </tr>
                  <tr className="tr">
                    <th>Action</th>
                  </tr>
                </table>
              </div>
              {portfolioData?.map((val) => {
                return (
                  <div className="table">
                    <table
                      border="1"
                      style={{ height: "770px", width: "100%" }}
                    >
                      <tr className="tr">
                        <td>{val.title}</td>
                      </tr>
                      <tr>
                        <td>{val.feature}</td>
                      </tr>
                      <tr>
                        <td>{val.technology}</td>
                      </tr>
                      <tr>
                        <td>{val.plugin}</td>
                      </tr>
                      <tr>
                        <td>{val.client}</td>
                      </tr>
                      <tr>
                        <td>{val.domainName}</td>
                      </tr>
                      <tr>
                        <td>{val.natureOfbusiness}</td>
                      </tr>
                      <tr>
                        <td>{val.languageOfwebsite}</td>
                      </tr>
                      <tr>
                        <td>{val.theme}</td>
                      </tr>
                      <tr>
                        <td>{val.link}</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={val.logo} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={val.image} width="50" height="60" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i
                            class="fa-solid fa-user-pen"
                            onClick={() => updatePortfolio(val)}
                            style={{
                              "font-size": "20px",
                              "margin-right": "15px",
                              cursor: "pointer",
                            }}
                          ></i>
                          <i
                            class="fa-solid fa-trash"
                            onClick={() => deletePortfolio(val._id)}
                            style={{
                              "font-size": "20px",
                              "margin-left": "15px",
                              cursor: "pointer",
                            }}
                          ></i>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Dashboard;
