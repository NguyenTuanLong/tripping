import "./App.css";
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

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route exact path="/" element={<PrivateRoute />} >
              <Route exact path="/myprofile" element={<PrivateScreen/>} />
            </Route>
            {/* <PrivateRoute exact path="/myprofile" element={<PrivateScreen/>} /> */}
            <Route exact path="/login" element={<LoginScreen/>} />
            <Route exact path="/register" element={<RegisterScreen/>} />
            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPasswordScreen/>}
            />
            <Route
              exact
              path="/passwordreset/:resetToken"
              element={<ResetPasswordScreen/>}
            />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
