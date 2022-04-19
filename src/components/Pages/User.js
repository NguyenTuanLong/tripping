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
          <div className="frame-user">
              <div className="frame-user-img">
                {
                  avatar && load === true
                  ? <img className="imgAvt" src={avatarLink} alt="Avatar"></img>
                  : <div></div>
                }
              </div>
              <div className="frame-user-name">
                Tên: {props.name}
                <br/>
                Location: {props.location}
              </div>
              <div className="frame-user-desc">
                Occupation: {props.occupation}
                <br/>
                About: {props.about}
              </div>
          </div>
          
    </div>
);
}