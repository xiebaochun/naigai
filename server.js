var express = require('express');
var http = require('http');
var path = require('path');

function start(){
	var web = express();
	web.use(express.static(path.join(__dirname,'/')));

	http.createServer(web).listen('3033',function(){
		console.log('server at port 3033');
	});
}
start();