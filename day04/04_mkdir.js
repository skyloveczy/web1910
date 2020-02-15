var fs = require("fs");

fs.mkdir("./b/c",{recursive: true},function(err){
  console.log(err?err:"创建成功");
});


