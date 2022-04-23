import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login, logout } from "../Redux/User";

import Gig from "./GigThumbnail";



const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  const [listGigs, setListGigs] = useState([]);
  const [avatarURL, setAvatarURL] = useState("");


  const [privateData, setPrivateData] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const fetchPrivateDate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/private", config);
      setPrivateData(data.data);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const getAvatar = async() =>
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      axios.get("http://localhost:5000/api/private/user/avatar", config)
      .then(response => {
        var avatarLink = "http://localhost:5000/images/" + response.data.newAvatar.avatar.substr(7, response.data.newAvatar.avatar.length);
        setAvatarURL(avatarLink);
        console.log("URL: "+avatarLink);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }    

  const getProfile = async() =>
    {
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };

        await axios.get("http://localhost:5000/api/private/user/profile", config)
        .then(response => {
            setProfile(response.data.profile);
        })
        .catch(function (error) {
                console.log(error);
        });
    };

    const getListGigs = async() => {
        try
        {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };

            const result = await axios.get("http://localhost:5000/api/private/user/gig", config);
            setListGigs(result.data.gigs);
        //   console.log("gigs "+JSON.stringify(result.data.gigs));
        }
        catch(e)
        {
            console.log(e);
        }
    };


  useEffect(() => {
    // fetchPrivateDate();
    getProfile();
    getAvatar();
    getListGigs();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    console.log("removed user ID");
    navigate("/");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <React.Fragment>
        <button onClick={logoutHandler}>Log out</button>
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
                                    <p class="text-muted mb-2 font-13"><strong>Date Of Birth :</strong> <span class="ms-2">{profile.dateOfBirth}</span></p>
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
                            {/* Gig's*/}
                            {
                                listGigs ? (
                                listGigs.map((gig, index) => {
                                    if(gig.about.length > 15)
                                    {
                                        console.log(JSON.stringify(gig))
                                        gig.about = gig.about.substr(0, 40) + "...";
                                    }
                                    // console.log(user.user);
                                    return (
                                    <React.Fragment>
                                        <Link to={"/gig/" + gig._id}>
                                        <Gig className = "decoration" 
                                        title = {gig.title}
                                        about = {gig.about}
                                        _id = {gig._id}
                                        gigphoto = {gig.gigphoto}
                                            />
                                        </Link>       
                                    </React.Fragment>

                                    );
                                })
                                )
                                :
                                (<div></div>)
                            }                                    
                                
                        </div>
                        </div> 

                    </div>
            </div>

            </div>
        </div>
    </React.Fragment>
  );
};

export default PrivateScreen;
