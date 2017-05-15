var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');



var deviceSchema = new mongoose.Schema({
  state : {
    type : Number,
    default: 0
  },

  admin : {
    type: String,
    default : null
    
  },
  last_updated_by: {
    type: String,
    default: null
  },
  last_updated_at: {
    type: Date,
    default: null
  }
});

mongoose.model('device', deviceSchema);