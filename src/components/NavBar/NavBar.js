import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

import "./NavBar.css";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [avatarURL, setAvatarURL] = useState("");
    const user = useSelector((state) => state.user.value);
    
    // console.log("userID:" + user.id);
    const getAvatar = async() =>
    {
      var userid = user.id;
      console.log("userID:" + userid);
      axios.get("http://localhost:5000/api/avatar/" + userid)
      .then(response => {
        var avatarLink = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
        console.log(response.data.newAvatar.avatar);
        console.log(avatarLink);
        setAvatarURL(avatarLink);
      
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    useEffect(() => {
      getAvatar();
    }, [user]);

    return (
        <React.Fragment>
          <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Tripping
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink>
            </li>
            {
              user.id !== ""
              ?
              (
              <li className="nav-item dropdown">
                    <button className=" buttonAvatar" >
                      <img src={avatarURL} className="avatar">
                              
                      </img>
                    </button>
              </li>
              )
              :
              (
              <li className="nav-item">
                    <NavLink
                      exact to="/login"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      SIGN IN
                    </NavLink>
              </li>
              )
            }
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

        </React.Fragment>
    );
}
