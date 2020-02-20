// 文件夹的路由模块,用于处理所有与文件夹相关的请求
// 包括展示文件夹,新建文件夹,删除文件夹
const router = require("express").Router();
// 引入file.js,操作文件相关的事情
const file = require("../model/file.js");

// 展示文件夹
// 处理的请求: /dir/show
router.get("/show", function(req,res){
  // 读取uploads下的所有文件夹
  file.getContents("./uploads",function(err,files){
    if(err){
      console.log(err);
      res.send("<h1>网络错误</h1>");
      return ;
    }
    // res.send(files);
    res.render("index",{dirs: files});
  });
})






// 暴露路由
module.exports = router;
