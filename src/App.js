import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Blog } from "./components/Pages/Blog";
import { Contact } from "./components/Pages/Contact";
import Profile from "./components/Pages/Profile";
import Search from "./components/Pages/Search";
import { Gig } from "./components/Pages/Gig";



import PrivateRoute from "./components/Routing/PrivateRoute";

import PrivateScreen from "./components/Authentication/PrivateScreen";
import LoginScreen from "./components/Authentication/LoginScreen";
import RegisterScreen from "./components/Authentication/RegisterScreen";
import ForgotPasswordScreen from "./components/Authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/Authentication/ResetPasswordScreen";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./components/Redux/User";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:5000/api/private/user", config);
        console.log("data:" + data.user);
        dispatch(login({id:data.user}));
      } catch (error) {
        localStorage.removeItem("authToken");
        console.log(error);
      }
    };

    fetchPrivateDate();
  }, []);


  return (
    <React.Fragment>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/gig/:id" element={<Gig />} />
            <Route path="/search" element={<Search />} />

            <Route element={<PrivateRoute/>}>
              <Route exact path="/myprofile" element={<PrivateScreen/>} />
            </Route>
            
            {/* <Route
              path="/myprofile"
              element={
                <PrivateRoute>
                  <PrivateScreen />
                </PrivateRoute>
              }
            /> */}
            {/* <PrivateRoute exact path="/myprofile" element={<PrivateScreen/>} /> */}
            <Route exact path="/login" element={<LoginScreen/>} />
            <Route exact path="/register" element={<RegisterScreen/>} />
            <Route
              exact path="/forgotpassword"
              element={<ForgotPasswordScreen/>}
            />
            <Route
              exact path="/passwordreset/:resetToken"
              element={<ResetPasswordScreen/>}
            />
            </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
