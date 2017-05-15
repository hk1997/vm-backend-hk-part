var mongoose = require('mongoose');
require('./models/device');
var device = mongoose.model('device');
console.log("sdfa");
mongoose.connect("mongodb://localhost/meanAuth");
device.update({_id : "587c3ab26421bf11f8b8fb72"}, {$set: {state: 0}}, function(err, done){
        if(err)
        {
            console.log(err);
        }
        console.log(done);
        //res.status(200).json({"message": "Current state "+t});
    });