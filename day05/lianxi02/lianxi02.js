var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
  if(req.url=="/"){
    // 处理localhost:4000请求,访问01.html
    fs.readFile("./01.html",function(err,data){
      res.end(data);
    })
    return ;
  }
  if(req.url=="/getpics"){
    // 处理Jquery发送的/getpics请求,读取imgs文件夹中的内容
    fs.readdir("./imgs",function(err,files){
      if(err){
        console.log(err);
        res.end();return;
      }
      files = files+"";
      res.end(files);
    })
    return ;
  }

  // 其他请求(获取对应请求的图片,因为图片的请求不定)
  fs.readFile("./"+req.url,function(err,data){
    res.end(data);
  })

}).listen(4000);
