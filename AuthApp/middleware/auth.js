
// auth,isStudent,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next) => {
    try{
        //extract JWT Token in differnet ways:
        const token = req.body.token;
        // const token = req.cokkies.token

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing...",
            })
        }
        // verify the Token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }catch(error){
            res.status(401).json({
                success:false,
                message : "Token is invalid"
            })
        }
        next();

    }catch(error){
        res.status(401).json({
            success:false,
            message:"Something went wrong while Verifying the Token..."
        })
    }

}


exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success : false,
                message :"This is a protected route for Students..."
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not Matching..."
        })
       
    }
}


exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success : false,
                message :"This is a protected route for Admin..."
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not Matching..."
        })
       
    }

}