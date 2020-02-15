// 创建文件,向文件中写入数据
var fs = require('fs');

fs.writeFile("./a.txt","第二次写入",{flag: "a"},function(err){
  console.log(err?err:"写入成功");
})

