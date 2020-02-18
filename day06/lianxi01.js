var http = require("http");
var route = require("./route.js");

http.createServer(function(req,res){

  res.setHeader("Content-Type","text/html;charset=utf-8");

  if(req.url=="/"){
    route.showIndex(req,res);
    return ;
  }
  if(req.url=="/info"){
    route.showInfo(req,res);
    return ;
  }

  route.showError(req,res);



}).listen(4000);