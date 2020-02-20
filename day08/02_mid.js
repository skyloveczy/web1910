// 中间件  middleware
 var express = require("express");
 var app = express();

 app.listen(4000);

// 模糊匹配一般放在精确匹配的后面
// 否则有可能会拦截精确匹配的请求
app.get("/a/:x",function(req,res,next){
  console.log(req._parsedUrl.pathname);
  if(req._parsedUrl.pathname=="/a/b"){
    next(); // 不结束请求,将请求放行给下一个中间件
    return;
  }
  res.send("<h1>中间件get /a</h1>"+req.params.x);
})

app.get("/a/b", function(req,res){
  res.send("<h1>/a/b的请求</h1>");
})


function show(req,res){
  res.send("<h1>show</h1>")
}
app.get("/b", show);



// use中间件
// 请求地址的匹配: 忽略大小写,忽略参数锚点
// 可以匹配所有以/c开头的请求
// 比如: /c/a,/c/123/123
app.use("/c", function(req,res){
  res.send("<h1>use中间件</h1>");
});

// 处理所有以/开头的请求==>处理所有的请求
app.use("/", function(req,res){})
// 也可以简写成:
app.use(function(req,res){})

