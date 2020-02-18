// 使用silly-datetime模块操作时间
var sd = require("silly-datetime");

console.log(sd);

// 1. format
var str = sd.format(new Date());
console.log(str); // 2020-02-18 15:54:33

str = sd.format(new Date(),"YYYY年MM月DD日 HH时mm分ss秒 a");
console.log(str); // 2020年02月18日 15时55分42秒

sd.locate("zh-cn");

str = sd.fromNow(new Date()+59000);
console.log(str);