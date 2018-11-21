const mongoose = require('mongoose');
const Patient = require('../models/patient.model');
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
        availmentDate: {
            type:Date,
            defulat:Date.now
        },
        destination:{
            type:String,
            require:true,
        },
        agency: {
            type:String,
            require:true
        },
        passport: {
            type:String,
            require:true
        },
        examiner: {
            type:String,
            require:true
        },
        userId: {
            type:Schema.Types.ObjectId,
            ref:"users"
        },
        patient: {
            type:Schema.Types.ObjectId,
            ref:"Patient"
        },
        created_at : {
            type:Date,
            default:Date.now
        },

        results: [{
            type:Schema.Types.ObjectId,
            ref:"Results"
        }]
});

module.exports = mongoose.model('Record',RecordSchema);