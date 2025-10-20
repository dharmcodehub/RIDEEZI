const rideService = require("../services/ride.service");
const {validationResult} = require("express-validator");
const mapService = require("../services/maps.service")
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
    }

    const {userId , pickup , destination , vehicleType } = req.body;
    try{
        const Ride = await rideService.createRide({user : req.user._id, pickup , destination , vehicleType});
        
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        console.log("Pickup Coordinates: ", pickupCoordinates);
        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log("Captains in Radius: ", captainsInRadius);

        if (captainsInRadius.length === 0) {
            return res.status(404).json({message: "No captains found within the radius"});
        }

        Ride.otp=""
        const rideWithUser = await rideModel.findOne({_id : Ride._id }).populate("user");
        captainsInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketId , {
                event : "new-ride",
                data : rideWithUser,
            })
        })

        return res.status(201).json({Ride, captainsInRadius});

    }catch(err){
        console.error("Error in createRide: ", err);
        return res.status(500).json({message : err.message});
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    console.log("Pickup and Destination: ", pickup, destination);
    try {
        const parsedPickup = JSON.parse(pickup);
        const parsedDestination = JSON.parse(destination);

        const fare = await rideService.calculateFare(parsedPickup, parsedDestination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error("Error in getFare: ", err.message);
        return res.status(500).json({ message: "Failed to calculate fare", error: err.message });
    }
};


module.exports.confirmRide = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {rideId,captain} = req.body;
    try{
        const ride = await rideService.confirmRide({rideId , captain});
        console.log("ride from controller : ", ride);
        sendMessageToSocketId(ride.user.socketId , {
            event : "ride-confirmed",
            data : ride
        })
        return res.status(200).json(ride);

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

module.exports.startRide = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {rideId,otp} = req.query;
    try{
        const ride = await rideService.startRide({rideId , otp , captain : req.captain});
        console.log("start ride from controller : ", ride);
        
        
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

module.exports.endRide = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {rideId} = req.query;
    try{
        console.log("I am here with ride id  : ", rideId);
        const ride = await rideService.endRide({rideId , captain : req.captain});
        console.log("end ride from controller : ", ride);

    
        sendMessageToSocketId(ride.user.socketId , {
            event : "ride-ended",
            data : ride
        })
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}