var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){return;}

  fs.readdir("./imgs",function(err,files){
    res.write("<img />");
    res.end("<img />");
  });

}).listen(4000);



