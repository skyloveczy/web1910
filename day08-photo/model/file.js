// 模型层,提供数据
var fs = require("fs");

module.exports = {
  // 获取文件夹内容
  /**
   * @param {String} path 读取的文件夹
   * @param {Function} callback 回调函数
   */
  getContents: function(path,callback){
    fs.readdir(path,function(err,files){
      callback(err,files);
      // if(err){
      //   callback(err,null);
      // }else{
      //   callback(null,files);
      // }
    });
  }
}






