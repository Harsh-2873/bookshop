const router = require("express").Router();
const user = require("../models/user");
const User = require("../models/user");
const { route } = require("./book");
const { authenticateToken } = require("./userAuth");

//put book to cart
router.put("/addtocart", authenticateToken, async(req,res)=>{
    try 
    {
        const {bookid, id} = req.headers;
        const userData = await user.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart)
        {
            return res.json({status:"Success",message: "Book is already in cart"});
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.json({status:"Success",message: "Book Added to Cart"});
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});

//remove book from cart
router.put("/removefromcart/:bookid", authenticateToken, async(req,res)=>{
    try
    {
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
        return res.json({status:"Success",message:"Book Removed From Cart"})
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});

//get cart of a particular user
router.get("/getusercart", authenticateToken, async(req,res)=>{
    try
    {
        const{id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({status:"Success",data:cart});
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});
module.exports = router;