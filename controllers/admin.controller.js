const Agency = require('../models/agency.model');
const Country = require('../models/country.model');



module.exports.admin = (req, res) => {
    //display individual client
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        if(req.query.type == 'client') {
            Agency.find({name:regex})
            .then((agencies) => {
                res.render('admins/cd', {
                    agencies:agencies,
                    search:true,
                    type:'client',
                    searchString:req.query.search
                });
            }).catch((err) => {
                res.send(err);
            })
        }
        //display individual country
        if(req.query.type == 'country') {
            //res.send("country");
            Country.find({name:regex})
            .then((countries) => {
                res.render('admins/cd', {
                    countries:countries,
                    search:true,
                    type:'country',
                    searchString:req.query.search
                });
            }).catch((err) => {
                res.send(err);
            })
        }
    
    } else {
            //display all countries
        if(req.query.type == 'country') {
            //res.send("country all");
            Country.find({})
                .then((countries) => {
                    res.render('admins/cd', {
                        countries:countries,
                        type:'country',
                        search:true,
                        searchString:req.query.search
                    })
                }).catch((err) => {
                    res.send(err);
                })
        } else {
            //display all agencies
            Agency.find({})
            .then((agencies) => {
                res.render('admins/cd', {
                    agencies:agencies,
                    search:true,
                    type:'client',
                    searchString:req.query.search
                })
            }).catch((err) => {
                res.send(err);
            })
        }
    }

};

module.exports.client_add = (req, res) => {
    res.render('admins/client_add', {
      errors:false,
      search:false
    });
}

