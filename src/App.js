import "./App.css";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Blog } from "./components/Pages/Blog";
import { Contact } from "./components/Pages/Contact";
import Profile from "./components/Pages/Profile";

import PrivateRoute from "./components/Routing/PrivateRoute";

import PrivateScreen from "./components/Authentication/PrivateScreen";
import LoginScreen from "./components/Authentication/LoginScreen";
import RegisterScreen from "./components/Authentication/RegisterScreen";
import ForgotPasswordScreen from "./components/Authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/Authentication/ResetPasswordScreen";
import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props);
    //Chỉ định một state
    this.state = {
      listUser: [],
      auth: null,
    };
    this.child = React.createRef();
    this.reLoad = this.reLoad.bind(this);
  }

  getProfile = async() => 
  {
    try
    {
      const result = await axios.get("http://localhost:5000/api/allprofile");
      //console.log(result.data.data);
      this.setState({listUser:result.data.data});
      this.setState({user_id: result.data.data.user});
    }
    catch(e)
    {
      console.log("Error");
    }
  }
  login = 1;
  reLoad()
  {
      // if (localStorage.getItem("authToken")) {
      //   navigate("/");
      // }
      //console.log("acscac")
      console.log("Sai 2")
      this.child.current.reLoads();
      //this.setState({auth: localStorage.getItem("authToken") })
  }
  componentDidMount()
  {
    this.getProfile();
  }
  render()
  {
    return (
      <>
        <Router>

          <NavBar ref = {this.child}/>
        
          <div className="pages">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile/:id" element={<Profile />} />
  
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
              <Route exact path="/login" element={<LoginScreen onLogin = {this.reLoad} />} />
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
      </>
    );
  }
  
}

export default App;
