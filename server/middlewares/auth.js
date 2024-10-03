const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

exports.auth = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({success : false,message: 'No token provided.'});
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        if (!payload){
            return res.status(400).json({success : false,message: 'Token is not valid.'});
        }
        // const user = await User.findById(payload.id);
        // if(!user) return res.status(401).json({error: 'No user found.'});
        req.user = payload;
        next();
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({success : false,message: 'Server error | Something went wrong'});
    }
}

exports.isStudent = async(req,res,next)=>{
    try {
        const accountType = req.user.accountType;
        if (accountType !== 'Student'){
            return res.status(403).json({
                success : false,
                message: 'You are not authorized to access this route. | Protected for Students'
            })
        }
        res.status(200).json({
            success : true,
            message: 'You are authorized to access this route. | Protected for Students'
        });
        next();
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({success : false,message: 'Server error | Something went Wrong'});
    }
}
exports.isAdmin = async(req,res,next)=>{
    try {
        const accountType = req.user.accountType;
        console.log(accountType);
        if (accountType !== 'Admin'){
            return res.status(403).json({
                success : false,
                message: 'You are not authorized to access this route. | Protected for Admin'
            })
        }
        
        next();
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({success : false,message: 'Server error | Something went Wrong'});
    }
}
exports.isInstructor = async(req,res,next)=>{
    try {
        console.log(req.user);
        const accountType = req.user.accountType;
        if (accountType !== 'Instructor'){
            return res.status(403).json({
                success : false,
                message: 'You are not authorized to access this route. | Protected for Instructor'
            })
        }
        next();
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({success : false,message: 'Server error | Something went Wrong'});
    }
}