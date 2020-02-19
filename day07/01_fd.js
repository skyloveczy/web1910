// 处理文件的上传,保存到当前路径下,同时修改为文件原来的文件名
var http = require("http");
var fs = require("fs");
var fd = require("formidable");

http.createServer(function(req,res){
  if(req.url=="/upload" && req.method.toLowerCase()=="post"){
    // 创建表单对象
    var form = new fd.IncomingForm();
    // 设置上传文件临时保存的路径(临时保存在当前路径下)
    form.uploadDir = "./upload/";
    // 解析请求
    form.parse(req,function(err,fields,files){
      if(err){
        console.log(err);
        res.end("<h1>parse request error!</h1>");
        return;
      }
      // console.log(fields);
      // console.log(files);
      // 修改上传文件的名称
      // 1 获取上传的图片
      var pic = files.pic;
      // 获取上传图片的旧路径和原名称
      var oldPth = pic.path;
      var name = pic.name;
      // 2 设置新的路径 ./upload/xxx.jpg
      var newPath = "./upload/"+name;
      // 3 修改名称
      fs.rename(oldPth,newPath,function(err){
        if(err){
          console.log(err);
          res.end("<h1>修改失败</h1>");
          return;
        }
        res.end("<h1>upload success!!</h1>");
      });
    });
    return;
  }

  fs.readFile("./01_form.html",function(err,data){
    if(err){
      console.log(err);
      res.end("<h1>connect error</h1>");
      return ;
    }
    res.end(data);
  });

}).listen(4000);






