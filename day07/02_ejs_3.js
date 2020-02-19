// 读取页面和图片,显示在浏览器上
var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){return ;}

  // 读取页面模板
  var html = fs.readFileSync("./02_pic.html","utf-8");
  // 读取所有图片
  var pics = fs.readdirSync("./upload");

  // 渲染数据
  html = ejs.render(html,{pics: pics});
  res.end(html);


}).listen(4000);





