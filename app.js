const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const User = require('./models/user.model');

//DB CONFIG
const db = require('./config/database');

//CONNECT TO LOCAL 
/*
mongoose.connect('mongodb://localhost/ofw_portal')
    .then(() => {
        console.log("You are now Connected to database");
    }).catch((err) => console.log(err));
*/

mongoose.connect(db.mongoURI)
    .then(() => {
        console.log("You are now Connected to database");
    }).catch((err) => console.log(err));

mongoose.Promise = global.Promise;

const app = express();

app.set('view engine', 'ejs');

//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//Set public Folder
app.use(express.static(path.join(__dirname,'public')));
app.use(expressValidator());


app.use(session({
    secret: 'max', 
    saveUninitialized: true,
    resave: true,
    //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//require('./models/user.model');

//REQUIRE PATIENT ROUTE / PATIENT MIDDLEWARE
const patient = require('./routes/patient.route');
const user = require('./routes/user.route');
const record = require('./routes/record.route');
const result = require('./routes/result.route');
const agency = require('./routes/agency.router');
const client = require('./routes/client.router');
const admin = require('./routes/admin.router');

//Passport Config
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.redirect('/users/login');
});

app.get('/login',(req, res) => {
     res.render('login', {
         title: 'Form Validation',
         success: false, 
         errors:req.session.errors
        });
        req.session.errors = null;
});

//TESTER
app.post('/login',(req, res) => {
    req.check('email','Invalid Email').isEmail();
    req.check('password','Password must be 5 character long').isLength({min:4});

    var errors= req.validationErrors();
    if(errors) {
        req.session.errors = errors;
        res.redirect('login');
    }  else {
        res.send('Login');
    }
    
    
});

//USER ROUTE
app.use('/users',user);
//PATIENT ROUTES
app.use('/patients',patient);
//RECORDS ROUTES
app.use('/patients',record);
//RESULT ROUTES
app.use('/patients',result);
//AGENCY ROUTES
app.use('/agency',agency);
//CLIENT ROUTER
app.use('/client',client)
//ADMIN ROUTER
app.use('/admin',admin);

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT} ..`);
});