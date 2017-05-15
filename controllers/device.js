var passport = require('passport');
var mongoose = require('mongoose');
var device = mongoose.model('device');
var device_user = mongoose.model('device_user');
var kue = require('kue-scheduler');
var queue = kue.createQueue();
var util = require('util');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

//-------------------------------------------------------------------------------------------------------//

module.exports.delayTest = function(req, res){





var job = ({
    from: req.payload._id,
    type: 'message',
    data: {
        device: req.body.device_id,
        state: req.body.state
    }
});
//console.log(job.from);

var job = queue.createJob('myQueue', job);
queue.schedule(req.body.time+'seconds from now', job);
//console.log(job.id);
         console.log("success") ;
res.status(200).json({
            "message": "The action has been scheduled"
        }); 
}

//-----------------------------------------------------------------------------------------------------

//Return the list of device and their status
module.exports.deviceList = function(req, res){
   
try{
   console.log("Successfull request from"+req.payload._id);
    if(!req.payload._id){
        res.status(401).json({
            "message": "Please login to see your devices"
        });
    }
//var devices = {};
 device_user.find({user_id: req.payload._id}, function(err, devices) {
    var devicemap = [];
    if(err){
	      console.log(err+" was the error");
         res.json({
                "message": err
            });
        }

        else 
        {
            function callback()
            {
	  var x = JSON.stringify(devicemap)
                res.status(200).json({
         "array" : devicemap }
       );
//		res.status(200).json({
  //          "message": "Done"
    //    });
            }

            var itemsProcessed = 0;
            
            console.log("Items");
		console.log(devices.length);
			if(devices.length == 0) {
				console.log("Zero");
				res.status(200).json({
            "message": "Zero Elements"
        });
  }
            devices.forEach(function(newdevice){
                console.log(newdevice.device_id); 
                 //var state = help(newdevice.device_id);
                 //var stat = 9;

                 device.findById(newdevice.device_id, function(err, device) {

                 if(err)
                 {
                return "error";
                 }
                console.log(device.state);
                stat =  device.state;
                console.log("state "+ stat);
                devicemap.push({device_id: newdevice.device_id, state: stat});
                    itemsProcessed++;
                 if(itemsProcessed === devices.length) {
                   callback();
                     }
                    });
                
            });

            
        }
});
}
catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   
};


//-------------------------------------------------------------------------------------------------------//


//To inititate a new device
module.exports.addDevice = function(req, res){
try
{
        if(!req.payload._id){
        res.status(401).json({
            "message": "Please login to add a new device"
        });
        }
        device.update({_id: req.body.device_id}, {$set: {admin: req.payload._id}}, function(err, done) {
            if(err) {
                console.log(req.params.device_id+" "+err+" IS THE ERROR");
                res.status(401).json({"message" : "Please enter a valid device id"});
            }

            else
            var new_device_user = new device_user();
            new_device_user.device_id = req.body.device_id;
            new_device_user.user_id = req.payload._id;

            new_device_user.save(function (err){
                if(err)
                {
                     res.status(401).json({"message" : "Some error"});
                }
            });

            res.status(200).json({"message": "Added Successfully"});
        });
        
}
catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   

};

//-------------------------------------------------------------------------------------------------------//


//Changing the status of a file
module.exports.write = function(req, res){
  try{
    res.header("Access-Control-Allow-Origin", "*");
    var t = req.body.data;
    console.log(req.payload._id);
    device_user.find({user_id:req.payload._id, device_id:req.body.device_id}, function (err, result){

            if(err)
            {
                console.log(err);
                 res.status(401).json({"message":err});
            }

            else if(!result.length)
            {
                console.log("User does not have the rights to access the device");
                res.status(403).json({"message":"User does not have the rights to access the device"});
            }

            else {

                device.update({_id : req.body.device_id}, {$set: {state: t}}, function(err, done){
                if(err)
                {
                    res.status(401).json({"message":err});
                }
                console.log(done);
                res.status(200).json({"message": "Current state "+t});
                    });
        }
    }); 
   }
   catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   

    
    
};

//-------------------------------------------------------------------------------------------------------//


//Add a new device
module.exports.adder = function(req, res){
   try{ 
    var newDevice = new device();
    newDevice.save( function(err, newDevice){ 
        if(err)
        {
            res.status(401).json({"message": err});
        }
        res.status(200).json({"message" : newDevice});
    } );

    }
    catch(err)
    {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
    }       
};

//-------------------------------------------------------------------------------------------------------//

//Function to read the status of a device

module.exports.read = function (req, res){
try{

device.findOne({_id:req.params.device_id}, function(err, device1){
    if(err)
    {
        console.log("Some error");
        res.status(401).json({"message": err});
    }
console.log(device1.state );
//res.status(200).json({"message" : device1.state});
var t = device1.state+"";
res.send(t);
});
}
catch(err)
 {
      sendJSONresponse(res,500,{error:'Internal Server Error'});
 }   
};

//Helper function
var help = function(id){
    
};

