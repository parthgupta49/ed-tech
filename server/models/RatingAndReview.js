// get mongoose
const mongoose = require('mongoose');
// get the schema constructor
const ratingsAndReviewsSchema = new mongoose.Schema({

    rating : Number,
    review : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }


});

module.exports = mongoose.model("RatingAndReview", ratingsAndReviewsSchema);