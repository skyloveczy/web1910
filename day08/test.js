var express = require("express");
var app = express();

app.listen(4000);


app.get("/",function(req,res){
  res.render("test.ejs",function(err,html){
    if(err){
      console.log(err);
      res.send("<h1>页面加载失败</h1>");
      return ;
    }
    console.log(html);
    res.send(html);
  });
})
