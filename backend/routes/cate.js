const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Category = require("../models/category");
const { authenticateToken } = require("./userAuth");

// Add Category
router.post("/add-category",authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role != "admin")
        {
                return res.status(400).json({message:"You Are Not Having Access To Perform Admin Work"});
        }

        const category = new Category
        (
            {
                name:req.body.name
            }
        );
        await category.save();

        res.status(200).json({message:"Category Added Successfully"});

    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// Update Category
router.put("/updateCategory",authenticateToken, async(req,res)=>{
    try 
    {
        const {categoryid} = req.headers;
        await Category.findByIdAndUpdate(categoryid,{
            name:req.body.name
        });

        return res.status(200).json({ message:"Category Updated Successfully"});
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});

// Display All Category
router.get("/getcategory",async (req,res)=>{
    try {
        const cate = await Category.find({})
        return res.json({status:"Success",data: cate});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


module.exports = router
