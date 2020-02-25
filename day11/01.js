// 引入模块,获取MongoClient类
var mongoClient = require("mongodb").MongoClient;

// 连接数据库的地址
var url = "mongodb://localhost:27017";
// 模拟的数据
var obj = {
  "id" : 108,
  "name" : "jimmy",
  "age" : 21,
  "gender" : "M",
  "hobbies" : ["climb", "swim"],
  "score" : {
    "math" : 81,
    "english" : 69,
    "chinese" : 73
  }
};

// 创建客户端对象
var client = new mongoClient(url,{useUnifiedTopology:true});
// 连接数据库
client.connect(function(err,result){
  console.log(err);
  var  collection = client.db("web").collection("stu");
  // 查
  collection.find({},{sort:{id:-1},limit:2,skip:1}).toArray(function(err,docs){
    console.log(docs);
    client.close();
  });

  
  
  // 改
  /* collection.updateMany({age:23},{$set:{age:24}},function(err,result){
    console.log(err);
    console.log(result.result);
    client.close();
  }) */
  /* collection.updateOne({age:24},{$set:{id:118,name:"ccc"}},function(err,result){
    console.log(err);
    console.log(result.result);
    client.close();
  }); */
  
  
  
  
  // 删
  /* collection.deleteMany({"$or":[{age:24},{id:110}]},function(err,result){
      console.log(err);
      console.log(result.result);
      client.close();
  })
 */
  // collection.deleteOne({age:24},function(err,result){
  //   console.log(err);
  //   console.log(result.result);
  //   client.close();
  // })

  
  
  // 增
  /* var o1 = {id:110,name:"aaa",age:12};
  var o2 = {id:111,name:"bbb",age:13};
  var o3 = {id:112,name:"ccc",age:14};
  var data = [o1,o2,o3];
  collection.insertMany(data,function(err,result){
    console.log(result.result);
    client.close();
  }) */

  
  // collection.insertOne(obj,function(err,result){
  //   console.log(err);
  //   client.close();
  // })
});






/* mongoClient.connect(url,{useUnifiedTopology:true},function(err,client){
  console.log(err);
  // console.log(client);
  // 获取服务器上的名字叫web的数据库
  var db = client.db("web"); // 数据库名
  var collection = db.collection("student");// 取集合
  

  // 将数据保存进数据库
  collection.insertOne(obj,function(err,result){
    console.log(err);
    console.log(result);
    // 关闭与数据库的连接
    client.close();
  });

}); */
