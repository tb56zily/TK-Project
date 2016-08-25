var server=require("./server2");
var router=require("./Router");
var requestHandler = require("./Handler");



//var Handle=requestHandler.apiRoutes;
console.log(typeof server);
console.log(typeof router);
console.log(typeof requestHandler);
//console.log(typeof requestHandler.apiRoutes);

server.startServer();


//server.start(router.route, requestHandler.apiRoutes);
