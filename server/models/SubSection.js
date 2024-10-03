// get mongoose
const mongoose = require('mongoose');
// get the schema constructor
const subSectionSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    video: {
        type: String,
    },
    timeDuration : {
        type: String,
    }

});

module.exports = mongoose.model("SubSection", subSectionSchema);