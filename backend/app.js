const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
app.use(cors());
connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/",(req,res)=>{  
    res.send("I am working ...");
})

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapsRoutes);
app.use("/rides",rideRoutes);

module.exports = app;
