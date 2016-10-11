var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema  = new Schema({

  type:{type:String, required:true},
  description:{type:String, required:true},


})

module.exports = mongoose.model('Advs', schema);
