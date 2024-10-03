
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require('../models/Course');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();
const mongoose = require('mongoose');
exports.createSubSection = async (req, res) => {
    try {
        // fetch the data
        // fetch the video
        // validate 
        // upload video to cloudinary
        // create Subsection
        // update the section with the subsection objectId
        // return response
        const { title, timeDuration, description, sectionId } = req.body;
        const { video } = req.files;

        if (!title || !timeDuration || !description || !video || !sectionId) {
            return res.status(400).json({ error: "Please fill all the fields" })
        }
        const videoLink = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSection = await SubSection.create({
            title,
            description,
            video: videoLink.secure_url,
            timeDuration,

        });
        const updatedSection = await Section.findByIdAndUpdate(new mongoose.Types.ObjectId(sectionId), {
            $push: { "subSection": subSection._id }
        }, { returnDocument: "after" }).populate("subSection");
        return res.status(200).json({ success: true, message: "Subsection created successfully", updatedSection });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
// HW - updateSubSection, deleteSubSection