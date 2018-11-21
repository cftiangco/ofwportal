const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PatientSchema = new Schema({
    lastname :{
        type: String,
        require:true,
        max: 100
    },
    firstname :{
        type: String,
        require:true,
        max: 100
    },
    middlename :{
        type: String,
        max: 100
    },
    gender :{
        type: String,
        require:true,
        max: 20
    },
    birthdate :{
        type: Date,
        require:true,
    },
    civilStatus: {
        type:String,
        require:true
    },
    nationality: {
        type:String,
        require:true
    },
    contact :{
        type: String,
    },
    address :{
        type: String,
        require:true,
        max: 200
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:"users"
    },
});

module.exports = mongoose.model('Patient',PatientSchema);