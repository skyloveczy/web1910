//model层，用于数据的相关操作
var fs = require("fs");
var fd = require("formidable");
var rf = require("rimraf");//删除非空文件夹

//获取文件夹
exports.getDirs = function(callback){
    //一系列的操作得到了一个数据
    //return ["a","b","c"];
    //读取uploads中的内容，并返回给调用者
    //该方法是异步的，在读取完毕之前，调用者就已经结束程序了
   /* fs.readdir("./uploads",function(err,files){
        if(err){
            console.log(err);
            return "读取文件夹失败";
        }else{
            //console.log(files);
            return files;
        }
    });*/
//    办法：使用回调函数
    fs.readdir("./uploads",function(err,files){
        /*if(err){//读取出错，告诉调用者出错的信息，无数据返回
            callback(err,null);
        }else{//无错误，返回数据
            callback(null,files);
        }*/
        callback(err,files);
    });
}

//获取某个文件夹的内容
//dirName:读取的文件夹的名称
exports.getPics = function(dirName,callback){
    fs.readdir("./uploads/"+dirName,function(err,files){
        //console.log("file:"+files);
        callback(err,files);
    });
}

//创建文件夹
exports.mkdir = function(dirName,callback){
    fs.mkdir("./uploads/"+dirName,function(err){
        callback(err);
    });
}

//上传图片
//dirName:文件将要保存的路径
//req：将要解析的请求
exports.upload = function(req,callback){
    //通过formidable获取form表单对象
    var form = new fd.IncomingForm();
    //设置文件保存的路径
    form.uploadDir = "./uploads/";
    //解析请求数据
    form.parse(req,function(err,fields,files){
        //无论解析的结果如何，全部返回给调用者
        callback(err,fields,files);
    });
}

//删除指定文件夹
//dirName:将要被删除的文件夹名称
exports.del = function(dirName,callback){
    rf("./uploads/"+dirName,function(err){
        callback(err);//返回结果
    });
}





