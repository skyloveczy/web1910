// 演示fs的同步和异步区别
var fs = require('fs');


console.log("1--- 程序开始");
var start = new Date();
// 异步
// fs.readFile("./1.mp4",function(err,data){
//   console.log("读取完毕");
// })

// 同步
var data = fs.readFileSync("./1.mp4");


console.log("2--- 程序结束");
var end = new Date();
console.log("耗时: "+ (end-start));
