var express = require("express");
var fd = require("formidable");
var fs = require("fs");
var app = express();

app.listen(4000);

// 处理get的/请求,显示上传的页面
app.get("/", function(req,res){
  // 返回视图页面
  // 如果设置了视图模板引擎,则可以省略后缀名
  res.render("01.ejs");
});

// 处理post的/upload请求
app.post("/upload",function(req,res){
  // 创建表单对象
  var form = new fd.IncomingForm();
  // 设置上传临时保存路径 temp,  pics是改名后保存的路径
  form.uploadDir = "./temp";
  // 解析请求
  form.parse(req, function(err,fields,files){
    if(err){
      console.log(err);
      res.send("<h1>上传失败</h1>");
      return ;
    }
    // 上传成功
    // 修改名称
    // 获取图片对象
    var pic = files.pic;
    console.log(pic);
    // 获取路径
    var oldPath = pic.path;
    // 名称
    var name = pic.name;
    // 新路径
    var newPath = "./pics/"+name;
    fs.rename(oldPath, newPath, function(err){
      if(err){
        console.log(err);
        res.send("<h1>改名出错</h1>");
        return ;
      }
      res.send("上传成功");
    });

  })
});

