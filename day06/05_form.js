var http = require("http");
var fs = require("fs");
var qs = require("querystring");

http.createServer(function(req,res){
  // 当请求为post的/tijiao时
  if(req.url=="/tijiao" && req.method.toLowerCase()=="post"){
    /* 
    因为NodeJS是单线程非I/O阻塞,为了追求效率,数据是一小段一小段发送的
    这样就会产生两种状态:
      正在接收数据,数据接收完成
    */
    // 提前定义一个变量,用于保存每次接收到的一小段数据
    var allData = "";
    // 正在接收,data接收数据的状态
    // chunk表示每次接收到的一小段数据
    req.on("data",function(chunk){
      allData += chunk;
    });
    // 接收完成
    req.on("end",function(){
      console.log(allData);
      allData = qs.parse(allData);
      console.log(allData);
      res.end("over");
    })
    return ;
  }
  // 不是post的/tijiao请求,返回表单页面
  fs.readFile("./05_form.html",function(err,data){
    if(err){
      console.log(err);
      res.end("Page Error!");
      return;
    }
    res.end(data);
  });
}).listen(4000);
