// 读取页面,渲染数据
var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

http.createServer(function(req,res){
  // 模拟数据
  var data = {name: "张三",age: 23};
  // 获取模板
  var str = fs.readFileSync("./02.html");//返回值为buffer类型,不是字符串
  str = str.toString();
  // 渲染数据
  var html = ejs.render(str, data);
  // 返回给浏览器
  res.end(html);


}).listen(4000);