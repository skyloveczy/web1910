// 创建服务,用户通过浏览器向数据库中保存数据
var express = require("express");
var bdParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var app = express();

app.listen(4000);

app.use(bdParser.urlencoded({extended:true}));

// post的/tijiao请求,接收数据,保存进数据库
app.post("/tijiao",function(req,res){
  console.log(req.body); // {参数对象}
  // 客户端对象
  var client = new mongoClient("mongodb://localhost:27017",{useUnifiedTopology:true});
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("数据库连接失败");
      return ;
    }
    // 获取数据库中的集合
    var collection = client.db("web").collection("test");
    collection.insertOne(req.body,function(err,result){
      if(err){
        console.log(err);
        res.send("保存数据失败");
        client.close(); // 关闭连接
        return ;
      }
      if(result.result.n==0){
        res.send("保存失败");
      }else{
        res.send("保存成功");
      }
      client.close(); // 关闭连接
    });
  })
});

// 其他请求全部显示表单页面
app.use(function(req,res){
  res.render("anli.ejs");
})




