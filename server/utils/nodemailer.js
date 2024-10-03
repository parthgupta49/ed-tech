const nodemailer = require('nodemailer');
require('dotenv').config();
exports.mailSender = async (email,body,otp) => {
    try {
        console.log("hello ji in nodemailer.js")
        console.log("email : ",email)
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // port: 587,
            // secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    
        // async..await is not allowed in global scope, must use a wrapper
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'nbparthgupta4959@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `OTP lelo ${body}`, // plain text body
            html: `Hello ${otp}`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        
        console.error(error);
        console.log("Couldn't send the email")
    }
}