import React, { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../NavBar/avt.jpg"
import "./User.css"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function User(props) {
  const [avatar, setAvatar] = useState("");
  const [load, setLoad] = useState(false);
  var avatarLink;


  const getAvatar = async() =>
  {
    var userid = props.user_id;
    await axios.get("http://localhost:5000/api/avatar/" + userid)
    .then(response => {
      setAvatar(response.data.newAvatar);
      setLoad(true);
    })
    .catch(function (error) {
      // console.log(error);
    });
  }

  useEffect(() => {
    getAvatar();
    if(load === true)
    {
      avatarLink = "http://localhost:5000/images/" + avatar.avatar.substr(7, avatar.avatar.length);
    }
  }, []);

  return (
    <div>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
              <div className="cardUser p-4">
                  <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                      {/* <button className="btnUser btn-secondary"> 
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                      </button>  */}
                      {
                        avatar && load === true
                        ? <img className="imgAvt btnUser btn-secondary"  src={avatarLink} alt="Avatar"></img>
                        : <div></div>
                      }
                      <span className="name mt-3">{props.name}</span> 
                      <span className="idd">{props.email}</span>
                      <div className="text mt-3"> 
                      <span>Location: {props.location}<br/> </span> 
                      <span>Occupation: {props.occupation}<br/> </span> 
                      <span>Degree: {props.degree}<br/> </span> 
                      <span>About me: {props.about}<br/> </span> 
                      </div>
                      <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
                  </div>
              </div>
          </div>
    </div>
);
}