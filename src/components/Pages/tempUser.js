import React from "react";
import axios from "axios";
import avatar from "../NavBar/avt.jpg"
import "./User.css"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class User extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      avatar: avatar,
      load: false
    };
  }

  getAvatar = async() =>
  {
    var userid = this.props.user_id;
    await axios.get("http://localhost:5000/api/avatar/" + userid)
    .then(response => {
      this.setState({avatar:response.data.newAvatar});
      this.setState({load: true});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    this.getAvatar();
  }

  render()
  {
      var avatarLink;
      if(this.state.avatar && this.state.load === true)
      {
        avatarLink = "http://localhost:5000/images/" + this.state.avatar.avatar.substr(7, this.state.avatar.avatar.length);
      }
      return (
        <div>
              <div className="frame-user">
                  <div className="frame-user-img">
                    {
                      this.state.avatar && this.state.load === true
                      ? <img className="imgAvt" src={avatarLink} alt="Avatar"></img>
                      : <div></div>
                    }
                  </div>
                  <div className="frame-user-name">
                    Tên: {this.props.name}
                    <br/>
                    Location: {this.props.location}
                  </div>
                  <div className="frame-user-desc">
                    Occupation: {this.props.occupation}
                    <br/>
                    About: {this.props.about}
                  </div>
              </div>
              
        </div>
    );
};
}
export default User
