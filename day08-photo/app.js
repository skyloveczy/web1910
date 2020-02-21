// 开启服务
const express = require("express");
const bdParser = require("body-parser");
// 引入文件夹路由
const dir = require("./router/dir.js");
// 引入图片路由
const pic = require("./router/pic.js");

const app = express();

app.listen(4000);

// 设置视图模板引擎
app.set("view engine", "ejs");

// 设置请求解析方式
app.use(bdParser.urlencoded({extended: true}));

// 设置public文件夹为根目录
app.use(express.static("./public"));
// 设置uploads为根目录
app.use(express.static("./uploads"));

// 处理localhost:4000请求(显示所有的相册/文件夹)
app.get("/", function(req,res){
  // 重定向,让浏览器重新发送一个请求
  res.redirect("/dir/show");
});

// 文件夹相关的请求
app.use("/dir",dir);

// 图片相关的请求
app.use("/pic",pic);
