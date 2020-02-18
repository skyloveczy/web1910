function showIndex(req,res){

    res.end("<h1>这是首页</h1>");
}

function showInfo(req,res){

  res.end("<h1>这是信息页</h1>");
}

function showError(req,res){

  res.end("<h1>错误页</h1>");
}

exports.showIndex = showIndex;
exports.showInfo = showInfo;
exports.showError = showError;



