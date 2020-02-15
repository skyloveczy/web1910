var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }
  // 解析请求地址
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname; // 请求路径
  var query = urlObj.query; // 请求参数

  // 当请求路径为/regist时,接收参数
  if(pathname=="/regist"){
    var username = query.username;
    var password = query.password;
    // 创建username的文件,将password写入进去
    fs.writeFile("./"+username+".txt",password,function(err){
      if(err){
        console.log(err);
        res.end("<h1>regist failed</h1>");
        return ;
      }
      res.end("<h1>regist success</h1>");
    });
    return ;
  }
  // 请求路径不是/regist
  // 读取表单页面并显示
  fs.readFile("./lianxi04.html",function(err,data){
    if(err){
      console.log(err);
      res.end("<h1>Page Error</h1>");
      return ;
    }
    res.end(data);
  });



}).listen(4000);





