// 读取并遍历当前文件夹下的内容,判断其是文件还是文件夹
var fs = require('fs');

fs.readdir("./",function(err,files){
  if(err){
    console.log(err);
    return ;
  }

  (function iterate(i){
    // 先确定自调结束的条件
    if(i>=files.length){
      // 当i超过数组的长度时,自调结束
      return ;
    }
    // 检查每一个元素的性质
    fs.stat(files[i],function(err,stats){
      if(err){
        console.log(err);
        return ;
      }
      if(stats.isFile()){
        console.log(files[i]+"是文件");
      }else{
        console.log(files[i]+"是文件夹");
      }
      // 当fs检查结束之后,才可以进行下一次的遍历(自调)
      iterate(++i);
    });
    // iterate(++i);
  })(0);




  // console.log(files);
  // 因为异步,导致fs.stat方式处理不到正确结果
  // for(var i=0;i<files.length;i++){
  //   console.log(files[i]);
  //   fs.stat(files[i],function(err,stats){
  //     console.log(i);
  //     if(err){
  //       console.log(err);
  //       return ;
  //     }
  //     if(stats.isFile()){
  //       console.log(files[i]+"是文件");
  //     }
  //   })
  // }
});



/* fs.readdir("./",{withFileTypes:true},function(err,files){
  if(err){
    console.log(err);
    return ;
  }
  for(var i=0;i<files.length;i++){
    if(files[i].isFile()){
      console.log(files[i]["name"]+"是一个文件");
    }else{
      console.log(files[i]["name"]+"是一个文件夹");
    }
  }
}); */




