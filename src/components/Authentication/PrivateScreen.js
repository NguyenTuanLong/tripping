import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login, logout } from "../Redux/User";

import "./PrivateScreen.css";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };


    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    console.log("removed user ID");
    navigate("/");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <React.Fragment>
      <div>{privateData}</div>
      <button onClick={logoutHandler}>Log out</button>
    </React.Fragment>
  );
};

export default PrivateScreen;
