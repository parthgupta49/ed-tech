const instance = require('../config/razorpay');
const Course = require('../models/User');
const User = require('../models/User');
// const mailSender = require('../utils/mailSender');
const mongoose = require('mongoose');

// capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({ message: 'Please provide valid course id.' });
        }
        let course;
        try {
            course = await Course.findById(courseId);
            if (!course)
                return res.status(400).json({ message: 'Please provide valid course id.' });

            // user already paid for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message: 'You have already paid for this course.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
        // get the userid and the course id
        // validate the data

        // valid course ID
        // valid courseDetail
        // check if the user has already paid for the same course
        // order create
        const amount = course.price;
        const currency = 'INR';
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course._id,
                userId
            }
        }

        try {
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.description,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });

        }
        // return response
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Couldn't initiate the server" });
    }
}

exports.verifySignature = async (req, res) => {
    const webhookSecret = "123456";
    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHMAC("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === signature) {
        console.log("The signature is verified");
        console.log("Payment is authorised");

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            // fulfill the action
            // find the course and enroll the student init
            // find the student and add the course init
            const enrolledCourse = await Course.findOneAndUpdate({ "_id": courseId }, { $push: { "studentsEnrolled": userId } }, { returnDocument: "after" });
            console.log(enrolledCourse);
            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Can't find the course" });
            }
            const enrolledUser = await User.findOneAndUpdate({ "_id": userId }, { $push: { "courses": enrolledCourse._id } }, { returnDocument: "after" });
            console.log(enrolledUser);
            if (!enrolledUser) {
                return res.status(500).json({ success: false, message: "Can't find the user" });
            }

            // have to send the confirmation mail now 
            const mailResponse = await mailSender(
                enrolledUser.email,
                "Congratulations From StudyNotion",
                "Congratulations, you are onboarded into new Studynotion Course"
            )
            console.log(mailResponse);
            return res.status(200).json({ success: true, message: "Payment is authorised and Course is Added Successfully" });
        } catch (error) {
            console.log(error);
        }

    }
    return res.status(400).json({
        success: false,
        message: "Invalid request"
    })

}