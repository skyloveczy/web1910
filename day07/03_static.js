var express = require("express");
var fs = require("fs");
var app = express();

app.listen(4000);

// 设置视图模板引擎
app.set("view engine", "ejs");

// 设置根目录
app.use(express.static("./upload"));

app.get("/", function(req,res){
  // 读取upload下所有的图片
  fs.readdir("./upload",function(err,files){
    if(err){
      console.log(err);
      res.send("<h1>显示失败</h1>");
      return ;
    }
    // 传递数据
    res.render("02_static",{pics: files, msg: "相册"});
  });
})


