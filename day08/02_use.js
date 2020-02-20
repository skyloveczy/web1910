// use中间件的使用
var express = require("express");
var app = express();

app.listen(4000);

// 处理所有的以/name开头的请求
// app.use("/name", function(req,res){
//   res.send("<h1>name请求</h1>");
// });

// 处理所有以/a/b/c开头的请求 /a/b/c, /a/b/c/abc
// app.use("/a/b/c",function(req,res){

// });


// 处理所有以/a开头的至少两个层级的请求
// app.use("/a/:id",function(req,res){
//   res.end();
// })

// 处理所有以/开头的请求
// 因为请求都是以/开头的,所以就是处理所有的请求
app.use("/",function(req,res){
  res.send("<h1>xxxx</h1>");
})
// 简写的方式:
// app.use(function(req,res){

// })
