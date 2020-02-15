// 1 引入
var http = require('http');
var fs = require('fs'); // fs模块--file system


// 2 创建服务
var server = http.createServer(function(req,res){
  // 防止后续中文乱码
  // res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  // res.end("<h1>这是一级标题</h1>");
  // 使用fs模块读取页面的内容,将其返回给浏览器
  fs.readFile("./a.html",function(err,data){
    if(err){
      // 读取时出错
      console.log(err);
      res.end("read file error");
      return ;
    }
    // 读取成功,返回数据
    res.end(data);
  });
});

// 3 监听端口
server.listen(4000);


