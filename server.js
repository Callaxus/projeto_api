require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error(err));

const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.listen(3000,()=> console.log("server running on port 3000"))