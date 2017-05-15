var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');



var device_userSchema = new mongoose.Schema({
  device_id : {
    type : String
    
  },

  user_id : {
    type: String
    
  },
  last_updated_by: {
    type: String
  },
  last_updated_at: {
    type: Date
  } 
});

mongoose.model('device_user', device_userSchema);