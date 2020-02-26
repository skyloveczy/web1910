var express = require("express");
var app = express();
var bdParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const uri = "mongodb://localhost:27017";
const opt = {useUnifiedTopology:true};

app.listen(4000);

app.set("view engine","ejs");

app.use(express.static("./js"));

app.use(bdParser.urlencoded({extended:true}));


// get/请求,访问首页,以表格形式展示数据库中的数据
app.get("/",function(req,res){
  var client = new mongoClient(uri,opt);
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("<h1>连接数据库失败</h1>");
      return ;
    }
    var collection = client.db("web").collection("shop");
    // 查询数据库中的所有数据
    collection.find({}).toArray(function(err,docs){
      if(err){
        console.log(err);
        res.send("<h1>获取数据失败</h1>");
        client.close();
        return ;
      }
      // 查询成功,将docs传递给页面解析
      res.render("index",{shops:docs});
      client.close();
    })
  });
});


// get /add请求,跳转到新增页面
app.get("/add",function(req,res){
  res.render("add");
})

// post/add请求,接收参数
app.post("/add",function(req,res){
  var body = req.body; // {name,price,number}
  console.log(body);
  var name = body.name;
  var price = Number(body.price);
  var number = Number(body.number);
  // 连接数据库,检查数据库中是否有该商品
  var client = new mongoClient(uri,opt);
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send("连接数据库失败");
      return ;
    }
    // 检查商品是否存在
    var collection = client.db("web").collection("shop");
    collection.findOne({name:name},function(err,doc){
      if(err){
        console.log(err);
        res.send("查询失败");
        client.close();
        return ;
      }
      if(doc){// 商品存在,更新数据: 更新价格,更新存货
        // doc : {_id,id,name,price,number}
        var _id = doc._id;
        doc.price = price;
        doc.number += number;
        collection.updateOne({_id:_id},{$set:doc},function(err,result){
          if(err){
            console.log(err);
            res.send("更新失败");
            client.close();
            return ;
          }
          // 成功,跳转到首页
          res.redirect("/");
        });
        return ;
      }
      // 商品不存在,新建一条商品目录

    });
  });
})
