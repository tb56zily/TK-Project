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
    //console.log(req.headers);
    //var user_name=req.body.user;
 //var password=req.body.password;
 //console.log("User name = "+user_name+", password is "+password)
    if (!req.body.name                                                                                              || !req.body.password) {
      console.log("No username or password recieved");
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  //});
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
         var newPath = './public/';
         if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath);
          }
        file.pipe(fs.createWriteStream(newPath + filename));
        console.log("Saved File to:" +newPath);
      });
      busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("File uploaded successfully!");
      });
      return req.pipe(busboy);
    }
    res.writeHead(404);
    res.end();
}

      // Submission function
      function addNewSubmission(req,res){

          if (!req.body.title) {
            console.log("No titlerecieved");
            res.json({success: false, msg: 'Please pass title.'});
          }
          else {
            var newSubmission = new Submission({
              _id:2,// make this auto inc
              title: req.body.title,
              authors : req.body.authors,
              abstract: req.body.abstract,
              keywords:req.body.keywords,
              filename:req.body.filename,
              last_name: req.body.last_name,
              status :req.body.status,
              conferenceId:req.body.conferenceId,
              username:req.body.username
            });
            // save the submission
            newSubmission.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'error submitting'});
              }
              res.json({success: true, msg: 'Successful submission.'});
            });
          }
      }

      //Fetch all the conference and their details of a particular author
       function getMySubmissions(req,res){
        console.log("inside getMySubmissions method");
        //   var token = getToken(req.headers);
        // console.log("req.headers" + req.headers);
        // console.log("token" + token);
          // if (token) {
          //  var decoded = jwt.decode(token, config.secret);
            if(req.body.status){
              console.log("inside getMySubmissions if method" + req.body.username);
              Submission.find({username: req.body.username, status: req.body.status}, function(err, submission) {
                  if (err) throw err;
                  if (!submission) {
                    return res.status(403).send({success: false, msg: 'No records found.'});
                  } else {
                    res.json({success: true, msg: 'Records found for user ' + submission + '!'});
                  }
              });
            }else {
              console.log("inside getMySubmissions else method" + req.query.username);
              Submission.findSubmissionByUserName(req.query.username, function(err, submission) {
                console.log("submission data:" + submission);
                  if (err) throw err;
                  if (!submission) {
                    return res.status(403).send({success: false, msg: 'No records found.'});
                  } else {
                    res.json({success: true, msg: 'Records found for user ' + submission + '!'});
                  }
              });
            }

          // } else {
          //   console.log("inside getMySubmissions token  else method" + req.body.username);
          //   return res.status(403).send({success: false, msg: 'No token provided.'});
          // }
        }


        // Submission function
        function addNewConference(req,res){
            if (!req.body.topic && !req.body.submStartDate && !req.body.reviewStartDate) {
              console.log("Enter mandatory fields");
              res.json({success: false, msg: 'Please pass all details.'});
            }
            else {
              console.log(" addNewConference methoddddddddddd");
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

              // save the submission
              newConference.save(function(err) {
                if (err) {
                  return res.json({success: false, msg: 'error submitting'});
                }
                res.json({success: true, msg: 'Successful submission.'});
              });
            }
        }

        //Fetch all the Topics opened by chair
         function getAllConferences(req,res){
          console.log("inside getAllConferences method");
          //   var token = getToken(req.headers);
          // console.log("req.headers" + req.headers);
          // console.log("token" + token);
            // if (token) {
            //  var decoded = jwt.decode(token, config.secret);

            var topic='sdsd';
                Conference.findConferenceByTopic(topic, function(err, conference) {
                  console.log("Conference topic:" + topic);
                  console.log("Conference data:" + conference);
                    if (err) throw err;
                    if (!conference) {
                      return res.status(403).send({success: false, msg: 'No records found.'});
                    } else {
                      res.json({success: true, msg: 'Records found for user ' + conference + '!'});
                    }
                });


            // } else {
            //   console.log("inside getMySubmissions token  else method" + req.body.username);
            //   return res.status(403).send({success: false, msg: 'No token provided.'});
            // }
          }

          //Fetch all the Topics opened by chair
           function getAllSubmissions(req,res){
            console.log("inside getAllConferences method");
                    Submission.findAllSubmissions(function(err, submission) {
                    console.log("All submissions data:" + submission);
                      if (err) throw err;
                      if (!submission) {
                        return res.status(403).send({success: false, msg: 'No records found.'});
                      } else {
                        res.json({success: true, msg: 'Records found  ' + submission + '!'});
                      }
                  });
            }

            //Fetch all the authors who submitted
             function getAllSubmittedUsers(req,res){
              console.log("inside getAllSubmittedUsers method");
                      Submission.findAllSubmittedUsers(function(err, authors) {
                      console.log("All submissions Users:" + authors);
                        if (err) throw err;
                        if (!authors) {
                          return res.status(403).send({success: false, msg: 'No records found.'});
                        } else {
                          res.json({success: true, msg: 'Records found  ' + authors + '!'});
                        }
                    });
              }


            // withdrawSubmissionById function
            function withdrawSubmissionById(req,res){

                  console.log(" withdrawSubmissionById method");
                  if(req.body._id){
                    // remove  the submission
                    submission.removeSubmissionById({_id: req.body._id},function(err) {
                      if (err) {
                        return res.json({success: false, msg: 'error removing'});
                      }
                      res.json({success: true, msg: 'Successful Removal of submission with ID:' + req.body._id});
                    });
                  }
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
