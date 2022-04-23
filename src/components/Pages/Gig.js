import React, { useState, useEffect } from 'react';
import axios from "axios";
import ImageSlider from './ImageSlider';

import "./Gig.css"

export default function Gig() {
  const [gigPhoto, setGigPhoto] = useState([]);
  const [gigTitle, setGigTitle] = useState("");
  const [gigAbout, setGigAbout] = useState("");

  const getGig = async() => {
    var gigId = window.location.pathname.substring(5, window.location.pathname.length);
    await axios.get("http://localhost:5000/api/gig/"+gigId).then((result) => {
      var gigraw  = result.data.gig;
      setGigTitle(gigraw.title);
      setGigAbout(gigraw.about);
      var gigphotoraw = result.data.gig.gigphoto;
      var photoURLs = [];
      gigphotoraw.map((raw)=>{
        // 
        const photoURL = "http://localhost:5000/"+raw;
        // console.log("URL: "+JSON.stringify(photoURL));
        photoURLs.push(photoURL);
      });
      setGigPhoto(photoURLs);
      
    });
    
  };

  useEffect(() => {
    getGig();
  }, []);
  
  return (
    <React.Fragment>
      {
      gigPhoto.lenth != 0 ? (
        <div className='center'>
          <h2 className='text-center'>{gigTitle}</h2>
          <ImageSlider slides={gigPhoto}/>
          <h3 className='text-center'>ABOUT</h3>
          <p className='text-center'>{gigAbout}</p>
        </div>
      )
      :
      (
        <div></div>
      )
      }
    </React.Fragment>
  );
};
