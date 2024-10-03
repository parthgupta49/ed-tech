const User = require('../models/User');
const {mailSender} = require('../utils/nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// resetPasswordToken 
exports.resetPasswordToken = async (req, res) => {
    try {

        // get email from req.body
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ msg: 'Please enter your email' });
        }
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'No user found with this email' });
        }

        // generating the token
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate(
            { "email": email },
            {
                "token": token,
                "resetPasswordExpires": Date.now() + 5 * 60 * 1000
            },
            { returnDocument: "after" }
        )
        const url = `http://localhost:3000/update-password/${token}`
        await mailSender(email, "Password Reset Link",
            `<p>Hi ${user.name},</p>
            <p>You have requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${url}">${url}</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Team</p>`
        );
        res.status(200).json({ success: true, message: 'Password reset link sent to your email',updatedDetails });

        // check user for this email, email validation as well
        // generate token
        // update user by adding token and expiration time
        // create the url
        // send mail containing the url
        // return response





    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

exports.resetPassword = async (req, res) => {
    // data fetch

    // ye upar jo token aya hai params me se i have to check this token with the token which is present in the user.token
    // if the token is valid then i have to update the password of the user
    // if the token is not valid then i have to send error message to the user
    try {
        const { password, confirmPassword,token } = req.body;
        // console.log(req.params)
        // const token  = req.params?.token;
        // if any of the above values are not filled
        if (!password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        // check if they are same or not
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password and confirm password should be same" });
        }
        // hash the password now
        
        const user = await User.findOne({ "token": token });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }

        if (user.resetPasswordExpires < Date.now()){
            return res.json({
                success : false,
                message : "Token is expired, Please regenerate the token"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // updating the password
        const updatedUser = await User.findOneAndUpdate({"_id" : user._id},
            { "password": hashedPassword, token: "", resetPasswordExpires: "" },{returnDocument : "after"}
        )
        
        res.status(200).json({ success: true, message: "Password updated successfully",updatedUser });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}