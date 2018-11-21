const Record = require('../models/record.model');
const Patient = require('../models/patient.model');
const Agency = require('../models/agency.model');
const moment = require('moment');

const Country = require('../models/country.model');
const User = require('../models/user.model');

module.exports.show = (req, res) => {
    if(req.user.userType === 'client') {
        res.redirect('/client');
    } else {
        Record.find({patient: req.params.id})
        .then((records) => {
            Patient.findById({_id: req.params.id})
                .then((patient1) => {
                    res.render('records/records', {
                        records:records,
                        patient1:patient1,
                        moment:moment
                    });
                }).catch(err => res.send(err));
        }).catch((err) => {
            res.send(err);
        });
    }
};

module.exports.add = (req, res) => {
    if(req.user.userType === 'client') {
        res.redirect('/client');
    } else {
    if(req.user.userType === 'client') {
        res.redirect('/client');
    } else {
    Patient.findById({_id: req.params.id})
        .then((patient) => {
            Agency.find({status:'active'})
                .then((agencies) => {
                    Country.find({status: 'active'})
                        .then((country) => {
                            User.find({userType: 'doctor'})
                                .then(doctor => {
                                    res.render('records/add', {
                                        patient:patient,
                                        agencies:agencies,
                                        errors:false,
                                        errorMsg:false,
                                        country:country,
                                        doctor:doctor,
                                        doctorFormat:doctorSetup
                                    });
                                })
                        });
                })
        }).catch((err) => res.send(err));
    }
}
};

module.exports.create = (req, res) => {
    let userId = "12345";
    let newRecord = new Record({ 
        availmentDate: req.body.availment_date,
        destination: req.body.destination,
        agency: req.body.agency,
        passport: req.body.passport.toUpperCase(),
        patient: req.params.id,
        userId: req.user.id,
        examiner:req.body.examiner
    });
    
    req.checkBody('availment_date','Availment Date is required').notEmpty();
    req.checkBody('passport','Passport no. is required').notEmpty();
    req.checkBody('destination','Destination is required').notEmpty();
    req.checkBody('agency','Agency is required').notEmpty();
    req.checkBody('examiner','Attending Physician is required').notEmpty();
    if(req.body.passport) {
        req.checkBody('passport','Passport cannot contain any special character').matches(/^[a-zA-Z0-9]*$/);
        req.checkBody('passport','Passport must be atleast 8 alphanumeric characters long').isLength({ min: 8, max:20 });
    }
    
    let errors = req.validationErrors();
    if(errors) {
        Patient.findById({_id:req.params.id})
            .then((patient) => {
                Agency.find({})
                    .then((agencies) => {
                        Country.find({})
                            .then((country) => {
                                User.find({userType:'doctor'})
                                    .then(doctor => {
                                        res.render('records/add', {
                                            errors:errors,
                                            errorMsg:false,
                                            moment:moment,
                                            patient:patient,
                                            agencies:agencies,
                                            doctor:doctor,
                                            availmentDate: req.body.availment_date,
                                            destination: req.body.destination,
                                            agency: req.body.agency,
                                            passport: req.body.passport,
                                            country:country,
                                            examiner:req.body.examiner,
                                            doctorFormat:doctorSetup
                                        });
                                    });
                            });
                    });
            })
    } else {
        Record.find({$and:
        [
            {availmentDate:moment(req.body.availment_date).format('YYYY-MM-DD')},
            {patient:req.params.id}
        ]
    }).then(record => {
        if(record.length > 0) {
            let msg = `<div class='alert alert-warning'>Availment date is already exists,Please check the Patient's Record`;
            Patient.findById({_id:req.params.id})
            .then((patient) => {
                Agency.find({})
                    .then((agencies) => {
                        Country.find({})
                            .then((country) => {
                                User.find({userType:'doctor'})
                                    .then(doctor => {
                                        res.render('records/add', {
                                            errors:false,
                                            errorMsg:msg,
                                            moment:moment,
                                            patient:patient,
                                            agencies:agencies,
                                            doctor:doctor,
                                            availmentDate: req.body.availment_date,
                                            destination: req.body.destination,
                                            agency: req.body.agency,
                                            passport: req.body.passport,
                                            country:country,
                                            examiner:req.body.examiner,
                                            doctorFormat:doctorSetup
                                        });  
                                    })
                            });
                    });
            })
        } else {
            newRecord.save()
            .then((record) => {
                req.flash('success_msg',"<div class='alert alert-success'>Record's successfully Added</div>");
                res.redirect(`/patients/${req.params.id}/records`);
            }).catch((err) => {
                res.send(err);
            });
        }
    })

    }
};

module.exports.edit = (req,res) => {
    if(req.user.userType === 'client') {
        res.redirect('/client');
    } else { 
        Patient.findById({_id: req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recordId})
            .then((record) => {
                Agency.find({status: 'active'})
                    .then((agencies) => {
                        Country.find({status: 'active'})
                            .then(countries => {
                                User.find({userType:'doctor'})
                                    .then(doctor => {
                                        res.render('records/edit', {
                                            record:record,
                                            patient:patient,
                                            agencies:agencies,
                                            moment:moment,
                                            countries:countries,
                                            errors:false,
                                            errorMsg:false,
                                            doctor:doctor,
                                            doctorFormat:doctorSetup
                                        });
                                    })
                            })
                    })
            }).catch((err) => res.send(err)); 
        });
    }
};

