const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    avatar: {
        type: String,
    }
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;

