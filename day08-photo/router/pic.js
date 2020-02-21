// 封装图片相关的路由
const router = require("express").Router();
const file = require("../model/file.js");

// get /pic/show?dirName=xxx 跳转到显示指定文件夹图片的页面
router.get("/show",function(req,res){
  // 获取参数: 文件夹名称
  var dirName = req.query.dirName;
  // 获取文件夹里面的内容
  file.getContents("uploads/"+dirName,function(err,files){
    if(err){
      console.log(err);
      res.send("<h1>读取图片出错</h1>");
      return ;
    }
    // 跳转到展示图片的页面
    res.render("show",{pics:files,dirName:dirName});
  })
});







// 暴露路由
module.exports = router;
