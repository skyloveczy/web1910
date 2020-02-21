// 文件夹的路由模块,用于处理所有与文件夹相关的请求
// 包括展示文件夹,新建文件夹,删除文件夹
const router = require("express").Router();
// 引入file.js,操作文件相关的事情
const file = require("../model/file.js");

// 展示文件夹
// 处理的请求: /dir/show
router.get("/show", function(req,res){
  // 读取uploads下的所有文件夹
  file.getContents("uploads",function(err,files){
    if(err){
      console.log(err);
      res.send("<h1>网络错误</h1>");
      return ;
    }
    // res.send(files);
    res.render("index",{dirs: files});
  });
})
// 处理get请求: /dir/mkdir , 跳转到新建文件夹页面
.get("/mkdir",function(req,res){
  res.render("mkdir");
})
// 处理post的请求: /dir/mkdir
.post("/mkdir",function(req,res){
  // 获取参数
  var dirName = req.body.dirName;
  // 创建文件夹
  file.mkdir("uploads/"+dirName,function(err){
    if(err){
      console.log(err);
      res.redirect("/"); // 出错,跳回到首页
      return ;
    }
    // 没出错,创建成功
    res.redirect("/");
  });
})
// get请求,/dir/check, 检查相册名称是否存在
.get("/check",function(req,res){
  // 拿参数
  var dirName = req.query.dirName;
  // 拿uploads下的所有文件夹
  file.getContents("uploads",function(err,files){
    if(err){
      console.log(err);
      res.send({code:1,msg:"读取相册出错"});
      return ;
    }
    // 检查files中是否有dirName
    var flag = false; // 假设不存在
    for(var i=0;i<files.length;i++){
      if(dirName==files[i]){
        flag = true; // 存在
        break;
      }
    }
    res.send({code:0, res:flag});
  });
})

// get请求, /dir/del/dirName, 删除相册
.get("/del/:dirName", function(req,res){
  // 获取参数
  var dirName = req.params.dirName;
  file.remove("uploads/"+dirName,function(err){
    if(err){
      console.log(err);
      res.redirect("/");
      return ;
    }
    res.redirect("/");
  })
})




// 暴露路由
module.exports = router;


