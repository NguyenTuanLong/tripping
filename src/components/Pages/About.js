import React, { useState, useEffect }  from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./About.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector, useDispatch } from "react-redux";
import { changekeyword } from "../Redux/SearchString";

export const About = () => {

  const [avatarURL, setAvatarURL] = useState("");
  const user = useSelector((state) => state.user.value);
  const [profile, setProfile] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    degree: "",
    nationality:"",
    languages: "",
    phoneNumber: "",
    gender: "",
    about: "",
    dateOfBirth: ""
    });
  
  
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
  
  const getProfile = async() =>
  {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    axios.get("http://localhost:5000/api/private/user/profile/", config)
    .then(response => {
      setProfile({
        id: response.data.newProfile._id,
        firstName: response.data.newProfile.firstName,
        lastName: response.data.newProfile.lastName,
        location: response.data.newProfile.location,
        occupation: response.data.newProfile.occupation,
        degree: response.data.newProfile.degree,
        nationality:response.data.newProfile.nationality,
        languages: response.data.newProfile.languages,
        phoneNumber: response.data.newProfile.phoneNumber,
        gender: response.data.newProfile.gender,
        about: response.data.newProfile.about,
        dateOfBirth: response.data.newProfile.dateOfBirth.split("T")[0],   
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  useEffect(() => {
    getProfile();
    getAvatar();
  }, []);

  //  const [allValues, setAllValues] = useState({
  //       firstName: "TO DO",
  //       lastName: "TO DO",
  //       location:"TO DO",
  //       occupation: "TO DO",
  //       degree:"TO DO",
  //       nationality:"TO DO",
  //       languages: "TO DO",
  //       phoneNumber: "0123456789",
  //       gender: "TO DO",
  //       about: "about",
  //       dateOfBirth: "",
  //  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      occupation: "",
      degree: "",
      nationality: "",
      languages: "",
      phoneNumber: "",
      gender: "",
      about: "",
      dateOfBirth: "",
    }
  });

  useEffect(() => {
    // console.log("reset: "+JSON. stringify(profile));
    console.log(profile.dateOfBirth.split("T")[0]);
    reset({...profile});
  }, [profile]);

//   useEffect(() => {
//       setValue([
//         { firstName: profile.firstName }, 
//         { lastName: profile.lastName },
//         { location: profile.location }, 
//         { occupation: profile.occupation }, 
//         { degree: profile.degree }, 
//         { nationality: profile.nationality }, 
//         { languages: profile.languages }, 
//         { phoneNumber: profile.phoneNumber }, 
//         { gender: profile.gender }, 
//         { about: profile.about }, 
//         { dateOfBirth: profile.dateOfBirth }
//       ]);
// }, [profile]);
  
  // const setStateAll = (data) => 
  // {
  //   setAllValues({firstName: data.firstName});
  //   setAllValues({lastName: data.lastName});
  //   setAllValues({location: data.location});
  //   setAllValues({occupation: data.occupation});
  //   setAllValues({degree: data.degree});
  //   setAllValues({nationality: data.nationality});
  //   setAllValues({languages: data.languages});
  //   setAllValues({phoneNumber: data.phoneNumber});
  //   setAllValues({gender: data.gender});
  //   setAllValues({about: data.about});
  //   setAllValues({about: data.dateOfBirth});
  // }

  const onSubmit =  async(data) =>
  {
    if ( profile._id === "" )
    {
      // setStateAll(data);
      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try
      {
        const result = await axios.post("http://localhost:5000/api/private/user/profile", data, config);
        console.log(result);
      }
      catch(e)
      {
        console.log(e);
      }
    }
    else if (profile._id !== "")
    {
      // setStateAll(data);
      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try
      {
        const result = await axios.patch("http://localhost:5000/api/private/user/profile", data, config);
        console.log(result);
      }
      catch(e)
      {
        console.log(e);
      }
    }
    
  }

  return (
    profile._id === "" ? (
      <div>
      <div className="container">
      <div className="row gutters">
      <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar">
                <img src={avatarURL} alt="empty"></img>
              </div>
              <h5 className="user-name">{profile.firstName + " " + profile.lastName}</h5>
              {/* <h6 className="user-email">kieuxuanloc121200@gmail.com</h6> */}
            </div>
            <div className="about">
              <h5>About me</h5>
              <p>{profile.about}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
        <form 
          
        >
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 className="mb-2 text-primary">New Personal Details</h6>
            </div>
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter first name" {...register("firstName", {required: true})}  />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter last name" {...register("lastName", {required: true})} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Location">Location</label>
                <input type="text" className="form-control" id="location" name="location" placeholder="Enter location" {...register("location", {required: true})} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Occupation">Occupation</label>
                <input type="text" className="form-control" id="occupation" name="occupation" placeholder="Enter occupation" {...register("occupation", {required: true})}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Location">Degree</label>
                <input type="text" className="form-control" id="degree" name="degree" placeholder="Enter degree" {...register("degree", {required: true})}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Nationality">Nationality</label>
                <input type="text" className="form-control" id="nationality" name="nationality" placeholder="Enter nationality" {...register("nationality", {required: true})}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Language">Language</label>
                <input type="text" className="form-control" id="languages" name="languages" placeholder="Enter language" {...register("languages", {required: true})}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" {...register("phoneNumber", {required: true})}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="gender">Gender</label>
                <input type="text" className="form-control" id="gender" name="gender" placeholder="Enter gender" {...register("gender", {required: true})} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="dateOfBirth">Date of birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" min="1990-01-01" max="2020-12-31" className="form-control" placeholder="1990-01-01" {...register("dateOfBirth", {required: true})} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="about">About</label>
                <input type="text" id="about" className="form-control size" placeholder="Enter about"{...register("about", {required: true})} />
              </div>
            </div>
          </div>
          <div className="row gutters">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

              <div className="text-right">
                <button type="submit" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                <button type="submit" id="submit" name="submit" class="btn btn-primary" onClick={handleSubmit(onSubmit)}>Update
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    )
    :
    (
      <div>
      <div className="container">
      <div className="row gutters">
      <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar">
                <img src={avatarURL} alt="empty"></img>
              </div>
              <h5 className="user-name">{profile.firstName + " " + profile.lastName}</h5>
              {/* <h6 className="user-email">kieuxuanloc121200@gmail.com</h6> */}
            </div>
            <div className="about">
              <h5>About me</h5>
              <p>{profile.about}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
        <form 
          
        >
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 className="mb-2 text-primary">Change Personal Details</h6>
            </div>
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" placeholder={profile.firstName} {...register("firstName")}  />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" placeholder={profile.lastName} {...register("lastName")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Location">Location</label>
                <input type="text" className="form-control" id="location" name="location" placeholder={profile.location} {...register("location")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Occupation">Occupation</label>
                <input type="text" className="form-control" id="occupation" name="occupation" placeholder={profile.occupation} {...register("occupation")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Degree">Degree</label>
                <input type="text" className="form-control" id="degree" name="degree" placeholder={profile.degree} {...register("degree")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Nationality">Nationality</label>
                <input type="text" className="form-control" id="nationality" name="nationality" placeholder={profile.nationality} {...register("nationality")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Language">Language</label>
                <input type="text" className="form-control" id="languages" name="languages" placeholder={profile.languages} {...register("languages")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder={profile.phoneNumber} {...register("phoneNumber")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="gender">Gender</label>
                <input type="text" className="form-control" id="gender" name="gender" placeholder={profile.gender} {...register("gender")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="dateOfBirth">Date of birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" min="1990-01-01" max="2020-12-31" className="form-control" placeholder={profile.dateOfBirth}{...register("dateOfBirth")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="about">About</label>
                <input type="text" id="about" className="form-control size" placeholder={profile.about}{...register("about")} />
              </div>
            </div>
          </div>
          <div className="row gutters">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

              <div className="text-right">
                <button type="submit" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                <button type="submit" id="submit" name="submit" class="btn btn-primary" onClick={handleSubmit(onSubmit)}>Update
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    )
  );
};
