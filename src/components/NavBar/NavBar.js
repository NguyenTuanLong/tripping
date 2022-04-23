import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { changekeyword } from "../Redux/SearchString";


import "./NavBar.css";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const [wordEntered, setWordEntered] = useState("");
    const [avatarURL, setAvatarURL] = useState("");

    const handleClick = () => setClick(!click);

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const getAvatar = async() =>
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      axios.get("http://localhost:5000/api/private/user/avatar", config)
      .then(response => {
        var avatarLink = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
        setAvatarURL(avatarLink);
        // console.log("URL: "+avatarLink);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }    

    const sendSearchData = async() => {
      dispatch(changekeyword({keyword:wordEntered}));
      navigate("/search");
    }


    const handleChange = async(event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
    }

    const avatarClick = () => {
      navigate("/myprofile");
    }

    useEffect(() => {
      getAvatar();
    }, [user]);

    // const node = document.getElementById("search-input");
    // useEffect(() => {
    //   node.addEventListener("keyup", function(event) {
    //     if (event.key === "Enter") {
    //       sendSearchData();
    //     }
    //   });
    // }, [wordEntered]);

    return (
        <React.Fragment>
          <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Tripping
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-search">
            <div>
              <input
                id="search-input"
                className="searchInputs"
                type="text"
                value={wordEntered}
                onChange={handleChange}
              />
            </div>
            <div className="searchIcon">
              <button onClick={sendSearchData}>Search</button>
            </div>
            </li>

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
                exact to="/editprofile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Edit
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink>
            </li> */}
            {
              user.id !== ""
              ?
              (
              <li className="nav-item dropdown">
                    <button className=" buttonAvatar" >
                      <img src={avatarURL} className="avatar" onClick={avatarClick}>
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
