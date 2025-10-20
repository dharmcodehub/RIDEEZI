const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller")
const {body,query} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/create",
    authMiddleware.authUser,
     body("pickup").isString().isLength({min : 3}).withMessage("Invalid Pickup Location "),
        body("destination").isString().isLength({min : 3}).withMessage("Invalid Destination Location"),
        body("vehicleType").isString().isIn(['auto','car','motorcycle']).withMessage("Please Enter the valid Vehicle"),
rideController.createRide
)

router.get("/get-fare",
    authMiddleware.authUser,
    query("pickup").isString().withMessage("Invalid Pickup Location"),
    query("destination").isString().withMessage("Invalid Destination Location"),
    rideController.getFare
)

router.post("/confirm", 
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
    rideController.confirmRide,
)

router.get("/start-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride Id"),
    query("otp").isString().isLength({min : 4}).withMessage("Invalid OTP"),
    rideController.startRide
)

router.get("/end-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride Id"),
    rideController.endRide
)

module.exports = router;