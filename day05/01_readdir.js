// 读取文件夹内容
var fs = require("fs");

// 读取当前文件夹下有哪些文件或目录
fs.readdir("./",{withFileTypes: true},function(err,files){
  if(err){
    console.log(err);
    return ;
  }
  console.log(files);
  for(var key in files){
    console.log(files[key].isFile());
  }
});


