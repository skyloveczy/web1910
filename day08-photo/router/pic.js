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
})

// get 请求 /pic/upload,跳转到上传页面
router.get("/upload",function(req,res){
  // 上传需要选择上传的相册名称
  // 将所有的文件夹传递给上传页面
  file.getContents("./uploads",function(err,files){
    if(err){
      console.log(err);
      res.redirect("/");
      return;
    }
    res.render("upload",{dirs: files});
  });
})

// post请求 /pic/upload, 处理文件上传
router.post("/upload",function(req,res){
  file.parse(req,function(err,fields,files){
    if(err){
      console.log(err);
      res.send("出错了");
      return ;
    }
    // 获取文件夹名称,和图片对象
    var dirName = fields.dirName; // 将要保存图片的位置
    var pic = files.pic; // 图片对象
    // 改名,获取新路径和旧路径
    var oldPath = pic.path;
    // 设置新路径
    var name = pic.name; // 文件名 1.jpg
    var arr = name.split("."); // 拆分文件名 ["1","jpg"]
    // 后缀名
    var ext = arr[arr.length-1];
    // 文件名
    name = new Date().getTime()+"."+ext;
    // 新路径
    var newPath = "uploads/"+dirName+"/"+name;
    // 改名字
    file.rename(oldPath,newPath,function(err){
      if(err){
        console.log(err);
        res.send("上传失败");
        return;
      }
      // 上传成功,跳转到对应相册的位置
      res.redirect("/pic/show?dirName="+dirName);
    })
  });
});






// 暴露路由
module.exports = router;
