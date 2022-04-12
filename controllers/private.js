const ErrorResponse = require("../utils/errorResponse");
const {deleteFile} = require("../utils/deleteFile");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Photo = require("../models/Photo");


exports.getPrivateRoute = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: "You got access to the private data in this route",
    });
};

exports.getUser = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      user: req.user.id,
    });
};

exports.updateUserAvatar = async (req, res, next) => {
  var userId = req.user.id;
  try{
    const newAvatar = await Photo.findOne({ user: userId })
    if(!newAvatar){
      try {
        const user = await Photo.create({
          user: userId,
          avatar: req.file.path,
        });
      } catch (err) {
        return next(new ErrorResponse("Can't create new avatar", 500));
      }
    }
    // if(newAvatar){
    //   try {
    //     fs.unlink(newAvatar.avatar);
    //     newAvatar.avatar = req.file.path;
    //     await newAvatar.save();
    //   } catch (err) {
    //     return next(new ErrorResponse("Can't save new avatar", 500));
    //   }
    // }

    try{deleteFile(newAvatar.avatar);}catch(err){}
    newAvatar.avatar = req.file.path;
    await newAvatar.save();

    res
    .status(200)
    .json({
      success: true,
      newAvatar,
    });

  }catch(err){
    next(err);
  }

};

exports.getUserProfile  = async (req, res, next) => {
  var userId = req.user.id;
  try{
    const newProfile = await Profile.findOne({ user: userId });
    if(newProfile){
      res
      .status(200)
      .json({
        success: true,
        newProfile,
      });
    }
    else{
      res
      .status(404)
      .json({
        success: false,
        newProfile,
      });
    }
    
  }catch(err){
    next(err);
  }
};

// user: userId,
// gender: req.gender,
// dateOfBirth: req.dateOfBirth,
// phoneNumber: req.phoneNumber,
// firstName: req.firstName,
// lastName: req.lastName,
// nationality: req.nationality,
// location: req.location,
// occupation: req.occupation,
// degree: req.degree,
// languages: req.languages,
// about: req.about,

exports.postUserProfile = async (req, res, next) => {
  var userId = req.user.id;
  const { 
    gender,
    dateOfBirth,
    phoneNumber,
    firstName,
    lastName,
    nationality,
    location,
    occupation,
    degree,
    languages,
    about,
  } = req.body;
  try{
    const newProfile = await Profile.findOne({ user: userId })
    if(!newProfile){
      try {
        const profile = await Profile.create({
          user: userId,
          gender,
          dateOfBirth,
          phoneNumber,
          firstName,
          lastName,
          nationality,
          location,
          occupation,
          degree,
          languages,
          about,
        });


        res
        .status(200)
        .json({
          success: true,
          profile,
        });
      } catch (err) {
        return next(new ErrorResponse("Can't create new profile", 500));
      }
    }
    else{
      try {
        newProfile.gender = gender;
        newProfile.dateOfBirth = dateOfBirth;
        newProfile.phoneNumber = phoneNumber;
        newProfile.firstName = firstName;
        newProfile.lastName = lastName;
        newProfile.location = location;
        newProfile.occupation = occupation;
        newProfile.degree = degree;
        newProfile.languages = languages;
        newProfile.about = about;

        newProfile.save();

        res
        .status(200)
        .json({
          success: true,
          newProfile,
        });
      } catch (err) {
        return next(new ErrorResponse("Can't update new profile", 500));
        // console.log(err);
      }
    }


  }catch(err){
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  var userId = req.user.id;
  try{
    const newProfile = await Profile.findOne({ user: userId })
    if(!newProfile){
      res
      .status(404)
      .json({
        success: false,
      });
    }
    else{
      try {
        await Profile.findOneAndUpdate({ "user" : userId }, { $set: req.body }, { upsert: true, new: true, useFindAndModify: false});
        res
        .status(200)
        .json({
          success: true,
        });
      } catch (err) {
        return next(new ErrorResponse("Can't update new profile", 500));
        // console.log(err);
      }
    }


  }catch(err){
    next(err);
  }
}