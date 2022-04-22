import React, { useState, useEffect }  from "react";
import axios from "axios";
import "./Profile.css"
import 'bootstrap/dist/css/bootstrap.min.css';
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
          var avatarURL = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
          setAvatarURL(avatarURL);
        
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
                  <div>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" 
                              integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
                        <div class="container">
                        <div class="row">
                              <div class="col-xl-5">
                                    <div class="card">
                                    <div class="card-body">
                                          <div class="dropdown float-end">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                <a href="javascript:void(0);" class="dropdown-item">Edit</a>
                                                <a href="javascript:void(0);" class="dropdown-item">Delete</a>
                                                <a href="javascript:void(0);" class="dropdown-item">Block</a>
                                                </div>
                                          </div>
                                          <div class="d-flex align-items-start">
                                                <img src={avatarURL} class="rounded-circle avatar-lg img-thumbnail" alt="profile-image"/>
                                                <div class="w-100 ms-3">
                                                <h4 class="my-0">{profile.firstName +' '+ profile.lastName}</h4>
                                                <button type="button" class="btn btn-soft-primary btn-xs waves-effect mb-2 waves-light">Follow</button>
                                                <button type="button" class="btn btn-soft-success btn-xs waves-effect mb-2 waves-light">Message</button>
                                                </div>
                                          </div>

                                          <div class="mt-3">
                                                <h4 class="font-13 text-uppercase">{profile.about}</h4>

                                                <p class="text-muted mb-2 font-13"><strong>Full Name :</strong> <span class="ms-2">{profile.firstName +' '+ profile.lastName}</span></p>
                                                <p class="text-muted mb-2 font-13"><strong>Date Of Birthday :</strong> <span class="ms-2">{profile.dateOfBirth}</span></p>
                                                <p class="text-muted mb-2 font-13"><strong>Sex :</strong> <span class="ms-2">{profile.gender}</span></p>
                                                <p class="text-muted mb-2 font-13"><strong>Language :</strong> <span class="ms-2">{profile.languages}</span></p>
                                                <p class="text-muted mb-2 font-13"><strong>Nationality :</strong> <span class="ms-2">{profile.nationality}</span></p>
                                                <p class="text-muted mb-2 font-13"><strong>Mobile :</strong><span class="ms-2">{profile.phoneNumber}</span></p>
                                                <p class="text-muted mb-1 font-13"><strong>Location :</strong> <span class="ms-2">{profile.location}</span></p>
                                                <p class="text-muted mb-1 font-13"><strong>Occupation :</strong> <span class="ms-2">{profile.occupation}</span></p>
                                                <p class="text-muted mb-1 font-13"><strong>Degree :</strong> <span class="ms-2">{profile.degree}</span></p>

                                          </div>                                    

                                          <ul class="social-list list-inline mt-3 mb-0">
                                                <li class="list-inline-item">
                                                <a href="javascript: void(0);" class="social-list-item text-center border-primary text-primary"><i class="mdi mdi-facebook"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                <a href="javascript: void(0);" class="social-list-item text-center border-danger text-danger"><i class="mdi mdi-google"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                <a href="javascript: void(0);" class="social-list-item text-center border-info text-info"><i class="mdi mdi-twitter"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                <a href="javascript: void(0);" class="social-list-item text-center border-secondary text-secondary"><i class="mdi mdi-github"></i></a>
                                                </li>
                                          </ul>   
                                    </div>                                 
                                    </div>
                              </div>

                              <div class="col-xl-7">
                                    <div class="card">
                                    <div class="card-body">
                                          {/* Gig's

                                          
                                          {/* End Gig's*/}
                                    </div>
                                    </div> 

                              </div>
                        </div>

                        </div>
                  </div>
              );
            };