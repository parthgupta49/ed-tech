const Category = require('../models/Category');

exports.createcategory = async (req, res) => {

    try {
        const { name, description } = req.body;
        console.table([name,description]);
        // check if the values are filled
        if (!name || !description)
        {
            return res.status(400).json({ success: false, error: 'Please fill all the fields' });
        }

        // check if the name is already taken
        const existingcategory = await Category.findOne({ name });
        console.log(existingcategory);
        if (existingcategory){
            return res.status(400).json({ success: false, error: 'category already exists' })
        }
            

        let category = await Category.create({
            "name" : name,
           "description":description
        })
        return res.status(200).json({ success: true, data: category, message: "category created successfully" });

    } catch (error) {

        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false, error: 'Internal server error'
            });
        }
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, {
            "name": 1, "description": 1
        });
        if (!allCategory) {
            return res.status(400).json({ success: false, error: 'No Category found' });
        }
        return res.status(200).json({ success: true, data: allCategory,message : "All Category returned successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, error: 'Internal server error'
        });
    }
}

exports.categoryPageDetails = async(req,res) => {
    try {
        // get CategoryId

        // get courses for specified categoryId

        // get courses for different categories

        // get topselling courses

        // return response


        const {categoryId} = req.body;

        const selectedCategoryCourses = await Category.findById(categoryId)
                                                        .populate("course")
                                                        .exec();
        if (!selectedCategoryCourses){
            return res.status(404).json({
                success : false,
                message : "Courses related to given categoryId, Not Found"
            })
        }
        const differentCategories = await Category.findById({"_id" : {$ne : categoryId}})
                                                    .populate("course")
                                                    .exec();

        // get TopSellingCourses - 10
        let topSellingCourses;
        return res.status(200).json({
            success : true,
            data : {
                selectedCategoryCourses,
                differentCategories,
                topSellingCourses
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}
