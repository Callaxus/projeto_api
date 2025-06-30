const User=require("../models/User");
const Session=require("../models/Session");

exports.getAllUsers = async(req, res)=>{
    const token = req.header("Authorization");

    const session = await Session.findById(token);
    if(!session) return res.status(401).json({message:"Unauthorized"});
    const users = await User.find({},"-password");
    res.json(users);
};

exports.getUserById = async(req,res)=>{
    const token = req.header("Authorization");
    const session=await Session.findById(token);
    if(!session)return res.status(401).json({message:"Unauthorized"});

    const user=await User.findById(req.params.id,"-password");
    if(!user)return res.status(404).json({message:"User not found"});
    res.json(user);
    
}