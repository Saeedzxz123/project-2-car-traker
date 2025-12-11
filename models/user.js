const mongoose = require('mongoose');



const ownedCarSchema = new mongoose.Schema({

   modee : {
    type: String,
    required:true

  },

  year:Number,
  
  manufacturer :String,

  detail: {
    type: String,
    max:500
  },
  insuranceCo: String,

insuranceDate: Date,

nextMaintenancetype:{
  type:String,
  enum:['interin','full services','major services']
},

nextMaintenanceAfter:Date


})


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  ownedCar:[ownedCarSchema]
});

const User = mongoose.model('User', userSchema);


module.exports = User;
