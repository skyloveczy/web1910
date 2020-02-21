//引入模块
var express = require("express");
var router = require("./controller/router.js");
var app = express();

app.listen(4000);

//设置视图模板引擎
app.set("view engine","ejs");
//设置根目录
app.use(express.static("./public"));
app.use(express.static("./uploads"));

//处理/请求
app.get("/",router.index);

//处理新建相册请求/newDir，跳转到创建相册的页面
app.get("/newDir",router.newDir);
//处理/mkdir请求
app.get("/mkdir",router.mkdir);
//处理/upload请求，跳转到上传图片的页面
app.get("/upload",router.upload);
//处理/doUpload请求，上传图片的具体操作
app.post("/doUpload",router.doUpload);
//处理/del请求，删除文件夹
app.get("/del/:dirName",router.del);


//处理查看文件夹内容的请求(点击某个文件夹，显示文件夹中的图片)
//因为文件夹名称不固定，所以使用参数的方式
app.get("/:dirName",router.show);











