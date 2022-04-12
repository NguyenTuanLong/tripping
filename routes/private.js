const express = require("express");
const {upload} = require("../utils/file");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { 
    getPrivateRoute, 
    getUser, 
    updateUserAvatar, 
    postUserProfile,
    getUserProfile,
    updateUserProfile,
} = require("../controllers/private");


router.route("/").get(protect, getPrivateRoute);

//user
router.route("/user").get(protect, getUser);

//profile
router.route("/user/profile").get(protect, getUserProfile);
router.route("/user/profile").post(protect, postUserProfile);
router.route("/user/profile").patch(protect, updateUserProfile);

//avatar
router.route("/user/avatar").post(protect, upload.single('avatar'), updateUserAvatar);


module.exports = router;
