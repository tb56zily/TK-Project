//var express     = require('express');
//var app         = express();

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var Submission  = require('./app/models/submission'); // get the mongoose model
var Conference  = require('./app/models/conference'); // get the mongoose model
var jwt         = require('jwt-simple');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');
var Busboy = require('busboy');

var express = require('express'),
router = express.Router(),
methodOverride = require('method-override'); //used to manipulate POST
router.use(busboy());
router.use(express.static(path.join(__dirname, 'public')));



// var router      = require('./Router');

//var http        = require('http');

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.http://localhost:json());
// log to console
//app.use(morgan('dev'));

// Use the passport package in our application
//app.use(passport.initialize());


// connect to database
mongoose.connect(config.database);

// pass passport for configuration
                                 //require('./config/passport');
require('./config/passport')(passport);
// bundle our routes


// route to the home page

function home(req, res){

//res.send('Hello! The API is at http://localhost:' + port + '/api');
res.send("home page has not been set up yet");

}
//function signup(request,response){
// create a new user account (POST http://localhost:8800/api/signup)
//apiRoutes.post('/signup',function(req, res) {
function test(req, res) {
  res.send({success: false, msg: 'Authentication failed. Wrong password.'});
  res.send("This sucks bi");
}

function test1(req, res) {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa')
  console.log(req.body)
  res.send('post success');


}
function signup(req,res){
    console.log(req.body);
  if (!req.body.email || !req.body.password)
    {
      console.log("No username or password recieved");
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        _id:req.body.email,
        password: req.body.password,
        firstname:  req.body.first_name,
        lastname:  req.body.last_name,
        email: req.body.email,
        institute: req.body.institute,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postcode,
        country: req.body.country
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err)
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }

}


//}


function authenticate(req,res){
console.log("We are inside the authenticate function");
  // route to authenticate a user (POST http://localhost:8800/api/authenticate)
/*apiRoutes.post('/authenticate', function(req, res) {*/
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });

}


//function memberinfo(request,response){
  // route to a restricted info (GET http://localhost:8800/api/memberinfo)

//apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
 function memberinfo(req,res){
  console.log("we are in memberinfo method");
    var token = getToken(req.headers);
      if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
          name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
              return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
      } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
    //});
  }

    getToken = function (headers) {
      if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
          return parted[1];
        } else {
          return null;
        }
      } else {
        return null;
      }
    };



    function uploadFile(req,res){
      console.log("inside uploadFile");
      if (req.method === 'POST') {
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          var newPath = path.join(__dirname, '/upload/');
          var newPath = './uploads/';
          if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath);
          }
          file.pipe(fs.createWriteStream(newPath + 'userName'));
          console.log("uploaded File with Username, to directory:" +newPath);
        });
        busboy.on('finish', function() {
          res.writeHead(200, { 'Connection': 'close' });
          //res.end("File uploaded Successfully!");
        });
        return req.pipe(busboy);
      }
      res.writeHead(404);
      res.end();
    }

    // Adding new Submission of a user
    function addNewSubmission(req,res){
      console.log("Adding a new Submission..." + req.body.abstract);
      if (!req.body.title) {
        console.log("No titlerecieved");
        res.json({success: false, msg: 'Please pass title.'});
      }
      else {
        console.log("Creating a new Submission schema...");
        var newSubmission = new Submission({
          _id:2,// make this auto inc
          title: req.body.title,
          authors : req.body.authors,
          abstract: req.body.abstract,
          keywords:req.body.keywords,
          filename:'filename',//req.body.filename,
          last_name: 'lname',//req.body.last_name,
          status :'open',//req.body.status,
          conferenceId:req.body.conferenceId,
          username:'username'//req.body.username
        });
        console.log("new sub obj:"+newSubmission);
        // save the submission
        newSubmission.save(function(err) {
          console.log("Trying to save data to db...");
          if (err) {
            console.log("Error occurred!!Failed to save data to db...");
            return res.json({success: false, msg: 'error submitting'});
          }
          console.log("Saving data to db was Successful...");
          res.json({success: true, msg: 'Successful submission.'});
        });
      }
    }

    //Fetch all the submissions of a particular author
    function getMySubmissions(req,res){
      console.log("Retrieving all the submissions of user-"+req.query.username);
      if(req.body.status){
        console.log("with status="+req.body.status);
        Submission.find({username: req.body.username, status: req.body.status}, function(err, submission) {
          if (err) throw err;
          console.log("Error Retrieving all the submissions of  user-"+req.query.username+"with status="+req.body.status);
          if (!submission ||  submission==null) {
            console.log("Error Retrieving all the submissions of  user-"+req.query.username+"with status="+req.body.status);
            return res.status(403).send({success: false, msg: 'No records found.'});
          } else {
            console.log("Successfully Retrieved all the submissions of user-"+req.query.username+"with status="+req.body.status);
            res.json({success: true, msg: 'Records found for user ' + submission + '!'});
          }
        });
      }else {
        Submission.findSubmissionByUserName(req.query.username, function(err, submission) {
          console.log("submission data:" + submission);
          if (err) throw err;
          if (!submission) {
            console.log("Error Retrieving all the submissions of  user-"+req.query.username);
            return res.status(403).send({success: false, msg: 'No records found.'});
          } else {
            console.log("Successfully Retrieved all the submissions of  user-"+req.query.username);
            res.json({success: true, msg: 'Records found for user ' + submission + '!'});
          }
        });
      }
    }


    // Adding new Conference topics
    function addNewConference(req,res){
      if (!req.body.topic && !req.body.submStartDate && !req.body.reviewStartDate) {
        console.log("Enter mandatory fields");
        res.json({success: false, msg: 'Please pass all details.'});
      }
      else {
        console.log("Trying to add new Conference topic....");
        var newConference = new Conference({
          _id : req.body._id,
          topic: req.body.topic,
          sub_status : req.body.sub_status,
          review_status: req.body.review_status,
          chair:req.body.chair,
          detail:req.body.detail,
          sub_start_date: req.body.sub_start_date,
          sub_end_date :req.body.sub_end_date,
          review_start_date:req.body.review_start_date,
          review_end_date:req.body.review_end_date
        });

        // save the conference to db
        newConference.save(function(err) {
          if (err) {
            console.log("Error adding new Conference...");
            return res.json({success: false, msg: 'error submitting'});
          }
          console.log("Successfully added new Conference...");
          res.json({success: true, msg: 'Successful submission.'});
        });
      }
    }

    //Fetch all the conference topics opened by chair
    function getAllConferences(req,res){
      console.log("Trying to retrieving all the open conferences...");
      var topic=req.body.topic;
      Conference.findConferenceByTopic(topic, function(err, conference) {
        if (err) throw err;
        if (!conference) {
          console.log("Error retrieving all the open conferences...");
          return res.status(403).send({success: false, msg: 'No records found.'});
        } else {
          console.log("Successfully retrieved all the open conferences...");
          res.json({success: true, msg: 'Records found for user ' + conference + '!'});
        }
      });
    }

    //Fetch all the submissions of all users
    function getAllSubmissions(req,res){
      console.log("Trying to retrieving all the submissions of all users...");
      Submission.findAllSubmissions(function(err, submission) {
        if (err) throw err;
        if (!submission) {
          console.log("Error retrieving all the submissions of all users...");
          return res.status(403).send({success: false, msg: 'No records found.'});
        } else {
          console.log("Successfully retrieved all the submissions of all users...");
          res.json({success: true, msg: 'Records found  ' + submission + '!'});
        }
      });
    }

    //Fetch all the active authors
    function getAllSubmittedUsers(req,res){
      console.log("Trying to retrieving all the active authors...");
      Submission.findAllSubmittedUsers(function(err, authors) {
        if (err) throw err;
        if (!authors) {
          console.log("Error retrieving all the active authors...");
          return res.status(403).send({success: false, msg: 'No records found.'});
        } else {
          console.log("Successfully retrieved all the active authors...");
          res.json({success: true, msg: 'Records found  ' + authors + '!'});
        }
      });
    }


    // withdrawSubmissionById function
    function withdrawSubmissionById(req,res){
      console.log("Trying to remove a submission ...");
      if(req.query._id){
        // remove  the submission
        Submission.removeSubmissionById({_id: req.query._id},function(err) {
          if (err) {
            console.log("Error removing submission with submission Id:"+req.query._id);
            return res.json({success: false, msg: 'error removing'});
          }
          console.log("Successfully removing submission with submission Id:"+req.query._id);
          res.json({success: true, msg: 'Successful Removal of submission with ID:' + req.query._id});
        });
      }else{
        console.log("unable to find the record");
        return res.json({success: false, msg: 'unable to find the record'});
      }
    }

    //Fetch all the Authors
    function getAllChair(req,res){
      console.log("Trying to retrieve all the chair persons...");
      Conference.getAllChair(function(err, listChair) {
        if (err) throw err;
        if (!listChair) {
          console.log("Error retrieving all the chair persons...");
          return res.status(403).send({success: false, msg: 'No records found.'});
        } else {
          console.log("Successfully retrieved all the chair persons...");
          res.json({success: true, msg: 'Records found for user ' + listChair + '!'});
        }
      });
    }

    //Fetch all the Reviewers
    function getAllReviewers(req,res){
      console.log("Trying to retrieve all the Reviewers...");
      Conference.getAllReviewers(function(err, listReviewers) {
        if (err) throw err;
        if (!listReviewers) {
          console.log("Error retrieving all the Reviewers...");
          return res.status(403).send({success: false, msg: 'No records found.'});
        } else {
          console.log("Successfully retrieved all the Reviewers...");
          res.json({success: true, msg: 'Records found for Reviewers' + listReviewers + '!'});
        }
      });
    }


// connect the api routes under /api/*
exports.homepage=home;
exports.signup=signup;
exports.memberinfo=memberinfo;
exports.authenticate=authenticate;
exports.test =test;
exports.test1 = test1;
exports.uploadFile=uploadFile;
exports.addNewSubmission=addNewSubmission;
exports.getMySubmissions=getMySubmissions;
exports.addNewConference=addNewConference;
exports.getAllConferences=getAllConferences;
exports.getAllSubmissions=getAllSubmissions;
exports.withdrawSubmissionById=withdrawSubmissionById;
exports.getAllSubmittedUsers=getAllSubmittedUsers;

/*data: JSON.stringify({
  'name': "Adnan",
  'password': "$2a$10$qLTiADlQW.8Qor7/DvEPyeVL2f4BiO95dHzvq9EpXYwvEnzjIQgi6"
})*/
