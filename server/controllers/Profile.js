const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const cloudinary = require('cloudinary');
require('dotenv').config();
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

        const dob = new Date(2002, 0, 31);;
        // get userId
        const userId = req.user.id;

        console.log(userId);

        // validation - check every value is present or not
        if (!userId || !contactNumber || !gender || !dateOfBirth) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // find the profile id for this userid
       try {
        const user = await User.findById(userId)
        console.log(user);
        const profile = await Profile.findById(user.additionalDetails);
        // update the profile id
        profile.dateOfBirth = dob;
        profile.gender = gender;
        profile.about = about;
        profile.contactNumber = contactNumber;
        await profile.save();
        // return the response
        return res.status(200).json({
            success: true,
            msg: "Profile updated successfully",
            data: profile
        })      
       } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Can't update the profile"
        })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        // get the id
        const userId = req.user.id;
        // check for valid id
        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).json({ msg: "User does not exist" });
        }
        const profileDetails = userExist.additionalDetails;
        // delete the profile details
        const deletedProfile = await Profile.findByIdAndDelete(profileDetails, { returnDocument: "after" });
        // delete the user
        // we have to unenroll the user as well from the enrolled Courses
        const deletedUser = await User.findByIdAndDelete(userId, { returnDocument: "after" });
        // delete the profile
        // delete the user
        // return the response
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.files;
        const userId = req.user?.id;
        console.log(userId);
        console.log(req.user);
        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Picture Not Found for updation"
            })
        }
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User id not found"
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        let imageUrl;
        try {
            console.log("uploading image on cloudinary ... ");
            imageUrl = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME);
            console.log(imageUrl);
            user.image = imageUrl.secure_url;
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Image Updated Successfully",
                user : user
            });
        } catch (error) {
            console.error(error);
            console.log('error : ',error);
            
            return res.status(500).json({
                success: false,
                message: "Can't upload image on cloudinary"
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }



}