module.exports.put = (req, res) => {

    req.checkBody('availment_date','Availment Date is required').notEmpty();
    req.checkBody('passport','Passport no. is required').notEmpty();
    req.checkBody('destination','Destination is required').notEmpty();
    req.checkBody('agency','Agency is required').notEmpty();
    req.checkBody('examiner','Attending Physician is required').notEmpty();

    if(req.body.passport) {
        req.checkBody('passport','Passport cannot contain any special character').matches(/^[a-zA-Z0-9]*$/);
        req.checkBody('passport','Passport must be atleast 8 alphanumeric characters long').isLength({ min: 8, max:20 });
    }

    let errors = req.validationErrors();
    if(errors) {
        Patient.findById({_id:req.params.id})
            .then((patient) => {
                Record.findById({_id: req.params.recordId})
                    .then((record) => {
                        Agency.find({})
                            .then((agencies) => {
                                Country.find({})
                                    .then(countries => {
                                        User.find({userType:'doctor'})
                                            .then(doctor => {
                                                res.render('records/edit', {
                                                    patient:patient,
                                                    record:record,
                                                    agencies:agencies,
                                                    countries:countries,
                                                    availmentDate : req.body.availment_date,
                                                    passport : req.body.passport,
                                                    destination : req.body.destination,
                                                    agency : req.body.agency,
                                                    examiner:req.body.examiner,
                                                    moment:moment,
                                                    errors:errors,
                                                    errorMsg:false,
                                                    doctor:doctor,
                                                    doctorFormat:doctorSetup
                                                });
                                            });
                                    });
                        });
                    })
            }).catch((err) => {
                res.send(err);
            })
    } else {
        Record.findOne({$and:
            [
                {availmentDate:moment(req.body.availment_date).format('YYYY-MM-DD')},
                {patient:req.params.id}
            ]
        }).then(record => {
            if(record) {
                if(record.id !== req.params.recordId) {
                        let msg = `<div class='alert alert-warning'>Availment date is already exists,Please check the Patient's Record`;
                        Patient.findById({_id:req.params.id})
                        .then((patient) => {
                            Record.findById({_id: req.params.recordId})
                                .then((record) => {
                                    Agency.find({})
                                        .then((agencies) => {
                                            Country.find({})
                                                .then(countries => {
                                                    User.find({userType:'doctor'})
                                                        .then((doctor) => {
                                                            res.render('records/edit', {
                                                                patient:patient,
                                                                record:record,
                                                                agencies:agencies,
                                                                countries:countries,
                                                                availmentDate : req.body.availment_date,
                                                                passport : req.body.passport,
                                                                destination : req.body.destination,
                                                                agency : req.body.agency,
                                                                moment:moment,
                                                                errors:false,
                                                                errorMsg:msg,
                                                                doctor:doctor,
                                                                doctorFormat:doctorSetup,
                                                                examiner:req.body.examiner
                                                            })
                                                        })
                                                });
                                    });
                                })
                        }).catch((err) => {
                            res.send(err);
                        })
                } else {
                    Patient.findById({_id: req.params.id})
                        .then((patient) => {
                            Record.findByIdAndUpdate({_id:req.params.recordId})
                                .then((record) => {
                                    record.availmentDate = req.body.availment_date;
                                    record.passport = req.body.passport
                                    record.destination = req.body.destination;
                                    record.agency = req.body.agency;
                                    record.examiner = req.body.examiner;
                                    record.save()
                                        .then((updatedRecord) => {
                                            req.flash('success_msg',"<div class='alert alert-success'>Record's successfully updated</div>");
                                            res.redirect(`/patients/${req.params.id}/records`);
                                        });
                                });
                        }).catch((err) => {
                            res.send(err);
                        });
                }
            } else {
                Patient.findById({_id: req.params.id})
                        .then((patient) => {
                            Record.findByIdAndUpdate({_id:req.params.recordId})
                                .then((record) => {
                                    record.availmentDate = req.body.availment_date;
                                    record.passport = req.body.passport
                                    record.destination = req.body.destination;
                                    record.agency = req.body.agency;
                                    record.examiner = req.body.examiner;
                                    record.save()
                                        .then((updatedRecord) => {
                                            req.flash('success_msg',"<div class='alert alert-success'>Record's successfully updated</div>");
                                            res.redirect(`/patients/${req.params.id}/records`);
                                        });
                                });
                        }).catch((err) => {
                            res.send(err);
                        });
            }
        });
    }
    
};

module.exports.destroy = (req, res) => {
    Patient.findById({_id: req.params.id})
        .then((patient) => {
            Record.findByIdAndRemove({_id:req.params.recordId})
                .then((record) => {
                    req.flash('success_msg',"<div class='alert alert-danger'>Record's successfuly removed.</div>");
                    res.redirect(`/patients/${req.params.id}/records`);
                });
        }).catch((err) => {
            res.send(err);
        });
}

let doctorSetup = (doctor) => { 
    return `Dr. ${doctor.firstname} ${doctor.middlename} ${doctor.lastname}, MD`;
}