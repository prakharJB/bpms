import {React,useEffect}  from "react";
import Header from "../component/Header";
import "../css/main.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, []);


  return (
    <>
      <Header />
      <div className="container-fluid m-0 p-0">
        <div className="side-section col-md-1">
          <h4 className="sideBox">Client</h4>
          <h4 className="sideBox">Portfolio</h4>
        </div>
        <div className="right-section col-md-11 bg-light m-0 p-0">
          <div className="">Client</div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
