// 启动服务,访问project页面
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }

  /*
    /            --->   project   /index.html
    /index.css   ---->  project   /index.css
    /index.js    ---->  project   /index.js
    /1.jpg       ---->  project   /1.jpg
  */
  var path = req.url;
  if(path=="/"){
    path = "/index.html";
  }

  fs.readFile("project"+path,function(err,data){
    if(err){
      console.log(err);
      res.end("ERROR");
      return ;
    }
    res.end(data);
  });

}).listen(4000);
