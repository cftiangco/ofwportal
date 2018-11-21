const Agency = require('../models/agency.model');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const Patient = require('../models/patient.model');
const moment = require('moment');



module.exports.display = (req, res) => {
  //let userAgencyId = '5bc0ceac0b202d17dca7950f';
  User.findById({_id:req.user.id})
    .then((user) => {
        Record.find({agency:user.agency})
          .populate('patient')
          .exec()
          .then((records) => {
              res.render('clients/clients', {
                records:records,
                moment:moment
              })
          });
    });
};