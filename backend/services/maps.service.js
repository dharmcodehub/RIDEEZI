const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
    // google api 
    // const apiKey = process.env.GOOGLE_MAPS_API;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    // using go maps pro 
    const key = process.env.GOMAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async(origin,destination) =>{
    if(!origin || !destination){
        throw new Error("Origin and Destination are required ");
    }
    
    try{
        console.log("I am here ")
        const key = process.env.GOMAPS_API;
    
        const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${key}`;
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status == "ZERO_RESULTS"){
                return res.status(400).json({message : "No Route Found"});
            }
            const element = response.data.rows[0].elements[0];
            console.log("Distance and Time: ", element);
            return element;
        } else {
            throw new Error('Unable to fetch Distance and Time');
        }

    }catch(err){
       console.log(err);
    }
}

module.exports.getAutoCompleteSuggestions = async(input) =>{
    if(!input){
        throw new Error("Input is not given");
    }
    try{
        const key = process.env.GOMAPS_KEY;
        
        const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${key}`
        const response = await axios.get(url);
        if(response.data.status == "OK"){
            const suggestions = response.data.predictions;
            return suggestions;
        }
    
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    if (!ltd || !lng || !radius) {
        throw new Error("Latitude, Longitude, and Radius are required");
    }

    console.log("Searching for captains within radius: ", radius, "km from coordinates: ", ltd, lng);

    try {
        const radiusInMeters = radius * 1000; // Convert radius to meters
        const captains = await captainModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [ ltd, lng ] // Correct order
                    },
                    $maxDistance: 5000 // Maximum distance in meters
                }
            }
        });

        console.log("Captains found: ", captains);
        return captains;

    } catch (err) {
        console.error("Error while getting nearby captains: ", err);
        throw err;
    }
}