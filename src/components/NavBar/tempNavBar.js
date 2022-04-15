import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

class NavBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      avatarUrl: null,
      open: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
    }
    handleClick() {
      this.setState(prevState => ({
        click: !prevState.click
      }));
    }
    handleDropdown = () => {
      this.setState((state) => {
        return {
          open: !state.open,
        };
      });
    };
    getAvatar = async() =>
    {
      var userid = this.props.user_id;
      console.log("1");
      axios.get("http://localhost:5000/api/avatar/" + "62432121a40faf3d14a6df84")
      .then(response => {
        var avatarLink = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
        //var avatarLink = "";
        console.log(response.data.newAvatar.avatar);
        console.log(avatarLink);
        this.setState({avatarUrl:avatarLink});
      
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    reLoads()
    {
      console.log("Sai 1")
      this.setState({open: this.state.open})
    }
    componentDidMount()
    {
      this.getAvatar();
    }
    componentWillReceiveProps(nextProps)
    {
      console.log('componentWillReceiveProps', nextProps)
      if(this.props !== nextProps)
      {
        this.setState(nextProps);
      }
    }
    render()
    {
      console.log("render NAVBAR")
      return (
        <React.Fragment>
          <nav className="navbar">
            <div className="nav-container">
              <NavLink exact to="/" className="nav-logo">
                Tripping
                <i className="fas fa-code"></i>
              </NavLink>

              <ul className={this.click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    exact to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={this.handleClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact to="/about"
                    activeClassName="active"
                    className="nav-links"
                    onClick={this.handleClick}
                  >
                    HOW IT WORKS
                  </NavLink>
                </li>
                {
                  
                  localStorage.getItem("authToken") != null
                  ?(
                  <li className="nav-item dropdown">
                        <button className=" buttonAvatar" onClick={this.handleDropdown}>
                          <img src={this.state.avatarUrl} className="avatar">
                                  
                          </img>
                        </button>
                        {this.state.open && (
                          <div class="dropdown">
                            <ul className="ulDropwDown">
                              <li className=" liDropDown">
                              <NavLink
                                exact to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={this.handleClick}
                              >
                                Update Profile
                              </NavLink>
                              </li>
                              <li className=" liDropDown">
                              <NavLink
                                exact to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={this.handleClick}
                              >
                                Log Out
                              </NavLink>
                              </li>
                            </ul>
                          </div>
                        )}
                  </li>
                  ) 
                  : <li className="nav-item">
                  <NavLink
                    exact to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={this.handleClick}
                  >
                    SIGN IN
                  </NavLink>
                  </li>
                }
                
              </ul>
              <div className="nav-icon" onClick={this.handleClick}>
                <i className={this.click ? "fas fa-times" : "fas fa-bars"}></i>
              </div>
            </div>
          </nav>

        </React.Fragment>
      )
    }
}
export default NavBar