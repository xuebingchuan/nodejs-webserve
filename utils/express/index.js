// 使用express构建服务器api
const express = require("express");
// 引入上传文件逻辑代码
const upload = require("./upload_file");
const bodyParser = require('body-parser')
const app = express();

// 处理所有响应，设置跨域
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With ");
    res.header("X-Powered-By", " 3.2.1");
    if (req.url == '/'){
        res.header("Content-Type", "text/html;charset=utf-8");
    }else {
        res.header("Content-Type", "application/json;charset=utf-8");
    }
    next();
});
/* 上传页面 */
app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/'+'index.html');
});
app.use(bodyParser.json({ type: "application/*+json" }));
// 视频上传（查询当前切片数）
app.post("/getSize", upload.getSize);
// 视频上传接口
app.post("/video", upload.video);

// 开启本地端口侦听
app.listen(8080,function () {
    console.log('启动成功了')
});

