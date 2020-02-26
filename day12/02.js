// 排除用户名重复的情况
var express = require("express");
var app = express();
var bdParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;

app.listen(4000);

app.use(bdParser.urlencoded({extended:true}));

// 跳转注册页面
app.get("/",function(req,res){
  res.render("regist.ejs");
});

// 接收请求,处理数据
app.post("/regist",function(req,res){
  var username = req.body.username;
  // 连接数据库,检查username是否已经存在
  var client = new mongoClient("mongodb://localhost:27017",{useUnifiedTopology:true});
  // 连接
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("连接数据库失败");
      return ;
    }
    // 连接成功
    // 获取集合
    var collection = client.db("web").collection("users");
    // 查询username是否存在
    collection.findOne({username:username},function(err,doc){
      if(err){
        res.send("find Error");
        client.close();
        return ;
      }
      if(doc){
        // doc有值,表示username存在,不可使用
        res.send("用户名已存在");
        client.close();
        return ;
      }
      // 用户名不存在,可用,可以保存到数据库
      collection.insertOne(req.body,function(err,result){
        if(err){
          res.send("insert error");
          client.close();
          return ;
        }
        // 插入成功
        res.send("注册成功");
        client.close();
      });
    });
  });
});






