var http = require('http');
var url = require("url");

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }
  res.setHeader("Content-Type","text/html;charset=utf-8");
  var urlStr = req.url; // 字符串请求
  var urlObj = url.parse(urlStr,true);
  var pathname = urlObj.pathname; // 请求路径
  var query = urlObj.query; // 请求参数
  // 判断请求路径
  if(pathname=='/login'){
    // 取参数
    var name = query.username;
    var pwd = query.password;
    res.end("你输入的是用户名是:"+name+",密码是"+pwd);
    return ;
  }
  // 其他地址
  res.end("地址输入错误");


}).listen(4000);


