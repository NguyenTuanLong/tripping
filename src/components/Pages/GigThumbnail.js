import React from "react";
import "./GigThumbnail.css"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function GigThumbnail(props) {
  
  const getGigPhotoURL = (raw) => {
    let photoLink = "http://localhost:5000/images/" + raw.substr(7, raw.length);
    return photoLink;
  };

  return (
    <div>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
              <div className="cardUser p-4">
                  <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                      {/* <button className="btnUser btn-secondary"> 
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                      </button>  */}
                      {
                        props.gigphoto != 0
                        ? <img className="imgAvt btnUser btn-secondary"  src={getGigPhotoURL(props.gigphoto[0])} alt="Avatar"></img>
                        : <div></div>
                      }
                      <span className="name mt-3">{props.title}</span> 
                      <div className="text mt-3"> 
                      <span>About: {props.about}<br/> </span> 
                      </div>
                      <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
                  </div>
              </div>
          </div>
    </div>
  );
}
