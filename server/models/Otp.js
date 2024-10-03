// get mongoose
const mongoose = require('mongoose');
const { mailSender } = require('../utils/nodemailer');
// get the schema constructor
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },

});

// a function to send the email 
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp);
        if(mailResponse!==null){
            console.log("Email sent successfully: ")
        }
        
    } catch (error) {
        console.error("error occured while sending the email",error);
    }
}

// otp will be generated before the entry for the user is being stored in the DB
// pre hook/middleware
otpSchema.pre('save',function(next){
    // before the entry is being saved send the email to the user with the otp
    console.log("this.email = ",this.email);
    sendVerificationEmail(this.email,this.otp);
    // calling the next middleware
    next();
})
module.exports = mongoose.model("OTP", otpSchema);