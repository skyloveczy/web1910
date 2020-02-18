// 封装删除非空文件夹的方法
var fs = require("fs");

// 该方法是用于删除 非空文件夹 的
function delDir(path){
  // 判断path是文件还是文件夹
  var stats = fs.statSync(path);
  if(stats.isFile()){
    // path是一个文件,直接删除
    fs.unlinkSync(path);
    return ;
  }
  // 不是文件,是文件夹
  // 先获取path文件夹下的所有文件和文件夹
  var files = fs.readdirSync(path);
  // 再遍历删除files
  for(var i=0;i<files.length;i++){
    delDir(path+"/"+files[i]);
  }
  // 删除自身
  fs.rmdirSync(path);
}

exports.delDir = delDir;



