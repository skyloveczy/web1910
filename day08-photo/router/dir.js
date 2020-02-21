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
    // 将files返回
    res.send({code:0, dirs: files});
  });
});




// 暴露路由
module.exports = router;


