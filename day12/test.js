var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

const uri = "mongodb://localhost:27017";
const opt = {useUnifiedTopology:true};
var client = new mongoClient(uri,opt);


client.connect(function(err){
  var collection = client.db("web").collection("shop");

  var filter = {_id:objectId("5e562ac9803f504764347196")};

  collection.find(filter).toArray(function(err,docs){
    console.log(docs);
    client.close();
  })

})