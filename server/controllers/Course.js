const Course = require('../models/Course');
const categorys = require('../models/Category');
const User = require('../models/User');
const Users = require('../models/User');
const Section = require('../models/Section');
const mongoose = require('mongoose');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();
exports.createCourse = async (req, res) => {
    try {
        console.log("in course controller");
        console.log(first)
        const { courseName, courseDescription, price, whatWillYouLearn, category,tag } = req.body;
        const { thumbnail } = req.files;
        // check if the any fields are empty
        if (!courseName || !courseDescription || !price || !whatWillYouLearn || !category || !thumbnail) {
            console.table([courseName,courseDescription,price,whatWillYouLearn,category]);
            return res.status(400).json({ success: false, message: 'Please fill all the fields' })
        }
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);
        if (!instructorDetails) {
            return res.status(400).json({ success: false, message: 'Please fill all the fields' })
        }
        // check given category is valid or not
        const objId = new mongoose.Types.ObjectId(category);
        const categoryDetails = await categorys.findById(objId);
        if (!categoryDetails) {
            return res.status(400).json({ success: false, message: 'Please fill all the fields' })
        }
        // upload image to cloudinary
        let courseImage;
        try {
            console.log("uploading the image")
            courseImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "Image can't be uploaded"
            })
        }
        // create course
        const course = await Course.create({
            courseName,
            courseDescription,
            price,
            whatWillYouLearn,
            category: categoryDetails._id,
            thumbnail: courseImage.secure_url,
            instructor: instructorDetails._id
        })
        await User.findOneAndUpdate({ "_id": instructorDetails._id }, {
            $push: { "courses": course._id }
        },
            { returnDocument: "after" }
        );

        await categorys.findOneAndUpdate({ "_id": categoryDetails._id },
            { $push: { "course": course._id } }, {
            returnDocument: "after"
        });
        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            course: course
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

// getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            thumbnail: 1,
            courseName: 1,
            courseDescription: 1,
            price: 1,
            whatWillYouLearn: 1,
            category: 1,
            instructor: 1,
        }).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: 'All courses fetched successfully',
            courses: allCourses
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                populate: {
                    path: 'additionalDetails'
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            })
            .populate({
                path: "ratingsAndReviews",
                populate: {
                    path: "user"
                }
            })
            .populate({
                path: "studentsEnrolled",
                populate: {
                    path: "additionalDetails"
                }
            })
            .exec();
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Course details fetched successfully',
            course
        })

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}