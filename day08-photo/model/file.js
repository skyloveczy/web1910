// 模型层,提供数据
var fs = require("fs");
var rf = require("rimraf");
var fd = require("formidable");

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
  },
  mkdir: function(path,callback){
    fs.mkdir(path,function(err){
      callback(err);
    });
  },
  remove: function(path,callback){
    rf(path,function(err){
      callback(err);
    });
  },
  parse: function(req,callback){
    var form = new fd.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(req,function(err,fields,files){
      callback(err,fields,files);
    })
  },
  rename: function(oldPath,newPath,callback){
    fs.rename(oldPath,newPath,function(err){
      callback(err);
    })
  }
}



