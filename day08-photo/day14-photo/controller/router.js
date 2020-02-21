//router路由，用于处理具体的业务逻辑，由app来调用
var file = require("../model/file.js");
var sd = require("silly-datetime");
var fs = require("fs");

//处理/请求
exports.index = function(req,res){
    /*var dirs = file.getDirs();
    console.log(dirs);
    res.render("index",{dirs:dirs});*/
    file.getDirs(function(err,files){
        if(err){
            console.log(err);
            res.send("error");
        }else{
            res.render("index",{dirs:files});
        }
    })
}

//处理/:dirName请求，显示某文件夹的内容
exports.show = function(req,res){
    var dirName = req.params.dirName;
    file.getPics(dirName,function(err,files){
        //console.log("router:",err);
        //console.log("router:",files);
        //console.log(dirName);
        if(err){
            console.log(err);
            res.send("error");
        }else{
            //显示图片时需要文件夹的名称，所以一起传过去
            res.render("show",{dirName:dirName,pics:files});
        }
    })
}


//处理/newDir请求,跳转到创建相册的页面
exports.newDir = function(req,res){
    res.render("newdir");
}
//处理/mkdir请求，创建文件夹
exports.mkdir = function(req,res){
    //console.log(req.query);
    //获取请求参数，文件夹的名称
    var dirName = req.query.dirName;
    //调用file对应的创建文件夹的方法
    file.mkdir(dirName,function(err){
        if(err){
            console.log(err);
            res.send("创建相册失败，点击<a href='/newDir'>返回</a>")
        }else{
            //创建成功，返回首页
            res.redirect("/");
        }
    })
}

//处理/upload请求，跳转到上传图片页面
exports.upload = function(req,res){
    //上传页面需要选择上传的文件夹，所以要获取所有文件夹的名称
    //传递给上传视图页面
    file.getDirs(function(err,files){
        if(err){
            console.log(err);
            res.send("系统繁忙，稍后再试，点击<a href='/'>返回</a>");
        }else{
            //跳转到upload视图，同时将files传递过去
            res.render("upload",{dirs:files});
        }
    });
}
//处理/doUpload请求，具体的上传图片的操作
exports.doUpload = function(req,res){
    //调用file的upload方法
    file.upload(req,function(err,fields,files){
        /*console.log(fields);
        console.log(files);
        res.end();*/
        //重命名
        var dirName = fields.dirName;//需要保存的文件夹的名称
        var oldpath = files.pic.path;//获取旧路径
        var name = files.pic.name;//获取原来的名称(为了获取后缀名)
        var ext = name.split(".")[1];//获取后缀名
        //设置新路径
        var newName = sd.format(new Date(),"YYYYMMDDHHmmss")+"."+ext;
        console.log("新名称："+newName);
        //  ./uploads/a/111.jpg
        var newPath = "./uploads/"+dirName+"/"+newName;
        console.log("新路径："+newPath);
        //改名
        fs.rename(oldpath,newPath,function(err){
            if(err){
                console.log(err);
                res.send("网络出错，请重试，点击<a href='/'>返回</a>")
            }else{
                res.redirect("/");
            }
        });
    });
}

//处理/del请求，删除指定文件夹
exports.del = function(req,res){
    var dirName = req.params.dirName;//获取参数将要被删除的文件夹的名称
    file.del(dirName,function(err){
        if(err){
            console.log(err);
            res.send("系统出错，稍后再试，点击<a href='/'>返回</a>");
        }else{
            res.redirect("/");
        }
    });
}





