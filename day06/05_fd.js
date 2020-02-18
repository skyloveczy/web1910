var http = require("http");
var fs = require("fs");
var fd = require("formidable");

http.createServer(function(req,res){
  if(req.url=="/tijiao" && req.method.toLowerCase()=="post"){
    // 使用formidable模块处理文件上传
    // 创建表单对象
    var form = new fd.IncomingForm();

    // 解析req(请求对象)
    // err 解析出错
    // fields 文本域的内容
    // files 上传的文件
    form.parse(req, function(err,fields,files){
      console.log(err);
      console.log(fields);
      console.log(files);
      res.end();
    });
    return ;
  }

  fs.readFile("./05_form.html",function(err,data){
    if(err){
      console.log(err);
      res.end("Page Error!");
      return;
    }
    res.end(data);
  })

}).listen(4000);



