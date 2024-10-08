const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Sign Up
router.post("/signup",async(req,res)=>{
    try {
        const{ username, email, password, address } = req.body;

        console.log(username, email, password, address);

        //Check username length is more than 3
        // if(username.length < 4)
        // {
        //     return res.
        //     status(400).
        //     json({message:"Username Length Should Be Greater Than 3"});
        // }

        //Check username already exists ?
        const existingUsername = await User.findOne({username:username});
        if(existingUsername)
        {
            return res.
            status(400).
            json({message:"Username Already Exists !"});
        }

        //Check email already exists ?
        const existingEmail = await User.findOne({email:email});
        if(existingEmail)
        {
            return res.
            status(400).
            json({message:"Email Already Exists !"});
        }
        //Check password's length
        // if(password.length<=5)
        // {
        //     return res.
        //     status(400).
        //     json({message:"Password's Length Should Be Greater Than 5"});
        // }
        
        const hashPass = await bcrypt.hash(password , 10);

        const newUser = new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:"SignUp Succesfully"});
    } 
    catch (error) {
        res.status(500).json({message : error.message});
    }
});

// Sign In
router.post("/signin",async(req,res)=>{
    try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser)
        {
            res.status(400).json({message : error.message});
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},
                ];
                const token = jwt.sign({authClaims},"bookStore123",{expiresIn:"30d"});
                res.status(200).json({id:existingUser.id, role:existingUser.role, token:token});
            }
            else{
                res.status(500).json({message : error.message});
            }
        })
    } 
    catch (error) {
        res.status(500).json({message : error.message});
    }
});

// get-user-info.
router.get("/getuserinformation",authenticateToken, async (req,res)=>
{
    try 
    {
        // authenticateToken
        const {id} = req.headers;
        const data = await User.findById(id);
        return res.status(200).json(data);
    } 
    catch (error) 
    {
        res.status(500).json({message : "Internal Server Error "});
    }
});

// update address
router.put("/updateaddress",authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address Updated"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = router; 