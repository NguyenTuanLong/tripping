import React from "react";
import axios from "axios";
import User from "../Pages/User";
import Profile from "../Pages/Profile";
import Slider from "react-slick";
import { Link } from "react-router-dom"

class Home extends React.Component{

  constructor(props) {
    super(props);
    //Chỉ định một state
    this.state = {
      listUser: []
    };
  }
  
  getProfile = async() => 
  {
    try
    {
      const result = await axios.get("http://localhost:5000/api/allprofile");
      console.log(result.data.data);
      this.setState({listUser:result.data.data});
      this.setState({user_id: result.data.data.user});
    }
    catch(e)
    {
      console.log("Error");
    }
  }
  

  settings = {
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
  items = []
  // for (let index = 0; index < 3; index ++) {
  //   items.push(<User />)
  // }
  componentDidMount() {
    this.getProfile();
  }
  render() {
    return (
        <Slider {...this.settings}>
          {
            this.state.listUser.map((user, index) => {
              if(user.about.length > 15)
              {
                user.about = user.about.substr(0, 15) + "...";
              }
              console.log(user.user);
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
          }
        </Slider>
    );
  }
}
export default Home