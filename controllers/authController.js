const User=require("../models/User");
const bcrypt=require("bcrypt");

exports.signup=async(req,res)=>{
    const{email,password,passwordConfirmation}=req.body;
    let errors={};
if(!email)errors.email="Email is required!";
if(password!==passwordConfirmation) errors.passwordConfirmation="Passwords dont match!";

const existingUser=await User.findOne({email});
if(existingUser)errors.email="The email already exists!"

if(Object.keys(errors).length>0){
    return res.status(400).json({
        message:"Invalid Data",
        errors,
    });
}

const hashedPassword=await bcrypt.hash(password, 10);
const user=await User.create({email, password:hashedPassword});

res.status(201).json({
    message:"User Created Sucessfully!",
    _id: user._id,
});

};

const Session = require("../models/Session");

exports.login=async(req,res)=>{
    const{email,password}=req.body;
    const user= await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({message:"Wrong or Invalid Password!"});
    }
    const session=await Session.create({userId: user._id});
    res.status(200).json({token:session._id});
};

