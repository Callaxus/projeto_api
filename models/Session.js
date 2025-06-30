const mongoose=require("mongoose");

const sessionSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"USer"},
});

module.exports=mongoose.model("Session",sessionSchema);