const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({ firstname, lastname, email, password, color , plate , model , type , capacity , lat , long}) => {
    console.log(firstname, lastname, email, password, color , plate , model , type , capacity);
    if (!firstname || !email || !password || !color || !plate || !model || !type || !capacity) {
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            model,
            type,
            capacity
        },
       location : {

        lat , 
        long 
       }
    })
    return captain;
}

