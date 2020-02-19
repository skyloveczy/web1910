var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

http.createServer(function(req,res){

  var shop = [
    {name:"苹果", price:10,amount: 100},
    {name:"香蕉", price:8,amount: 60},
    {name:"樱桃", price:20,amount: 40},
    {name:"葡萄", price:10,amount: 40}
  ];
  fs.readFile("./lianxi01.html","utf-8",function(err,data){
    if(err){
      console.log(err);
      res.end("<h1>display Error!</h1>");
      return;
    }

    var html = ejs.render(data,{shop:shop});
    res.end(html);
  })

}).listen(4000)


