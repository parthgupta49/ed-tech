const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try {
        // data fetch
        // data validation
        // create section
        // update course with section object id
        const { sectionName, courseId } = req.body;
        // check if they are filled or not
        if (!sectionName || !courseId) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        // create Section
        const section = await Section.create({
            sectionName
        });
        // i want to populate replace sections and subsections with actual object instead of just object id

        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { "courseContent": section._id } }, { returnDocument: "after" }).populate("courseContent");

        res.json({ success: true, message: "Section created Successfully", section, updatedCourse }).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.updateSection = async (req, res) => {
    try {
        // data input
        // data validation
        // update the data
        // return response
        const { newName, sectionId } = req.body;
        if (!newName) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const section = await Section.findByIdAndUpdate({"_id" : sectionId }, {
            "sectionName": newName
        }, { returnDocument: "after" });
        res.status(200).json({ success: true, message: "Section updated Successfully", section });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
exports.deleteSection = async(req,res) => {
    try {
        // assuming that we are sending the section id in the params
        const {sectionId} = req.params;
        if(!sectionId){
            return res.status(400).json({success:false,message:"section id is not available" });
        }
        const section = await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findByIdAndDelete({"courseContent" : sectionId} ,{returnDocument : "after"})
        res.json({success:true,message:"Section deleted successfully",section,updatedCourse}).status(200);
    } catch (error) {
        
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error" });
    }
}