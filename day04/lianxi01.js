var http = require('http');

var server = http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }
  console.log(req.url);
  if(req.url=='/a'){
    res.end("this is <h1>/a</h1> ");
    return ;
  }
  if(req.url=='/b'){
    res.end("this is <h1>/b</h1> ");
    return ;
  }
  res.end("other request");
});

server.listen(4000);