const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/nodemailer')
require('dotenv').config()
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // check if email already exists
        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "Email already exists." });
        }
        // generate OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        // check if the otp is unique
        // following is not a right way to check if the unique otp is generating evertime, cause we are making DB call inside a loop, thats the worst way we can solve this problem
        // instead we can use a package which takes care of generating the unique OTP everytime
        const existingOTP = await OTP.findOne({ "otp": otp });
        while (existingOTP) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            existingOTP = await OTP.findOne({ "otp": otp });
        };

        // save the otp in the DB
        const options = {
            email, otp
        };
        // create the entry in the DB
        const otpEntry = new OTP(options);
        await otpEntry.save();
        // send the otp to the user
        res.status(200).json({ success: true, message: "OTP sent successfully.",otp });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.signUp = async (req, res) => {
    try {
        // contact number to be put in the profile model
        const { firstname, lastname, email, phone, password, otp, accountType, contactNumber, confirmPassword } = req.body;
        // check if all the data is filled or not
        if (!firstname || !lastname || !email || !password || !otp || !confirmPassword) {
            return res.status(403).json({ success: false, message: "Please fill all the fields." });
        }
        // check if the password and confirm password are same or not
        if (password !== confirmPassword) {
            return res.status(403).json({ success: false, message: "Password and confirm password are not same" });
        }
        // check if the user already exists or not
        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(403).json({ success: false, message: "User already exists." });
        }
        // flow comes here -> user is new
        // check if the otp is correct or not 
        // finding the most recent otp for this email in the DB
        const recentOTP = await OTP.find({ email })
            .sort({ createdAt: -1 }) // sort in descending order by createdAt
            .limit(1); // limit to 1 document
        // as we have used to find method it will return the array, we are checking if the length is 0 means either the otp is expired or there doesn't exists any ( recent OTP ) entry in DB
        if (!recentOTP) {
            return res.status(403).json({ success: false, message: "OTP is not valid" });
        }
        

        // there exists the recentOTP we gotta check now if the user has given the correct OTP
        else if (otp !== recentOTP[0].otp) {
            console.log(recentOTP[0].otp);
            return res.status(403).json({ success: false, message: "Invalid OTP" });
        }
        // flow comes here -> otp is correct now we have to register the user in the DB
        // hashing the pwd

        const hashPwd = await bcrypt.hash(password, 10);
        // as we are creating the user we have to create the entry for the Profile model as well, Although not all the profile details will be filled now, so we are hardcoding null values as of now for the other details
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber
        });


        //entry to DB
        const user = new User({
            firstname,
            lastname,
            email,
            "password": hashPwd,
            accountType,
            "additionalDetails": profileDetails._id,
            phone,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}-${lastname}`,

        });
        await user.save();


        return res.status(200).json({
            success: true,
            message: "User is registered Successfully",
            user
        });

        // fetch data from req.body
        // validating the data
        // match both the pwds
        // check if the user already exists

        // find the most recent OTP stored for the user
        // validate the OTP

        // hash the pwd
        // create entry in the DB
    } catch (error) {
        console.log("Error while creating the user: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        // check the values are filled or not
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        // check if the email exists or not 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        console.log("User : ",user);
        // check if the password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        // console.log(user._id)
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        // generating the jwt token 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 36000000),
            httpOnly: true,
        }

        res.cookie('token', token, options).status(200).json({
            success: true,
            message: "Login Successful",
            user,
        });
    } catch (error) {
        console.log("Error while logging in: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })

    }
}

exports.changePassword = async (req, res) => {

    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        // check if any of those values are not filled
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the details"
            })
        }
        const user = await User.findOne({ "password": oldPassword });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "old password is incorrect"
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "password and confirmPwd does not match"
            })
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // save the updated password in the DB
        const updatedUser = await User.findOne({ "password": password },
            { "password": hashedPassword },
            { "returnDocument": "after" }
        );
        await mailSender(updatedUser.email, "Password Changed", `Password changed for ${updatedUser.username}`)
        // send the response
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            updatedUser
        });

    } catch (error) {
        console.log("Error while changing password: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })

    }


}