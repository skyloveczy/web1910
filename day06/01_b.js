console.log("==我是b的内容==");
require("./01_c.js");

var a = 1;

function say(){
  console.log("你好");
}

var name = "张三";
function study(){
  console.log("学到老活到老");
}

console.log("==我是b的内容==");

// 将name和study暴露出去
exports.name = name;
exports.study = study;

