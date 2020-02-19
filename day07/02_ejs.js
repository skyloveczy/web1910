// 引入模块
var ejs = require("ejs");

// 创建模板
var str = "今天学习<%= content %>";

// 模拟数据
var data = {content: "ejs"};

// 填充,渲染
var html = ejs.render(str,data);

console.log(html);



