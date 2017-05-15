var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


/*======================================================================================================
                This is just a dummy sensor db Schema
 =======================================================================================================*/               

var sensorSchema = new mongoose.Schema({
  data: {
      type: Number,
      default: 0
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

mongoose.model('sensor',sensorSchema);