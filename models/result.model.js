const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ResultsSchema = new Schema({
    evaluator: {
        type:String,
        require:true
    },
    findings: {
        type:String,
        require:true
    },
    recommendation:{
        type:String,
        default: 'None'
    },
    followUp: {
        type:String,
        default: 'None'
    },
    remarks: {
        type:String,
        default: 'None'
    },
    clearance: {
        type:String,
        default: 'None'
    },
    note: {
        type:String,
        default: 'None'
    },
    status: {
        type:String,
        require:true
    },
    created_at: {
        type:Date,
        default:Date.now
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref: "users"
    },
    privacy: {
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Results',ResultsSchema);