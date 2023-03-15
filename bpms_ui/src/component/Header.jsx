import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

  const getLoggedUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchUserId(user.email);
  };
  const fetchUserId = async (email) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
      const id = await axios.get(url);
      setUserId(id.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/users/user/` + userId;
      const id = await axios.get(url);
      setUser(id.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <nav class="navbar navbar-light header">
          <a class="navbar-brand logo" href="#">
            JBPMS
          </a>
          <h6 className="userprofile">{user.name}</h6>
        </nav>
      </div>
    </>
  );
};

export default Header;
