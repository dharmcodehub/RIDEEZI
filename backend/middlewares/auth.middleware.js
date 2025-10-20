const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model.js");
const captainModel = require("../models/captain.model.js");

module.exports.authUser = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message : "Unauthorized access"});
    }

    const isBlackListed = await blacklistTokenModel.findOne({token});

    if(isBlackListed){
        return res.status(401).json({message : "Unauthorized access"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();

    }catch(e){
        return res.status(401).json({message : "Unauthorized access"});
    }
}

module.exports.authCaptain = async(req,res,next) =>{
    // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    console.log("token : ",token);
    if(!token){
        return res.status(401).json({message : "Unauthorized access"});
    }

    const isBlackListed = await blacklistTokenModel.findOne({token});

    if(isBlackListed){
        
        return res.status(401).json({message : "Unauthorized access"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    }catch(err){
        return res.status(401).json({message : "Unauthorized access"});
    }
}