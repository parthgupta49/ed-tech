// get mongoose
const mongoose = require('mongoose');
// get the schema constructor
const courseSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    courseDescription: {
        type: String,
        trim: true,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    whatWillYouLearn: {
        type: String,
        trim: true,

    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }
    ],
    ratingsAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingAndReview'
    }],
    thumbnail: {
        type: String,
        required: true,
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    tag: [{
        type: String,
    }],
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    price: String,


});

module.exports = mongoose.model("Course", courseSchema);