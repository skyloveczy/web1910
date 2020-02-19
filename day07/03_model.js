// express的模板功能
var express = require("express");
var app = express();

app.listen(4000);

// 设置视图模板引擎
app.set("view engine","ejs");

app.get("/", function(req,res){
  var msg = "来自后台的信息";

  // 将数据渲染到模板
  res.render("01_model",{msg:msg});

});




