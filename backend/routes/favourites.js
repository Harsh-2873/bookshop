const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favourite
router.put("/addfavourite",authenticateToken, async (req, res) => {
    try 
    {
        const {bookid , id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            return res.status(200).json({message:"Book is Already In Favourites."});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book Added To Favourites."});
    } 
    catch (error) 
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

// remove book from favourite
router.put("/removefromfavourite",authenticateToken, async (req, res) => {
    try 
    {
        const {bookid , id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        
        return res.status(200).json({message:"Book Removed From Favourites."});
    } 
    catch (error) 
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

// get all fav. books of one user
router.get("/getfavouritebook", authenticateToken,async(req,res)=>{
    try 
    {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({status:"Success",data:favouriteBooks});
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"});
    }
});
module.exports = router;