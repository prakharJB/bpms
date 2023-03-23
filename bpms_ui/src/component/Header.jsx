import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/main.css";

const Header = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
  }, []);

  const getLoggedUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user?.username);
  };
  //console.log(userId)
  // const fetchUserId = async (email) => {
  //   debugger
  //   try {
  //     //const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
  //     const id = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/email/` + email);
  //     setUserId(id?.data);
  //     fetchUser(userId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //console.log(userId)

  // useEffect(() => {

  //   fetchUser();
  // }, [userId]);

  // const fetchUser = async (userId) => {
  //   debugger
  //   try {
  //     const url = `${process.env.REACT_APP_BASE_URL}/api/users/user/` + userId;
  //     const id = await axios.get(url);
  //     setUser(id?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <div className="top-header">
        <div className="container">
          <nav class="navbar navbar-light header">
            <a class="navbar-brand logo" href="/dashboard">
              JBPMS
            </a>
            <h6 className="userprofile">{userId}</h6>
            <button onClick={logOut}>LogOut</button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
