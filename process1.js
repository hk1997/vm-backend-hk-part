"use strict";
var kue = require('kue-scheduler');
var queue = kue.createQueue();
var util = require('util');
var mongoose = require('mongoose');
require('./models/device');
var device = mongoose.model('device');

mongoose.connect("mongodb://localhost/meanAuth");



 


 



  
queue.process('myQueue', function(job, done){
    console.log("inhere");

    device.update({_id:job.data.data.device},{$set:{state: job.data.data.state} }, function(err, device){
      console.log("updating");

      if(err)
      {
          console.log("Some Error Occurred");
      }
      else
      {
          console.log(device);
      }
      
  });

  done();
 
});