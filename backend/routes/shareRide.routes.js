const express = require("express");
const router = express.Router();
const shareRideController = require("../controllers/shareRide.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
    "/create",
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
    body("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("Invalid vehicle type"),
    shareRideController.createSharedRide
);

router.post(
    "/request",
    authMiddleware.authUser,
    body("sharedRideId").isMongoId().withMessage("Invalid shared ride ID"),
    shareRideController.requestSharedRide
);

router.get("/available-seats", authMiddleware.authUser, shareRideController.getAvailableSeats);

router.post(
    "/confirm",
    authMiddleware.authCaptain,
    body("shareRideId").isMongoId().withMessage("Invalid Share Ride ID"),
    shareRideController.confirmShareRide
);

module.exports = router;