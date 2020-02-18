
function Stu(id,name){
  this.id = id;
  this.name = name;
}

Stu.prototype = {
  say: function(){
    console.log("你好,我是"+this.name);
  },
  study: function(){
    console.log("好好学习,天天向上");
  }
}

// 暴露一个类,对象,构造函数
module.exports = Stu;