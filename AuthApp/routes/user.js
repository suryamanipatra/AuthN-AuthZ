const express = require("express");
const router = express.Router();


//handlers
const {login, singnUp} = require("../controllers/Auth");
const {auth,isStudent,isAdmin} = require("../middleware/Auth");


router.post("/login",login);
router.post("/signup",singnUp);

// Testing protected route.
router.get("/test",auth,(req,res) => {
    res.json({
        success : true,
        message :"Welcome to the Protected route for Test..."
    });
})

// Protected Route
router.get("/student", auth,isStudent, (req,res) => {
    res.json({
        success : true,
        message :"Welcome to the Protected route for Students..."
    })
});

router.get("/admin",auth,isAdmin,(req,res) => {
    res.json({
        success : true,
        message :"Welcome to the Protected route for Admin..."
    })
})
 
module.exports = router;