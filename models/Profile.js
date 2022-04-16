const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        // required: [true, "Please provide date of birth"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please provide your phone number"],
        select: false,
    },
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
    },
    nationality: {
        type: String,
        required: [true, "Please provide your nationality"],
    },
    location: {
        type: String,
        required: [true, "Please provide your current location"],
    },
    occupation: {
        type: String,
        required: [true, "Please provide your current occupation"],
    },
    degree: {
        type: String,
        required: [true, "Please provide your degree"],
    },
    languages: {
        type: String,
        required: [true, "Please provide one or more languages you can communicate"],
    },
    about: {
        type: String,
        required: [true, "Please provide something about yourself"],
    },
    availability: {
        type: String,
        required: true,
        default: "available",
    },
    dateOfCreation: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});
ProfileSchema.index({firstName: 'text', lastName:'text', about:'text', languages:'text', degree:'text', occupation:'text', location:'text', nationality:'text'});
// ProfileSchema.pre("save", async function (next) {
//     this.availability = "available";
//     this.dateOfCreation = Date.now();
//     next();
//   });

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

