console.log("====我是a的内容====");

// 引用b.js的内容
var b = require("./01_b.js");
// 引入c
require("./01_c.js");

// 报错,原因:a和say没有暴露出来
// console.log(a);
// say();

// console.log(b.name);
// b.study();


console.log("====我是a的内容====");


