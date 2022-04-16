import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../Pages/User";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useSelector, useDispatch } from "react-redux";


export default function Home() {
  const [listUsers, setListUsers] = useState([]);
  const searchString = useSelector((state) => state.searchString.value);

  const getProfile = async() => 
  {
    const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        "searchString": searchString.keyword,
      };

    try
    {
      const result = await axios.post("http://localhost:5000/api/search", payload, config);
      // console.log(result.data.data);
      setListUsers(result.data.data);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  useEffect(() => {
    getProfile();
  }, [searchString]);

  return (
    <React.Fragment>
    {listUsers ? (
        listUsers.map((user, index) => {
          if(user.about.length > 15)
          {
            user.about = user.about.substr(0, 15) + "...";
          }
          // console.log(user.user);
          return (
            <React.Fragment>
              <Link to={"/profile/" + user._id}>
              <User avatar = {user.firstName}
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
    ) : (
      <div>Empty</div>
    )
    }
    </React.Fragment>
);

}