const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
      name: {
        type:String,
        require:true
      },
      status: {
        type:String,
        require: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
});

module.exports = mongoose.model('Country',CountrySchema);

