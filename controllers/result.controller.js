const Patient = require('../models/patient.model');
const Result = require('../models/result.model');
const Record = require('../models/record.model');
const User = require('../models/user.model')
const moment = require('moment');

module.exports.show = (req, res) => {
    if(req.user.userType === 'client') {
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .populate({
                path: 'results',
                match: {privacy: 'Public'}
            })
            .exec()
            .then((records) => {
                if(records.agency !== req.user.agency) {
                    res.redirect('/client')
                } else {
                    res.render('results/results',{
                        records: records,
                        patient:patient,
                        moment: moment
                    });
                }
        });        
        })
    } else {
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .populate('results')
            .exec()
            .then((records) => {
                res.render('results/results',{
                    records: records,
                    patient:patient,
                    moment: moment
                });
        });        
        })   
    }
    
};

module.exports.result = (req,res) => {
    if(req.user.userType === 'client') {
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .then((record) => {
               Result.findById({_id:req.params.resId})
                .then((result) => {
                    if(record.agency !== req.user.agency) {
                        res.redirect('/client')
                    } else { 
                        res.render('results/result',{
                            patient:patient,
                            record: record,
                            result:result,
                            moment: moment
                        });
                    }
                })
        });        
    }).catch((err) => {
        res.send(err);
    });
    } else {
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .then((record) => {
               Result.findById({_id:req.params.resId})
                .then((result) => {
                    res.render('results/result',{
                        patient:patient,
                        record: record,
                        result:result,
                        moment: moment
                    });
                })
        });        
    }).catch((err) => {
        res.send(err);
    });
    }
}

module.exports.add = (req, res) => {
    if(req.user.userType == 'client') {
        res.redirect('/client')
    } else { 
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id:req.params.recId})
            .then((record) => {
                User.find({userType:'doctor'})
                    .then(doctor => {
                        res.render('results/add', {
                            record:record,
                            patient:patient,
                            moment:moment,
                            doctor:doctor,
                            doctorFormat:doctorSetup
                        });
                    });
            })
        }).catch((err) => {
            res.send(err);
        });
    }
};

module.exports.create = (req, res) => {
Patient.findById({_id: req.params.id})
    .then((patient) => {
        Record.findById({_id: req.params.recId})
        .then((record) => {
            let newResult = new Result({
                evaluator:req.body.evaluator,
                date:req.body.visit_date,
                findings:req.body.findings,
                recommendation:req.body.recommendation,
                followUp:req.body.follow_up,
                remarks:req.body.remarks,
                clearance:req.body.clearance,
                note:req.body.doctors_note,
                status:req.body.status,
                privacy:req.body.privacy,
                userId:req.user.id
            });

            newResult.save()
                .then((result) => {
                record.results.unshift(result.id);
                record.save().then((newresult) => {
                    req.flash('success_msg',"<div class='alert alert-success'>Result has been successfully Added</div>");
                    res.redirect(`/patients/${patient.id}/records/${record.id}/results`);
                }).catch(err => res.status(500).send(err));
            }).catch(err => res.status(500).send(err));
        }).catch(err => res.status(500).send(err));
    }).catch((err) => {
        res.send("Error");
    });
}

module.exports.edit = (req, res) => {
    if(req.user.userType == 'client') {
        res.redirect('/client')
    } else { 
        Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .then((record) => {
               Result.findById({_id:req.params.resId})
                .then((result) => {
                    res.render('results/edit',{
                        patient:patient,
                        record: record,
                        result:result,
                        moment: moment
                    });
                })
        });        
    }).catch((err) => {
        res.send(err);
    });
    }
};

module.exports.put = (req, res) => {
    let userId = '5ba1fe4305a9ca0e80887de5';
    Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .then((record) => {
               Result.findByIdAndUpdate({_id:req.params.resId})
                .then((result) => {
                    result.evaluator = req.body.evaluator,
                    result.date = req.body.date,
                    result.findings = req.body.findings,
                    result.recommendation = req.body.recommendation,
                    result.followUp = req.body.follow_up,
                    result.remarks = req.body.remarks,
                    result.clearance = req.body.clearance,
                    result.note = req.body.doctors_note,
                    result.status = req.body.status,
                    result.privacy = req.body.privacy,
                    result.userId = userId;

                    result.save()
                        .then((updatedResult) => {
                            req.flash('success_msg',"<div class='alert alert-success'>Result has been successfully Updated</div>");
                            res.redirect(`/patients/${patient.id}/records/${record.id}/results`);
                        }).catch((err) => {
                            res.send(err);
                        })
                    })
        });        
    }).catch((err) => {
        res.send(err);
    });
   
};

module.exports.destroy = (req, res) => {

    Patient.findById({_id:req.params.id})
        .then((patient) => {
            Record.findById({_id: req.params.recId})
            .then((record) => {
                Result.findOneAndDelete({_id: req.params.resId})
                    .then((del) => {
                        req.flash('success_msg',"<div class='alert alert-success'>Result has been successfully Removed</div>");
                        res.redirect(`/patients/${patient.id}/records/${record.id}/results`);
                    });
        });        
    }).catch((err) => {
        res.send(err);
    });
};

let doctorSetup = (doctor) => { 
    return `Dr. ${doctor.firstname} ${doctor.middlename} ${doctor.lastname}, MD`;
}