const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// dbconnection
const dbConnect = require('./config/database');
dbConnect()



const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');





const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp/"
    })
)

// cloudinary connect
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/profile",profileRoutes);

app.get('/', async (req,res)=>{
    return res.json({
        success : true,
        message : "Your server is running"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})