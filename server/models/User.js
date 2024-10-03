const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    accountType : {
        type : String,
        enum : ["Admin","Student","Instructor"],
        required : true
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },
    image : {
        type : String,
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }],
    courseProgress : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress"
    }],
    token : String,
    resetPasswordExpires : {
        type : Date,
    }


});






module.exports = mongoose.model("user",userSchema);