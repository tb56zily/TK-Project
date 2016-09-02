//var express     = require('express');
//var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database');
var requestHandler = require("./Handler");

  //mongoose.connect(config.database);

  //require('./config/passport')(passport);

  module.exports = function(app,express){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // log to console
    app.use(morgan('dev'));
    app.use(express.static(__dirname + '/core'));
    app.get('*', function(req, res) {
      res.sendfile(__dirname + '/core/index.html')
    })
    // Use the passport package in our application
    //app.use(passport.initialize());

    app.get('/',function(req,res){
        //res.send("A flayed man has no secrets")
        console.log(typeof (req));
        console.log(typeof (res));
        requestHandler.homepage(req,res);
        //app.use(express.static(__dirname + '/core'));

     });
     app.post('/signup',function(req,res){  // this has to be a post method remember to change that
        //res.send("A lannister always pays his debts");
        requestHandler.signup(req,res);
     });

     app.post('/authenticate',function(req,res){
       //res.send("winter is coming");
       requestHandler.authenticate(req,res);
     });

     app.get('/memberinfo',function(req,res){
      //res.send("Unbowed , unbent , unbroken");
      requestHandler.memberinfo(req,res);
     });

    // app.get('/test',function(req,res){
     //res.send("Unbowed , unbent , unbroken");
    // requestHandler.test(req,res);
     //});
     app.post('/test1',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
    console.log(req.body)
     requestHandler.test1(req,res);
     });

     app.post('/addNewSubmission',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.addNewSubmission(req,res);
     });

     app.post('/uploadFile', function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.uploadFile(req,res);
     });

     app.get('/getSubmissionById',function(req,res){
     requestHandler.getSubmissionById(req,res);
     });

     app.get('/getMySubmissions',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.getMySubmissions(req,res);
     });

     app.post('/addNewConference', function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.addNewConference(req,res);
     });

     app.get('/getAllConferences',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.getAllConferences(req,res);
     });

     app.get('/getAllSubmissions',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.getAllSubmissions(req,res);
     });

     app.post('/withdrawSubmissionById',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.withdrawSubmissionById(req,res);
     });

     app.post('/getAllSubmittedUsers',function(req,res){
    //res.send("Unbowed , unbent , unbroken");
     requestHandler.getAllSubmittedUsers(req,res);
     });

     app.post('/assignReviewer',function(req,res){
     requestHandler.assignReviewer(req,res);
     });

     app.post('/submitReview',function(req,res){
     requestHandler.submitReview(req,res);
     });

     app.post('/changePswd',function(req,res){
     requestHandler.changePswd(req,res);
     });

     app.post('/editProfile',function(req,res){
     requestHandler.editProfile(req,res);
     });
  }

	//console.log("About to route a request for " + pathname);
  //console.log(requestHandler.app);
  //console.log(typeof handle);
	//if (typeof handle === 'function') {
		//handle[pathname](request,response);
    //app.use('/api',handle);


		//}
	//else {
		//console.log("No request handler found for " + pathname);
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write("Hello World");
		//console.log("holyshit....its working");
		//response.end();
		//}
