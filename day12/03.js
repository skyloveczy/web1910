// 排除用户名重复的情况
var express = require("express");
var app = express();
var bdParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;

app.listen(4000);

app.use(bdParser.urlencoded({extended:true}));

// 设置js文件夹为根目录
app.use(express.static("./js"));

// 跳转注册页面
app.get("/",function(req,res){
  res.render("regist.ejs");
});

// get /check请求,检查用户名是否存在
app.get("/check",function(req,res){
  // 获取参数
  var username = req.query.username;
  // 连接数据库
  var client = new mongoClient("mongodb://localhost:27017",{useUnifiedTopology: true});
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("error");
      return ;
    }
    // 连接成功
    var collection = client.db("web").collection("users");
    collection.findOne({username:username},function(err,doc){
      if(err){
        console.log(err);
        res.send("error");
        client.close();
        return ;
      }
      var isOK = true;
      if(doc){
        isOK = false;
      }
      res.send({isOK:isOK});
      client.close();
    });
  });
})

