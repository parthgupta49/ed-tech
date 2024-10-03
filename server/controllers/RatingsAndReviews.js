const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createRatings = async (req, res) => {
    try {
    
        // check if user already reviewed the course
        const { rating, review } = req.body;
        const courseId = req.params;
        const id = req.user.id;
        if (!id)
            return res.status(400).json({ message: "User not found" });

        // check if the details are filled or not
        if (!rating || !review) {
            return res.status(400).json({ success: false, error: "Please fill all the details" });
        }
        // check if the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, error: "Rating must be between 1 and 5" });
        }
        // check if the course is present or not
        const course = await Course.findById(courseId)
                                            .populate({
                                                path: 'ratingsAndReviews',
                                                populate: {
                                                    path: 'user',
                                                    model: 'User'
                                                    }
                                            });
        if (!course)
            return res.status(400).json({ success: false, error: "Course not found" });

        // check if user is enrolled or not
        if(!course.studentsEnrolled.includes(id)){
            return res.status(404).json({ success: false, error: "You are not enrolled in this course | Enrol in the course to give ratings and reviews" });
        };
        // check if user already reviewed the course
        const alreadyReviewed = course.ratingsAndReviews.filter((user)=>{
            return ({_id })
        })


        const ratingsAndReview = await RatingAndReview.create({
            rating: rating,
            review: review,
            userId: id,
        });
        // update the course with ratings and reviews
        course.ratingsAndReviews.push(ratingsAndReview._id);
        await course.save();
        return res.status(200).json({ success: true, message: "Rating and review added successfully" });



    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}
// understand the syntax
exports.getAverageRatings = async (req, res) => {
    try {
        const { courseId } = req.body;
        const averageRating = await Course.aggregate([
            { $match: {"_id" : courseId} },
            { $unwind: "$ratingsAndReviews" },
            {
                averageRating: { $avg: "$ratingsAndReviews.rating" }
            }
        ]);

        if (!averageRating)
            return res.status(400).json({ success: false, error: "Course not found" });

        return res.status(200).json({ success: true, message: "Average Rating Fetched",averageRating });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}
// understand the following syntax
exports.getAllRatings = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({}).sort({"rating" : "descending"}).populate({
            path : "User",
            select : "firstname lastname email image"
        }).populate({
            path : "Course",
            select : "courseName"
        })
        .exec();


        if (!allReviews)
            return res.status(400).json({ success: false, error: "Course not found" });

        return res.status(200).json({
            success: true,
            allReviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" })

    }

}