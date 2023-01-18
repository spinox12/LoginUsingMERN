const express= require("express");
const cors=require("cors");
require('./db/config');
const User= require("./db/User");
const app=express();

app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
    if(req.body.name && req.body.email && req.body.password)
    {

        let user=new User(req.body);
        let result=await user.save();
        result= result.toObject();
        delete result.password;
        resp.send(result);

    }
    else{
        resp.send({result:'Insufficient Credentials'})
    }
});

app.post("/login",async (req,resp)=>{
   if(req.body.email && req.body.password)
   {
   let user= await User.findOne(req.body).select("-password");
   if(user)
   {
     resp.send(user)
   }else{
    resp.send({result: 'No user found'})
   }
   }else{
     resp.send({result:'Insufficient credentials'})
   }
});

app.listen(5000);
