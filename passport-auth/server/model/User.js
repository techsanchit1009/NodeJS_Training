 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
   name:{
     type: String,
     required: true
   },
   age: {
     type: Number,
   },
   email:{
     type: String,
     required: true
   },
   password: {
     type: String,
   },
   provider: {
     type: String,
     enum: ['local', 'google'],
     required: true
   }
 });

 const userModel = mongoose.model('User', userSchema);

 module.exports = userModel;