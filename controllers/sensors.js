var passport = require('passport');
var mongoose = require('mongoose');
var sensor = mongoose.model('sensor');
var device_user = mongoose.model('device_user');
var kue = require('kue-scheduler');
var queue = kue.createQueue();
var util = require('util');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}


/*==========================================================================================================

            Just a test function, not for the final prototype

==========================================================================================================*/

//-------To recieve the data from a sensor----------------------------------------------------------------//
module.exports.sensor_write = function(req, res){
try{
    var data = req.params.data;
    console.log(req.params.sensor_id);
    sensor.update({_id:req.params.sensor_id},{$set : {data:data}}, function(err, done){
        if(err){
            
           res.status(401).json({"message":err});
        }
        else
        {
            
            res.status(200).json({"message": "Current state "+data});
        }
    });
}
catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   
}

//----------------To add a new Sensor--------------------------------------------------------------------//

module.exports.add_sensor = function(req, res){
   try{ 
    var newSensor = new sensor();
    newSensor.save( function(err, newSensor){ 
        if(err)
        {
            res.status(401).json({"message": err});
        }
        res.status(200).json({"message" : newSensor});
    } );
     }
     catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }      
};
//----------------------------To Read the value of sensor-------------------------------------------------//
module.exports.sensor_read = function (req, res){
try{
console.log(req.params.sensor_id);
sensor.findOne({_id:req.params.sensor_id}, function(err, sensor1){
    if(err)
    {
        console.log("Some error");
        res.status(401).json({"message": err});
    }
console.log(sensor1 );
//res.status(200).json({"message" : device1.state});
var t = sensor1.data+"";
res.send(t);
});
}
catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   
};