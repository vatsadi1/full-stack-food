
import userModel from "../models/userModel.js";

// Add item to user cart 


const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }); // ✅ FIXED

        res.json({
            success: true,
            message: "Added to Cart"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

//Remove item from user cart

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }); // ✅ FIXED

        res.json({
            success: true,
            message: "Removed from cart"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

//Fetch user cart Data
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        

        console.log("UserId:", userId);

        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        res.json({
            success: true,
            cartData
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};


export {
    addToCart,
    removeFromCart,
    getCart
}