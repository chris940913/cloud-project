var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema  = new Schema({

  type:{type:String, required:true},
  title:{type:String,required :true},
  description:{type:String, required:true},
  budget:{type:String, required:true},


})

module.exports = mongoose.model('Advs', schema);
