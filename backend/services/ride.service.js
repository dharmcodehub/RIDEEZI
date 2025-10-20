const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const crypto = require('crypto');

const calculateFare = async (pickup, destination) => {
    console.log("Pickup and Destination Coordinates: ", pickup, destination);

    if (!pickup || !destination ) {
        throw new Error("Invalid pickup or destination coordinates");
    }

    try {
        const distanceTime = await mapService.getDistanceTime(pickup, destination);

        if (!distanceTime || !distanceTime.distance || !distanceTime.distance.value || !distanceTime.duration || !distanceTime.duration.value) {
            throw new Error("Invalid distanceTime object");
        }

        const baseFare = {
            auto: 20,
            car: 50,
            motorcycle: 15
        };

        const perKmRate = {
            auto: 10,
            car: 20,
            motorcycle: 8
        };

        const perMinuteRate = {
            auto: 1,
            car: 2,
            motorcycle: 0.5
        };

        const fare = {
            auto: (baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)).toFixed(2),
            car: (baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)).toFixed(2),
            motorcycle: (baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle)).toFixed(2)
        };

        return fare;
    } catch (err) {
        console.error("Error in calculateFare: ", err.message);
        throw new Error("Failed to calculate fare");
    }
};

const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    // console.log(otp);
    return otp;
};

const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("Fields are Required");
    }

    const fare = await calculateFare(pickup, destination);
    console.log(fare);
    const ride = await rideModel.create({
        user: user,
        pickup: pickup,
        destination: destination,
        otp: getOtp(4),
        fare: fare[vehicleType]
    });
    // console.log("I am here from create Ride Service : ", ride);
    return ride;
};

const confirmRide = async ({rideId, captain}) => {
    if (!rideId ) {
        throw new Error("Ride Id is Required");
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: "accepted",
        captain: captain._id,
    })
    const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");
    if (!ride) {
        throw new Error("Ride not found");
    }
    console.log("I am here from confirm Ride Service : ", ride);
    return ride;
    // if (ride.otp !== otp) {
    //     throw new Error("Invalid OTP");
    // }
}

const startRide = async({rideId, otp, captain}) => {
    if (!rideId || !otp || !captain) {
        throw new Error("Ride Id, OTP and Captain are required");
    }
    let ride = await rideModel.findOne({ _id: rideId }).populate("captain").populate("user").select("+otp");
    if (!ride) {
        throw new Error("Ride not found");
    }
    if(ride.status !== "accepted"){
        throw new Error("Ride is not accepted yet");
    }
    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    const distanceTime = await mapService.getDistanceTime(ride.pickup, ride.destination);

    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: "ongoing",
        duration: distanceTime.duration.value,
        distance: distanceTime.distance.value,
    });

    ride = await rideModel.findOne({ _id: rideId }).populate("captain").populate("user").select("+otp");

    sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride,
    });
    
    return ride;
}

const endRide = async({rideId , captain}) => {
    // console.log("I am here .........")
    if (!rideId) {
        throw new Error("Ride Id is required");
    }
    const ride = await rideModel.findOne({ _id: rideId , captain : captain._id}).populate("captain").populate("user").select("+otp");
    console.log("end ride from service : ", ride);
    if (!ride) {
        throw new Error("Ride not found");
    }
    if(ride.status !== "ongoing"){
        throw new Error("Ride is not ongoing yet");
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: "completed",
    });

    
    
    return ride;
}

module.exports = {
    calculateFare,
    createRide,
    confirmRide,
    startRide,
    endRide,
};