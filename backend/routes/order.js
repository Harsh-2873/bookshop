const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//PLACE ORDER
router.post("/placeorder"  ,authenticateToken, async(req,res)=>{
    try
    {
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order )
        {
            const newOrder = new Order({user:id , book: orderData._id})
            const orderDataFromDb = await newOrder.save();

            //SAVING ORDER IN USER MODEL
            await User.findByIdAndUpdate(id, {$push:{orders: orderDataFromDb._id}});

            //CLEARING CART
            await User.findByIdAndUpdate(id, {$pull:{cart: orderData._id}});
        }
        return res.json({status:"Success",message:"Order Placed Successfully"});
    }
    catch (error)
    {
        console.log(error);
        
    }
});

//GET ORDER HISTORY OF PARTICULAR USER
router.get("/getorderhistory", authenticateToken, async(req,res)=>{
    try
    {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({path:'orders',populate:{path:"book"}})
        const ordersData = userData.orders.reverse();
        return res.json({status:"Success",data:ordersData});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});

//GET ALL ORDERS --Admin
router.get("/getallorders", authenticateToken, async(req,res)=>{
    try
    {
        const userData = await Order.find().populate({path:"book"}).populate({path:"user"}).sort({createdAt: -1 });
        return res.json({status:"Success",data:userData});
    }
    catch (error)
    {
        console.log(error)
        return res.status(500).json({message:"An Error Occurred"});
    }
});

//UPDATE ORDER --Admin
router.put("/update-status/:id", authenticateToken, async(req,res)=>{
    try
    {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({status:"Success",message:"Status Updated Successfully"});
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});
module.exports = router;