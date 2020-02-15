var http = require("http");
var url = require('url');

var server = http.createServer(function(req,res){
  // 如果请求地址是小图标,则返回,不处理
  if(req.url=="/favicon.ico"){return ;}

  console.log(req.url);
  // req.url可以获取到请求路径,请求参数,拿不到锚点
  console.log(req.method);

  // 因为req.url获取到的是一个包含请求地址和请求参数的字符串
  // 不方便我们使用,可以使用字符串拆分的方式来解析
  // 也可以使用url模块来解析req.url字符串
  var urlStr = req.url; // 字符串格式的请求地址
  var urlObj = url.parse(urlStr, true);
  // console.log(urlObj);
  console.log("请求地址: ", urlObj.pathname);
  console.log("请求参数: ", urlObj.query);



  // 结束请求,不返回数据
  res.end();
});

server.listen(4000);




