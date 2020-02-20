var express = require("express");
var app = express();
var fs = require("fs");

app.listen(4000);

// 设置根目录后,访问localhost:4000时,如果根目录中有index.html
// 则自动返回该页面
app.use(express.static("./project"));



// app.use(root("pics"));

// function root(dir){
//   return function(req,res){
//     var path = req._parsedUrl.pathname;
//     fs.readFile(dir+path,function(err,data){
//       console.log(err);
//       res.end(data);
//     })
//   }
// }

