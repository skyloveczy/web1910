// 这是启动服务,引用路由 (route.js)

var express = require("express");
var app = express();
var router = require("./route.js"); // 引入路由

app.listen(4000);

app.get("/", function(req,res){
  res.send("<h1>这是首页</h1>");
})

// 调用路由处理所有以/student开头的请求
app.use("/student",router);






