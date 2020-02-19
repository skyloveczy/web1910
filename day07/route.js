// 这个是路由
// 创建路由
var router = require("express").Router();
// 处理请求
// 处理 get的 /student/login
router.get("/login",function(req,res){
  res.send("<h1>login</h1>");
});
// get 的 /student/regist
router.get("/regist",function(req,res){
  res.send("<h1>regist</h1>");
});
router.get("/modify",function(req,res){
  res.send("<h1>modify</h1>");
});
// 暴露路由
module.exports = router;
