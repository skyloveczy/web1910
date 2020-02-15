var http = require("http");
var fs = require("fs");
var url = require('url');

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }

  // 方法三
  var urlObj = url.parse(req.url,true);
  var query = urlObj.query;
  var name = query.name;
  fs.readFile("./"+name+".html",function(err,data){
    if(err){
      console.log(err);
      res.end("params error");
      return ;
    }
    console.log(data);
    res.end(data);
  })



  // 方法二
  /* var urlStr = req.url;
  fs.readFile("."+urlStr+".html",function(err,data){
    if(err){
      console.log(err);
      res.end("request error");
      return ;
    }
    res.end(data);
  }); */




// 方法一
  /* if(req.url=="/circle"){
    fs.readFile("./circle.html",function(err,data){
      if(err){
        res.end("read error");
        console.log(err);
        return ;
      }
      res.end(data);
    });
    return ;
  }
  if(req.url=="/square"){
    fs.readFile("./square.html",function(err,data){
      if(err){
        res.end("read error");
        console.log(err);
        return ;
      }
      res.end(data);
    });
    return ;
  }

  res.end("request error"); */

}).listen(4000);


