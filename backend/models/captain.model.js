const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            require : true,
            minLength : [3, "Firstname must be at least 3 characters long"]
        },
        lastname : {
            type : String,
            minLength : [3, "Lastname must be at least 3 characters long"]
        },
    },
    email : {
        type : String,
        unique : true,
        require : true,
        lowercase : true ,
        match : [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password : {
        type : String,
        require : true,
        minLength : [8, "Password must be at least 8 characters long"]
    },
    socketId : {
        type : String
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    vehicle : {
        color : {
            type : String,
            require : true,
            minLength : [3, "Color must be at least 3 characters long"]
        },
        plate : {
            type : String,
            require : true,
            minLength : [3, "Plate must be at least 3 characters long"]
        },
        model : {
            type : String,
            require : true,
            minLength : [3, "Model must be at least 3 characters long"]
        },
        capacity  : {
            type : Number,
            require : true,
            min : [1, "Capacity must be at least 1"]
        },
        type : {
            type : String,
            require : true,
            enum : ["car", "motorcycle", "auto", "van"]
        }
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            // required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            // required: true
        }
    }
})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id : this._id,
    }, process.env.JWT_SECRET , {expiresIn : "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

captainSchema.index({ location: "2dsphere" });
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;