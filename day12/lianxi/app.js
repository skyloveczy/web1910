var express = require("express");
var app = express();
var bdParser = require("body-parser");
var fs = require("fs");
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
          client.close();
        });
        return ;
      }
      // 商品不存在,新建一条商品目录
      doc = {name:name,price:price,number:number};
      // 获取最新id
      var id = Number(fs.readFileSync("./number.txt"));
      doc.id = id; // 将id绑定到数据中
      // 将id自增,重新保存进number.txt,方便下次使用
      id++;
      fs.writeFileSync("number.txt",id);
      // 保存数据到数据库
      collection.insertOne(doc,function(err,result){
        if(err){
          consnole.log(err);
          res.send("添加数据失败");
          client.close();
          return;
        }
        res.redirect("/");
        client.close();
      });
    });
  });
})

// get / del请求,删除某条数据
app.get("/del",function(req,res){
  // 获取参数
  var _id = req.query._id; // 字符串
  // 将字符串转换为ObjectId类型
  _id = objectId(_id);
  var client = new mongoClient(uri,opt);
  client.connect(function(err){
    if(err){
      console.log(err);
      res.send({code:1,msg:"连接数据库失败"});
      return ;
    }
    // 删除数据
    var collection = client.db("web").collection("shop");
    collection.deleteOne({_id:_id},function(err,result){
      if(err){
        console.log(err);
        res.send({code:2,msg:"删除失败"});
        client.close();
        return ;
      }
      if(result.result.n==0){
        res.send({code:3,msg:"数据库不存在此数据"});
      }else{
        res.send({code:0,msg:"删除成功"});
      }
      client.close();
    });
  });
});
