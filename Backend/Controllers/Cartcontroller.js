
import userModel from "../Models/userModel.js";



// Add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId]=1
    }
    else{
      cartData[req.body.itemId]+=1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added to Cart"})
   
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message:" Not added to cart"});
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData =await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(cartData[req.body.itemId]>0){
      cartData[req.body.itemId]-=1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed from Cart"})
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
    
  }
  
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData=await userModel.findById(req.body.userId);

    let cartData=await userData.cartData;
    res.json({success:true,message:"Cart Data",cartData})
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { addToCart, removeFromCart, getCart };