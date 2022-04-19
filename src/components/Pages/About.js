import React, { useState, useEffect }  from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./About.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const About = () => {

  const [profile, setProfile] = useState("");
  
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
      setProfile(response.data.newProfile._id);
      console.log("DATA:" + response.data.newProfile._id)
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  useEffect(() => {
    getProfile();
  }, []);

   const { register, handleSubmit } = useForm({
      defaultValues: {
        firstName: "TO DO",
        lastName: "TO DO",
        location:"TO DO",
        occupation: "TO DO",
        degree:"TO DO",
        nationality:"TO DO",
        languages: "TO DO",
        phoneNumber: "0123456789",
        gender: "TO DO",
        about: "about"
      }
     }
   );

   const [allValues, setAllValues] = useState({
        firstName: "TO DO",
        lastName: "TO DO",
        location:"TO DO",
        occupation: "TO DO",
        degree:"TO DO",
        nationality:"TO DO",
        languages: "TO DO",
        phoneNumber: "0123456789",
        gender: "TO DO",
        about: "about"
   });
  
  const setStateAll = (data) => 
  {
    setAllValues({firstName: data.firstName});
    setAllValues({lastName: data.lastName});
    setAllValues({location: data.location});
    setAllValues({occupation: data.occupation});
    setAllValues({degree: data.degree});
    setAllValues({nationality: data.nationality});
    setAllValues({languages: data.languages});
    setAllValues({phoneNumber: data.phoneNumber});
    setAllValues({gender: data.gender});
    setAllValues({about: data.about});
  }

  const onSubmit =  async(data) =>
  {
    if ( profile === "" )
    {
      setStateAll(data);
      console.log(allValues)
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
    else if (profile !== "")
    {
      //setAllValues({firstName: data.firstName});
      setStateAll(data);
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
    <div>
      <div className="container">
      <div className="row gutters">
      <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"></img>
              </div>
              <h5 className="user-name">Kiều Xuân Lộc</h5>
              <h6 className="user-email">kieuxuanloc121200@gmail.com</h6>
            </div>
            <div className="about">
              <h5>About</h5>
              <p>Tự tử</p>
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
              <h6 className="mb-2 text-primary">Personal Details</h6>
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
                <input type="text" className="form-control" id="location" name="location" placeholder="Enter location" {...register("location")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Occupation">Occupation</label>
                <input type="text" className="form-control" id="occupation" name="occupation" placeholder="Enter occupation" {...register("occupation")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Location">Degree</label>
                <input type="text" className="form-control" id="degree" name="degree" placeholder="Enter degree" {...register("degree")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Nationality">Nationality</label>
                <input type="text" className="form-control" id="nationality" name="nationality" placeholder="Enter nationality" {...register("nationality")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="Language">Language</label>
                <input type="text" className="form-control" id="languages" name="languages" placeholder="Enter language" {...register("languages")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" {...register("phoneNumber")}/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="gender">Gender</label>
                <input type="text" className="form-control" id="gender" name="gender" placeholder="Enter gender" {...register("gender")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="dateOfBirth">Date of birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" value="2000-12-12" min="1990-01-01" max="2020-12-31" className="form-control" placeholder="Enter phone number"{...register("dateOfBirth")} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="dateOfBirth">About</label>
                <input type="text" id="about" className="form-control size" placeholder="Enter about"{...register("about")} />
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
  );
};
