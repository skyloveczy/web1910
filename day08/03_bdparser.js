// post请求参数的处理
var express = require("express");
var bdParser = require("body-parser");
var app = express();

app.listen(4000);

// 设置请求解析方式
// application/x-www-form-urlencoded
app.use(bdParser.urlencoded({extended: true}));

// /请求,显示登录页面
app.get("/",function(req,res){
  res.render("03_post.ejs");
});

// post的/login请求
app.post("/login", function(req,res){
  console.log(req.body);
  res.send("OVER");
});
