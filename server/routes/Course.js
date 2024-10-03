const express = require('express');
const router = express.Router();

const {createCourse, getAllCourses, getCourseDetails} = require('../controllers/Course');
// const { create } = require('../models/User');
const {isInstructor,isAdmin, auth} = require('../middlewares/auth');
const {createSection} = require('../controllers/Section');
const { createcategory,getAllCategory,categoryPageDetails} = require('../controllers/Category');

const {createSubSection} = require('../controllers/SubSection');
router.post('/create',auth,isInstructor,createCourse);
router.get('/allcourses',getAllCourses);
router.post('/getcourse',getCourseDetails);

router.post('/createCategory',auth,isAdmin,createcategory);
router.get('/showAllCategories',getAllCategory);

router.post('/addSection',auth,isInstructor,createSection);
router.post('/addSubSection',auth,isInstructor,createSubSection);
module.exports = router;