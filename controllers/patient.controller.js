const Patient = require('../models/patient.model');
const moment = require('moment');

const {check} = require('express-validator/check');

module.exports.index = (req, res) => {
    Patient.find({}).sort({created_at: 'desc'}).then((patients) => {
        if(req.user.userType == 'client') {
            res.redirect('/client')
        } else {
            res.render('patients/patients',{
                patients: patients,
                moment:moment
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
    
};

module.exports.add = (req, res) => {
    if(req.user.userType == 'client') {
        res.redirect('/client')
    } else {
        res.render('patients/add',{
            errors: false,
            isRegister:false,
            lastname: ""
        })
    }
}



module.exports.create = (req, res) => {

    let newPatient = new Patient({
        lastname: customString(req.body.last_name),
        firstname: customString(req.body.first_name),
        middlename: customString(req.body.middle_name),
        gender: req.body.gender,
        birthdate: req.body.birth_date,
        civilStatus: req.body.civil_status,
        nationality: customString(req.body.nationality),
        contact: req.body.contact_no,
        address: customString(req.body.address),
        userId:req.user.id
    });

    req.checkBody('last_name','Last Name is required.').notEmpty();
    if(req.body.last_name) {
        req.checkBody('last_name', 'Last Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('last_name','Last Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('first_name','First Name is required.').notEmpty();
    if(req.body.first_name) {
    req.checkBody('first_name', 'First Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('first_name','First Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    if(req.body.middle_name) {
        req.checkBody('middle_name', 'Middle Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('middle_name','Middle Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }
    
    req.checkBody('birth_date','Birthdate is required.').notEmpty();
    
    req.checkBody('nationality','Nationality is required.').notEmpty();
    if(req.body.nationality) {
        req.checkBody('nationality', 'Nationality must be 4 characters long ').isLength({ min: 4, max:20 });
        req.checkBody('nationality','Nationality cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }
    
    req.checkBody('contact_no','Contact number is required.').notEmpty();
    if(req.body.contact_no) {
        req.checkBody('contact_no', 'Contact no. must be 6 digits long ').isLength({ min: 6, max:20 });
        req.checkBody('contact_no','Contact no. cannot contain any letters').matches(/^\d+$/);
    }
    req.checkBody('civil_status','Civil status is required.').notEmpty();

    req.checkBody('address','Address is required.').notEmpty();
    if(req.body.address) {
        req.checkBody('address', 'Address must be 10 characters long ').isLength({ min: 6, max:80 });
    }

    let errors = req.validationErrors();

    if(errors) {
        res.render('patients/add', {
            errors:errors,
            isRegister:false,
            moment:moment,
            lastname: req.body.last_name,
            firstname: req.body.first_name,
            middlename: req.body.middle_name,
            gender: req.body.gender,
            birthdate: req.body.birth_date,
            civilStatus: req.body.civil_status,
            nationality: req.body.nationality,
            contact: req.body.contact_no,
            address: req.body.address,
        });
    } else {
        Patient.find({$and : [
            {lastname:customString(req.body.last_name)},
            {firstname:customString(req.body.first_name)},
            {middlename:customString(req.body.middle_name)}
        ]})
        .then(patient => {
                if(patient.length > 0) {
                    let message = patient.map(p => {
                         return `<div class='alert alert-warning'>Patient <b> "${p.firstname} ${p.middlename} ${p.lastname}" </b> is already registered <a href="/patients/${p.id}/records">Click here</a> to View Record</div>`;
                    });
                    res.render('patients/add', {
                        moment:moment,
                        isRegister:message,
                        errors:false,
                        lastname: req.body.last_name,
                        firstname: req.body.first_name,
                        middlename: req.body.middle_name,
                        gender: req.body.gender,
                        birthdate: req.body.birth_date,
                        civilStatus: req.body.civil_status,
                        nationality: req.body.nationality,
                        contact: req.body.contact_no,
                        address: req.body.address,
                    });
                } else {
                    newPatient.save()
                    .then((patient) => {
                        req.flash('success_msg',"<div class='alert alert-success'>Patient has been successfully Added</div>");
                        res.redirect(`/patients/${patient._id}/records`)
                    }).catch((err) => res.send(err));
                            }
                        }).catch(e => {
                            res.send(e);
            })
    }
     
};

module.exports.edit = (req, res) => {

    if(req.user.userType == 'client') {
        res.redirect('/client')
    } else { 
        Patient.findByIdAndUpdate({_id: req.params.id})
        .then((patient) => {
          res.render('patients/edit',{
              patient:patient,
              moment:moment,
              errors:false,
              errorMessage:false
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    }
};

module.exports.put = (req, res) => {
    let userId = "5b9a1d2b02afbc2b08d1d2b5";

    req.checkBody('last_name','Last Name is required.').notEmpty();
    if(req.body.last_name) {
        req.checkBody('last_name', 'Last Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('last_name','Last Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('first_name','First Name is required.').notEmpty();
    if(req.body.first_name) {
    req.checkBody('first_name', 'First Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('first_name','First Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    if(req.body.middle_name) {
        req.checkBody('middle_name', 'Middle Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('middle_name','Middle Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }
    
    req.checkBody('birth_date','Birthdate is required.').notEmpty();
    
    req.checkBody('nationality','Nationality is required.').notEmpty();
    if(req.body.nationality) {
        req.checkBody('nationality', 'Nationality must be 4 characters long ').isLength({ min: 4, max:20 });
        req.checkBody('nationality','Nationality cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }
    
    req.checkBody('contact_no','Contact number is required.').notEmpty();
    if(req.body.contact_no) {
        req.checkBody('contact_no', 'Contact no. must be 6 digits long ').isLength({ min: 6, max:20 });
        req.checkBody('contact_no','Contact no. cannot contain any letters or special character').matches(/^\d+$/);
    }
    req.checkBody('civil_status','Civil status is required.').notEmpty();

    req.checkBody('address','Address is required.').notEmpty();
    if(req.body.address) {
        req.checkBody('address', 'Address must be 10 characters long ').isLength({ min: 6, max:80 });
    }

    let errors = req.validationErrors();

    if(errors) {
        Patient.findById({_id:req.params.id})
            .then((patient) => {
                res.render('patients/edit', {
                    errors:errors,
                    errorMessage:false,
                    moment:moment,
                    lastname: req.body.last_name,
                    firstname: req.body.first_name,
                    middlename: req.body.middle_name,
                    gender: req.body.gender,
                    birthdate: req.body.birth_date,
                    civilStatus: req.body.civil_status,
                    nationality: req.body.nationality,
                    contact: req.body.contact_no,
                    address: req.body.address,
                    patient:patient
                });
            }) 
        
    } else {
        Patient.find({$and : [
            {lastname:customString(req.body.last_name)},
            {firstname:customString(req.body.first_name)},
            {middlename:customString(req.body.middle_name)}
        ]}).then(patient => {
            if(patient.length > 0) {
                patient.map(p => {
                    if(p.id !== req.params.id) {
                        Patient.findById({_id:req.params.id})
                        .then((patient) => {
                            let errorMsg = `<div class='alert alert-warning'>Patient <b> "${p.firstname} ${p.middlename} ${p.lastname}" </b> is already registered <a href="/patients/${p.id}/records">Click here</a> to View Record</div>`;
                            res.render('patients/edit', {
                                errors:false,
                                errorMessage:true,
                                errorMsg,
                                moment:moment,
                                lastname: req.body.last_name,
                                firstname: req.body.first_name,
                                middlename: req.body.middle_name,
                                gender: req.body.gender,
                                birthdate: req.body.birth_date,
                                civilStatus: req.body.civil_status,
                                nationality: req.body.nationality,
                                contact: req.body.contact_no,
                                address: req.body.address,
                                patient:patient
                            });
                        }) 
                    } else {
                        Patient.findByIdAndUpdate({_id: req.params.id})
                            .then((patient) => {
                            patient.lastname = customString(req.body.last_name);
                            patient.firstname = customString(req.body.first_name);
                            patient.middlename = customString(req.body.middle_name);
                            patient.gender = req.body.gender;
                            patient.birthdate = req.body.birth_date;
                            patient.civilStatus = req.body.civil_status;
                            patient.nationality = customString(req.body.nationality);
                            patient.contact = req.body.contact_no;
                            patient.address = customString(req.body.address);
                            patient.save()
                                .then((updatedPatient) => {
                                    req.flash('success_msg',"<div class='alert alert-success'>Patient has been successfully Updated</div>");
                                    res.redirect(`/patients/${patient._id}/records`);
                                }).catch((err) => {
                                    res.send(err);
                                })
                            }).catch((err) => {
                                res.send(err);
                            });    
                    }
                });
            } else {
                Patient.findByIdAndUpdate({_id: req.params.id})
                    .then((patient) => {
                    patient.lastname = customString(req.body.last_name);
                    patient.firstname = customString(req.body.first_name);
                    patient.middlename = customString(req.body.middle_name);
                    patient.gender = req.body.gender;
                    patient.birthdate = req.body.birth_date;
                    patient.civilStatus = req.body.civil_status;
                    patient.nationality = customString(req.body.nationality);
                    patient.contact = req.body.contact_no;
                    patient.address = customString(req.body.address);
                    patient.save()
                        .then((updatedPatient) => {
                            req.flash('success_msg',"<div class='alert alert-success'>Patient has been successfully Updated</div>");
                            res.redirect(`/patients/${patient._id}/records`);
                        }).catch((err) => {
                            res.send(err);
                        })
                    }).catch((err) => {
                        res.send(err);
                    });
                        }
                    });

        
    }

        
};


exports.destroy = (req, res) => {
    Patient.findByIdAndRemove({_id: req.params.id})
        .then(() => {
            req.flash('success_msg',"<div class='alert alert-danger'>Patient has been successfully Removed</div>");
            res.redirect('/patients')
        }).catch((err) => {
            res.send(`My Error: ${err}`);
        });
};

const customString = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};
