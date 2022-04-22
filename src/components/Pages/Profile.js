import React, { useState, useEffect }  from "react";
import axios from "axios";
// import {useParams} from "react-router-dom";
import Slider from "react-slick";


import { useSelector, useDispatch } from "react-redux";


export default function Profile() {
    const [profile, setProfile] = useState([]);
    const [gig, setGig] = useState([]);
    const [avatarURL, setAvatarURL] = useState("");
    const user = useSelector((state) => state.user.value);

    const getProfile = async() =>
    {
          var profile_id = window.location.pathname.substring(9, window.location.pathname.length);
          console.log(profile_id);
          await axios.get("http://localhost:5000/api/profile/" + profile_id)
          .then(response => {
            setProfile(response.data.profile);
          })
          .catch(function (error) {
                console.log("Error axios get profile");
          });
    }

    const getAvatar = async() =>
    {
      var userid = user.id;
      console.log("userID:" + userid);
      axios.get("http://localhost:5000/api/avatar/" + userid)
      .then(response => {
        var avatarLink = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
        setAvatarURL(avatarLink);
      
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }    

    useEffect(() => {
        getProfile();
        getAvatar();
    }, []);

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

    return (
        <React.Fragment>
            <div className="frame-user-name">
                Tên: {profile.firstName +' '+ profile.lastName}
                <br/>
            </div>
            {/* <Slider {...settings}>
                <React.Fragment>
                <Link to={"/gig/" + gig._id}>
                <User avatar = {user.firstName}
                            name = {user.firstName + " " + user.lastName}
                            about = {user.about}        
                            location = {user.location}
                            occupation = {user.occupation}     
                            user_id = {user.user}

                        />
                </Link>       
                </React.Fragment>
            </Slider> */}
        </React.Fragment>
    );
};