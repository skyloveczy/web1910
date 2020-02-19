var express = require("express");
var app = express();

app.listen(4000);

// 处理get的/请求
app.get("/", function(req,res){
  // res.end("<h1>express</h1>");
  // res.send("<h1>express-2</h1>");
  // res.end("<h1>NodeJS框架</h1>");
  res.send("<h1>NodeJS框架</h1>");
});

// 处理get的 /a 请求
// 请求地址的匹配是忽略大小写,忽略参数,忽略锚点
app.get("/a", function(req,res){
  console.log("请求地址: ",req._parsedUrl.pathname);
  console.log("请求参数: ", req.query);
  res.send("get的/a请求");
}); 

// 结合正则表达式
// 处理这种格式的请求 /login/用户名/密码
app.get(/\/login\/(\w+)\/(\d+)/, function(req,res){
  console.log(req.params);
  console.log(req.params[0]);
  console.log(req.params[1]);

  res.send("<h1>正则表达式匹配的请求</h1>");
});

// 第二种传递参数的方式
app.get("/show/:name/:age", function(req,res){
  console.log(req.params);
  console.log(req.params["name"]);

  res.send("");
});

