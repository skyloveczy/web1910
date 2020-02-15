// readFile 方法

var fs = require("fs");

fs.readFile("./day04.txt",{"encoding":"utf-8"},function(err,data){
  console.log(err);
  // console.log(data.toString());
  console.log(data);
});



