const shareRideService = require("../services/shareRide.service");
const { validationResult } = require("express-validator");

module.exports.createSharedRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType} = req.body;
    try {
        const sharedRide = await shareRideService.createSharedRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType,
        });
        return res.status(201).json(sharedRide);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.requestSharedRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { sharedRideId } = req.body;
    try {
        const sharedRide = await shareRideService.requestSharedRide({
            sharedRideId,
            userId: req.user._id
        });
        return res.status(200).json(sharedRide);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getAvailableSeats = async (req, res) => {
    const { sharedRideId } = req.params;

    try {
        const availableSeats = await shareRideService.getAvailableSeats(sharedRideId);
        return res.status(200).json({ availableSeats });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.confirmShareRide = async (req, res) => {
    const { shareRideId } = req.body;
    const captain = req.captain;

    try {
        const shareRide = await shareRideService.confirmShareRide({ shareRideId, captain });
        return res.status(200).json(shareRide);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};