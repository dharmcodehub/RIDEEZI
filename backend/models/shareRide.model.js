const mongoose = require("mongoose");

const shareRideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    maxPassengers: {
        type: Number,
        required: true
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending"
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    otp: {
        type: String,
        select: false
    }
});

module.exports = mongoose.model("shareRide", shareRideSchema);