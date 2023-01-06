
const express = require('express');
const server = express();
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
//配置静态资源文件
server.use(express.static(__dirname +"/public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ dest: '/tmp/'}).array('file'));

server.get('/index.html', function (req, res) {
    console.log(__dirname);
    res.sendFile( __dirname + "/" + "index.html" );
})

server.post('/fileUpload',(req,respon)=>{
    console.log(req.files[0]);
    let fileName = Buffer.from(req.files[0].originalname, "latin1").toString(
        "utf8"
    );
    var fileUrl = __dirname + "/public/" + fileName; //文件名
    console.log(fileUrl);
    fs.readFile(req.files[0].path,(err,res)=>{
        fs.writeFile(fileUrl, res,(err=> { //文件写入
            if( err ){
                console.log( err );
            }else{
                // 文件上传成功，respones给客户端
                response = {
                    message:'File uploaded successfully',
                    filename:fileName
                };
            }
            console.log('/public/'+response.filename);
            console.log(respon)
            respon.send(JSON.stringify({msg:'上传成功',code:0,data:JSON.stringify('/public/'+response.filename)}))//返回自定义数据,比如json或者404
        }))
    })
})

server.listen(8000,err=>{
    err ? console.log(err): console.log('server http:127.0.0.1:8000');
})