module.exports.client_create = (req, res) => {
  let newAgency = new Agency({
      name : req.body.name,
      contactPerson : req.body.contact_person,
      contact : req.body.contact,
      address : req.body.address,
      status: req.body.status,
      user : null
  });

  req.checkBody('name','Agency name is required').notEmpty();
  if(req.body.name) {
        req.checkBody('name', 'Agency name must be 3 characters long ').isLength({ min: 3, max:120 });
  }

  req.checkBody('contact_person','Contact Person Full Name is required.').notEmpty();
  if(req.body.contact_person) {
        req.checkBody('contact_person', 'Contact Person must be 2 characters long ').isLength({ min: 2, max:50 });
        req.checkBody('contact_person','Contact Person contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
  }

  req.checkBody('contact','Contact number is required.').notEmpty();
  if(req.body.contact) {
        req.checkBody('contact', 'Contact no. must be 6 to 20 digits long ').isLength({ min: 6, max:20 });
        req.checkBody('contact','Contact no. cannot contain any letter, special character and white space').matches(/^\d+$/);
  }

  req.checkBody('address','Address is required.').notEmpty();
  if(req.body.address) {
        req.checkBody('address', 'Address must be 10 characters long ').isLength({ min: 10, max:80 });
  }

  let errors = req.validationErrors();

  if(errors) {
    res.render('admins/client_add', {
        errors:errors,
        name :toUpperCase(req.body.name),
        contactPerson :toUpperCase(req.body.contact_person),
        contact : req.body.contact,
        address : toUpperCase(req.body.address),
        status : req.body.status,
    });
  } else {
    newAgency.save()
        .then(() =>{
            req.flash('success_msg',"<div class='alert alert-success'>Client has been successfully Added</div>");
            res.redirect('/admin');
        }).catch((err) => {
            res.send(err);
        })
  }

}

module.exports.client_edit = (req, res) => {
    Agency.findById({_id:req.params.id})
        .then((agency) => {
            res.render('admins/client_edit', {
                errors:false,
                agency:agency
            });
        });
}

module.exports.client_post = (req, res) => {

  req.checkBody('name','Agency name is required').notEmpty();
  if(req.body.name) {
        req.checkBody('name', 'Agency name must be 3 characters long ').isLength({ min: 3, max:120 });
  }

  req.checkBody('contact_person','Contact Person Full Name is required.').notEmpty();
  if(req.body.contact_person) {
        req.checkBody('contact_person', 'Contact Person must be 2 characters long ').isLength({ min: 2, max:50 });
        req.checkBody('contact_person','Contact Person contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
  }

  req.checkBody('contact','Contact number is required.').notEmpty();
  if(req.body.contact) {
        req.checkBody('contact', 'Contact no. must be 6 to 20 digits long ').isLength({ min: 6, max:20 });
        req.checkBody('contact','Contact no. cannot contain any letter, special character and white space').matches(/^\d+$/);
  }

  req.checkBody('address','Address is required.').notEmpty();
  if(req.body.address) {
        req.checkBody('address', 'Address must be 10 characters long ').isLength({ min: 10, max:80 });
  }

  let errors = req.validationErrors();

  if(errors) {
    res.render('admins/client_add', {
        errors:errors,
        name :toUpperCase(req.body.name),
        contactPerson :toUpperCase(req.body.contact_person),
        contact : req.body.contact,
        address : toUpperCase(req.body.address),
        status : req.body.status
    });
  } else {
    Agency.findById({_id: req.params.id})
        .then((agency) => {
            agency.name  = toUpperCase(req.body.name),
            agency.contactPerson  = toUpperCase(req.body.contact_person),
            agency.contact = req.body.contact,
            agency.address = toUpperCase(req.body.address),
            agency.status = req.body.status

            agency.save()
                .then(() => {
                    req.flash('success_msg',"<div class='alert alert-success'>Client has been successfully Updated</div>");
                    res.redirect('/admin');
                }).catch((err) => {
                    res.send(err);
                })
        });
  }
}

module.exports.client_delete = (req, res) => {
    Agency.findByIdAndDelete({_id:req.params.id})
        .then(() => {
            req.flash('success_msg',"<div class='alert alert-success'>Client has been successfully Deleted</div>");
            res.redirect('/admin');
        }).catch((err) => {
            res.send(err);
        })
}

// =========== COUNTRY CONTROLLER ==================//
module.exports.country_add = (req, res) => {
    res.render('admins/country_add', {
        errors:false
    });
}

module.exports.country_create = (req, res) => {
    let newCountry = new Country({
        name : req.body.name.toUpperCase(),
        status: req.body.status,
        user: req.user.id
    });
    req.checkBody('status','Status is required.').notEmpty();
    req.checkBody('name','Country Name is required.').notEmpty();
    req.checkBody('name','Country Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);

    if(req.body.name) {
        req.checkBody('name', 'Country Name must be 2 characters long ').isLength({ min: 2, max:120 });
    }

    let errors = req.validationErrors();

    if(errors) {
        res.render('admins/country_add', {
            errors:errors,
            name:req.body.name,
            status:req.body.status
        })
    } else {
        newCountry.save()
        .then((savedCountry) => {
            req.flash('success_msg',"<div class='alert alert-success'>Country has been successfully Added</div>");
           res.redirect('/admin');
        }).catch((err) => {
            res.send(err);
        });
    }
}

module.exports.country_edit = (req, res) => {
    Country.findById({_id:req.params.id})
        .then((country) => {
            res.render('admins/country_edit', {
                country:country,
                errors:false
            })
        });
}

module.exports.country_put = (req, res) => {

    req.checkBody('status','Status is required.').notEmpty();
    req.checkBody('name','Country Name is required.').notEmpty();
    req.checkBody('name','Country Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);

    if(req.body.name) {
        req.checkBody('name', 'Country Name must be 2 characters long ').isLength({ min: 2, max:120 });
    }

    let errors = req.validationErrors();

    if(errors) {
        Country.findById({_id: req.params.id})
            .then(country => {
                res.render('admins/country_edit', {
                    errors:errors,
                    name:req.body.name,
                    status:req.body.status,
                    country:country
                })
            }).catch((err) => {
                res.send(err);
            })
    } else {
        Country.findById({_id: req.params.id})
            .then((country) => {
                country.name = req.body.name.toUpperCase(),
                country.status =  req.body.status

                country.save()
                    .then(() => {
                        req.flash('success_msg',"<div class='alert alert-success'>Country has been successfully Updated</div>");
                        res.redirect('/admin');
                    });
            }).catch((err) => {
                res.send(err);
            });
        /*
        newCountry.save()
        .then((savedCountry) => {
            req.flash('success_msg',"<div class='alert alert-success'>Country has been successfully Updated</div>");
           res.redirect('/admin');
        }).catch((err) => {
            res.send(err);
        });
        */
       
    }
}

let toUpperCase = (text) => {
    return text.toUpperCase();
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};