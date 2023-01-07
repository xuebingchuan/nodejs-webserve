var express = require('express');
var app = express()
var router = express.Router();
var multiparty = require('multiparty');//使用multiparty这个库文件,解析从客户端提交的本地文件
var util = require('util');//node的工具类
var fs = require('fs');

/* 上传页面 */
router.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/'+'index.html');
});

/* 上传*/
router.post('/file/uploading', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: __dirname + '/public/'});
    //上传完成后处理
    form.parse(req, function (err, fields, {files}) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files[0];
            var uploadedPath = inputFile.path;
            var dstPath = __dirname + '/public/' + inputFile.originalFilename;
            console.log(uploadedPath,dstPath)
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
            res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
            res.write('Response data:\n\n');
            // res.end(util.inspect({fields: fields, files: filesTmp}));
            res.end(JSON.stringify({code:200,msg:'上传成功',data:{
                    path: '/public/' + inputFile.originalFilename
                }}))
        }
    });
});
app.use(router)

app.listen(8000, function () {
    console.log('http://127.0.0.1:8000')
})
