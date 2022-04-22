import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../Pages/User";
import Profile from "../Pages/Profile";
import "./Home.css"
import Slider from "react-slick";
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [listUsers, setListUsers] = useState([]);

  const getProfile = async() => 
  {
    try
    {
      const result = await axios.get("http://localhost:5000/api/allprofile");
      // console.log(result.data.data);
      setListUsers(result.data.data);
      // this.setState({user_id: result.data.data.user});
    }
    catch(e)
    {
      console.log("Error");
    }
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Slider {...settings}>
      {
        listUsers.map((user, index) => {
          if(user.about.length > 15)
          {
            user.about = user.about.substr(0, 25) + "...";
          }
          // console.log(user.user);
          return (
            <React.Fragment>
              <Link to={"/profile/" + user._id}>
              <User className = "decoration" avatar = {user.firstName}
                    name = {user.firstName + " " + user.lastName}
                    about = {user.about}        
                    location = {user.location}
                    occupation = {user.occupation}     
                    user_id = {user.user}

                    />
              </Link>       
            </React.Fragment>

          );
        })
      }
    </Slider>
);

}