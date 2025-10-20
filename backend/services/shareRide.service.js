const shareRideModel = require("../models/shareRide.model");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const crypto = require("crypto");

const calculateFare = async (pickup, destination, vehicleType) => {
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    const baseFare = { auto: 20, car: 50, motorcycle: 15 };
    const perKmRate = { auto: 10, car: 20, motorcycle: 8 };
    const perMinuteRate = { auto: 1, car: 2, motorcycle: 0.5 };

    return (
        baseFare[vehicleType] +
        (distanceTime.distance.value / 1000) * perKmRate[vehicleType] +
        (distanceTime.duration.value / 60) * perMinuteRate[vehicleType]
    ).toFixed(2);
};

const updateFareForPassengers = async (sharedRide) => {
    if (!sharedRide) {
        throw new Error("Shared ride is required");
    }

    const totalFare = sharedRide.fare;
    const passengerCount = sharedRide.passengers.length;

    if (passengerCount === 0) {
        throw new Error("No passengers in the shared ride");
    }

    const splitFare = (totalFare / passengerCount).toFixed(2);

    // Update each passenger's fare (if needed, store it in a separate field or notify passengers)
    return { totalFare, splitFare };
};

const startShareRideTimer = async (sharedRide) => {
    if (!sharedRide) {
        throw new Error("Shared ride is required");
    }

    // Start a 20-minute timer for the shared ride
    setTimeout(async () => {
        const updatedRide = await shareRideModel.findById(sharedRide._id);
        if (updatedRide && updatedRide.status === "pending") {
            updatedRide.status = "ongoing"; // Automatically start the ride
            await updatedRide.save();
        }
    }, 20 * 60 * 1000); // 20 minutes in milliseconds
};

const createSharedRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("Fields are Required");
    }

    const existingRide = await shareRideModel.findOne({
        pickup,
        destination,
        status: { $in: ["pending", "ongoing"] },
    });

    if (existingRide) {
        if (existingRide.passengers.length < existingRide.maxPassengers) {
            existingRide.passengers.push(user);
            await existingRide.save();

            const fareDetails = await updateFareForPassengers(existingRide);
            return { ...existingRide.toObject(), ...fareDetails };
        } else {
            throw new Error("No available seats in the shared ride");
        }
    }

    const fare = await calculateFare(pickup, destination, vehicleType);
    const sharedRide = await shareRideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        fare,
        maxPassengers: 4, // Default max passengers
        passengers: [user],
    });

    // Start the 20-minute timer for the first passenger
    await startShareRideTimer(sharedRide);

    const fareDetails = await updateFareForPassengers(sharedRide);
    return { ...sharedRide.toObject(), ...fareDetails };
};

const requestSharedRide = async ({ sharedRideId, userId }) => {
    const sharedRide = await shareRideModel.findById(sharedRideId);
    if (!sharedRide) throw new Error("Shared ride not found");
    if (sharedRide.passengers.length >= sharedRide.maxPassengers) throw new Error("Shared ride is full");

    sharedRide.passengers.push(userId);
    await sharedRide.save();
    return sharedRide;
};

const getAvailableSeats = async (sharedRideId) => {
    if (!sharedRideId) {
        throw new Error("Shared Ride ID is required");
    }

    const sharedRide = await shareRideModel.findById(sharedRideId);
    if (!sharedRide) {
        throw new Error("Shared Ride not found");
    }

    const availableSeats = sharedRide.maxPassengers - sharedRide.passengers.length;
    return availableSeats;
};

const confirmShareRide = async ({ shareRideId, captain }) => {
    if (!shareRideId || !captain) {
        throw new Error("Share Ride ID and Captain are required");
    }

    const shareRide = await shareRideModel.findOneAndUpdate(
        { _id: shareRideId, status: "pending" },
        { status: "accepted", captain: captain._id },
        { new: true }
    ).populate("user").populate("captain");

    if (!shareRide) {
        throw new Error("Share Ride not found or already accepted");
    }

    return shareRide;
};

module.exports = {
    createSharedRide,
    requestSharedRide,
    getAvailableSeats,
    confirmShareRide
};