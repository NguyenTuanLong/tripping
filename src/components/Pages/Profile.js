import React from "react";
import axios from "axios";
// import {useParams} from "react-router-dom";

class Profile extends React.Component{

      constructor(props)
      {
            super(props);
            this.state = {
                  profile: []
            };
      }
      getProfile = async() =>
      {
            var profile_id = window.location.pathname.substring(9, window.location.pathname.length);
            console.log(profile_id);
            await axios.get("http://localhost:5000/api/profile/" + profile_id)
            .then(response => {
                  this.setState({profile:response.data.profile});
            })
            .catch(function (error) {
                  console.log("Error axios get profile");
            });
      }

      componentDidMount(){
            this.getProfile();
      }

      render()
      {
            console.log(this.state.profile);
            return (
                  <div className="frame-user-name">
                        Tên: {this.state.profile.firstName +' '+ this.state.profile.lastName}
                        <br/>
                  </div>
              );
      }
};
export default Profile;