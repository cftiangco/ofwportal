const Agency = require('../models/agency.model');


module.exports.display = (req, res) => {
  res.send('agency!');
};

module.exports.create = (req, res) => {
  let newAgency = new Agency({
      name: req.body.name,
      contact:req.body.contact,
      contactPerson: req.body.contact_person,
      address: req.body.address,
      status: req.body.status,
      user:req.user.id
  });

  newAgency.save()
    .then((agency) => {
      res.send(agency);
    }).catch((err) => {
      res.status(500).send(err);
    });

};