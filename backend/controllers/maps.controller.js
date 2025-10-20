const mapService = require("../services/maps.service");
const {validationResult} = require("express-validator");

module.exports.getCoordinate = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }


    const {address} = req.query;
    
    try{
        const coordinates = await mapService.getAddressCoordinates(address)
        res.status(200).json(coordinates);
    }catch(err){
        console.log(err);
        res.status(404).json({message : "Coordinates not Found"});
    }
}

module.exports.getDistanceTime = async(req,res,next) =>{
    const errors  = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {origin , destination} = req.query;

    try{
        const distanceTime = await mapService.getDistanceTime(origin,destination);
        // console.log("Distance and Time : ",distanceTime);
        res.status(200).json(distanceTime);

        
    }catch(error){
        console.log(error);
        res.status(404).json({message : "Distance and Time not Found"});
    }

}

module.exports.getSuggestion = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {input} = req.query;

    try{
        const suggestions = await mapService.getAutoCompleteSuggestions(input)
        res.status(200).json(suggestions);
    }catch(err){
        res.status(400).json({message : "Suggestion are not found "});
    }
}