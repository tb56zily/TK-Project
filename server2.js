var url         = require('url');
var port        = process.env.PORT || 8800;

var http        = require('http');
var express     = require('express');
var app         = express();


//
// Start the server
//app.listen(port);


function start(){
  require('./Router')(app,express);


  // Start the server
  app.listen(port);


}


//module.exports=function start(route,handle){

  //app.listen(port);

//function onRequest(request,response){

  //var pathname=url.parse(request.url).pathname;
	//console.log("Request for " + pathname + " received.");
  //this line could need changes, see into it later.
	//route(handle,pathname,request,response);

//}


//http.createServer(onRequest).listen(8800);
//console.log('Winter is coming BITCH: http://localhost:' + port);
//}
exports.startServer=start;
