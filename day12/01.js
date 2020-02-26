var express = require("express");
var app = express();
var bdParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;

app.listen(4000);

app.set("view engine","ejs");

// 设置post请求
app.use(bdParser.urlencoded({extended:true}));

var uri = "mongodb://localhost:27017";


// get的/请求,跳转显示注册页面
app.get("/",function(req,res){
  res.render("regist");
})

// post的/regist请求,传递用户名和密码,保存进数据库
app.post("/regist",function(req,res){
  // 获取用户名和密码
  var body = req.body; // {username:"xxx",password:"xxx"}
  var client = new mongoClient(uri,{useUnifiedTopology:true});
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("连接数据库错误"); // 连接失败,不需要关闭
      return ;
    }
    // 连接成功,保存数据
    var collection = client.db("web").collection("users");
    collection.insertOne(body,function(err,result){
      if(err){
        console.log(err);
        res.send("保存失败");
        client.close(); // 保存操作结束,需要关闭连接
        return ;
      }
      res.send("保存成功");
      client.close();
    });
  })
})

// 跳转到登录页面
app.get("/login",function(req,res){
  res.render("login");
});

// post的 /login请求,获取用户名和密码,到数据库中比对是否匹配
app.post("/login",function(req,res){
  var body = req.body; // {username:"",password:""}
  var client = new mongoClient(uri,{useUnifiedTopology:true});
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("连接数据库失败");
      return ;
    }
    var collection = client.db("web").collection("users");
    var username = body.username; // 获取用户名
    // 根据用户名查询数据
    collection.find({username:username}).toArray(function(err,docs){
      if(err){
        console.log("err");
        res.send("find error");
        client.close();
        return ;
      }
      if(docs.length==0){ // 根据用户名查询数据没有查到
        res.send("用户名不存在");
        client.close();
        return ;
      }
      // 用户存在,判断密码是否正确
      if(body.password!=docs[0].password){
        res.send("密码错误");
        client.close();
        return;
      }
      // 正确
      res.send("登录成功");
      client.close();
    });
  });
})

/* app.post("/login",function(req,res){
  var body = req.body; // {username:"",password:""}
  var client = new mongoClient(uri,{useUnifiedTopology:true});
  client.connect(function(err){
    if(err){
      res.send("error");
      return;
    }
    var collection = client.db("web").collection("users");
    collection.find(body).toArray(function(err,docs){
      if(err){ // 数据查询失败
        console.log(err);
        res.send("error find");
        client.close();
        return ;
      }
      // 数据查询成功
      // console.log(docs);
      // 判断docs中有没有数据,
      // 有:说明查到了数据,
      // 没有:说明没查到数据
      if(docs.length==0){
        res.send("用户名或密码错误");
      }else{
        res.send("登录成功");
      }
      client.close(); // 关闭连接
    })
  })
}); */
