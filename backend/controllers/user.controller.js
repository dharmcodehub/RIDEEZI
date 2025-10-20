const blacklistTokenModel = require("../models/blacklistToken.model.js");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

// use to check the validation of the user from the routes
const {validationResult} = require("express-validator");

module.exports.userRegister = async (req, res, next) => {
    console.log("user register controller");
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        // return res.status(400).text("validation error");
    }

    const {fullname , email, password} = req.body;
    // console.log(req.body); 
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message : "User already exists"});
    }
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({firstname : fullname.firstname, lastname : fullname.lastname, email, password: hashedPassword});

    const token = user.generateAuthToken();

    res.status(201).json({token,user});
        

}

module.exports.userLogin = async(req,res,next) =>{


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({message : "Invalid email or password"});
    }

    const match = await user.comparePassword(password);

    if(!match){
        return res.status(401).json({message : "Invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie("token",token);
    res.status(200).json({token,user});
}

module.exports.userProfile = async(req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.userLogout = async(req,res,next) =>{
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({token});
    
    res.status(200).json({message : "Logout successfully"});
}
