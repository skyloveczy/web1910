var http = require("http");

http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return ;
  }

  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});

  // write方法用于返回数据给浏览器,但是不结束请求
  res.write("<h1>第一次返回</h1>");
  res.write("<h2>第二次返回</h2>");
  res.write("<h3>第三次返回</h3>");

  // 结束请求
  res.end();



}).listen(4000);