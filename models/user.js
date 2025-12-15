const mongoose = require('mongoose');



const ownedCar = new mongoose.Schema({

   model : {
    type: String,
    required:true

  },

  year:Number,

  numberPlate:Number,

  manufacturer :String,

  detail: {
    type: String,
    max:500
  },
  insuranceCo: String,

insuranceDate: Date,

nextMaintenancetype:{
  type:String,
  enum:['interin','full services','major services',""]
},

nextMaintenanceAfter:Number,

registrationDate:Date

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

  ownedCar:[ownedCar],
});

const User = mongoose.model('User', userSchema);


module.exports = User;
