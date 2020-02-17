// fs.stat(),检测文件的性质
var fs = require("fs");

fs.stat("./day05.txt",function(err,stats){
  if(err){
    console.log(err);
    return ;
  }
  console.log(stats);
  if(stats.isFile()){
    console.log("是一个文件");
  }else{
    console.log("是文件夹");
  }
})




