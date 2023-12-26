const router = require('express').Router();
const {verifyTokenAndAuthorization} = require("./verifyToken");
const WishList = require("../models/Wishlist");

// add product to wishlist
router.post("/", verifyTokenAndAuthorization, async function(req, res){
    const userId = req.body.userId;
    let response = '';
    try{
        const wishListItem = await WishList.findOne({userId});
        if(!wishListItem){
            const newWishtListItem = new WishList({
                userId: req.body.userId,
                products: [req.body.productId]
            });
            response = await newWishtListItem.save();
        }else{
           response = await WishList.findOneAndUpdate({userId}, {$addToSet: {products: req.body.productId}}, {'new': true});
        }

        res.status(201).json(response)
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

// get all products
router.get("/:id", verifyTokenAndAuthorization, async function (req, res){
    const userId = req.params.id;
    try{
        const wishlist = await WishList.findOne({userId});
        res.status(200).json(wishlist);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});


module.exports = router;