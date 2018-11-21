const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crimson user - 5ba1fe4305a9ca0e80887de5

let UserSchema = new Schema({
    lastname : {
        type:String,
        require:true
    },
    firstname:{
        type:String,
        require:true
    },
    middlename: {
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,    
        require:true
    },
    status :{
        type:String,
        require:true
    },
    userType:{
      type:String,
      require:true  
    },
    agency:{
        type:String,
        default:null
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: "users"
    },
});

module.exports = mongoose.model('User',UserSchema);