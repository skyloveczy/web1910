// 1 引入http
var http = require("http");

// 2 创建服务 req为请求,res为响应
var server = http.createServer(function(req,res){
  // 4 返回响应给浏览器
  // end的作用: 结束请求,返回响应
  // res.end("<h1 style='color:red;'>This is my first NodeJs Page</h1>");

  // 如果要返回中文,则需要设置响应头
  // res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  res.setHeader("Content-Type","text/html;charset=utf-8");
  res.end("中文");
});

// 3 开启服务,监听端口
server.listen(4000);

