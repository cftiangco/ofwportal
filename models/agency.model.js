const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AgencySchema = new Schema({
    name: {
      type:String,
      require:true,
      max: 50
    },
    contact: {
      type:String,
      max: 15
    },
    contactPerson: {
      type:String,
      max: 20
    },
    address: {
      type:String,
      require:true
    },
    status: {
      type:String,
      require:true
    },
    user: {
      type:Schema.Types.ObjectId,
      ref: 'users'
    }
});

module.exports = mongoose.model('Agency',AgencySchema);