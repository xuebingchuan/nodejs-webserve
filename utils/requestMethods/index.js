function NowDate() {
    var time = new Date();
    var year = time.getFullYear()//年
    var month = time.getMonth() + 1;//月
    var date = time.getDate();//几号
    var day = time.getDay();//星期几
    var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var hour = time.getHours();//小时
    var minutes = time.getMinutes();//分钟
    var second = time.getSeconds();//秒
    var ti = year + '年' + month + '月' + date + '号' + arr[day] + hour + '时' + minutes + '分' + second + '秒'
    return ti
}

let fs = require('fs')
let url = require('url')
let nodeApi = require('../nodeApi')      //服务器工具类依赖的默认数据仓库

module.exports = {
    /**
     * parpams:
     *       @req:接口响应拿到的数据对象,
     *       @res:需要响应给客户端的api集合对象
     * */
    post(req, res) {
        if (req.url != '/favicon.ico') {
            try {
                if (req.method === 'POST') {
                    // 定义了一个post变量，用于暂存请求体的信息
                    var data = '';
                    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                    req.on('data', function (chunk) {
                        data += chunk;
                    });
                    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                    req.on('end', function () {
                        res.setHeader("Content-Type", "application/json;charset=utf-8");
                        // res.setHeader('Access-Control-Allow-Origin', 'http://10.254.111.220:80'); //是否允许跨域
                        res.setHeader("Access-Control-Allow-Origin", "*");   //是否允许跨域
                        var str = {data: {...JSON.parse(data)}, code: 0, date: NowDate()};
                        // 把对象转成字符串之后再返回
                        res.end(JSON.stringify(str));
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    /**
     * parpams:
     *       @req:接口响应拿到的数据对象,
     *       @res:需要响应给客户端的api集合对象
     * */
    get(req, res) {
        if (req.url != '/favicon.ico') {
            try {
                if (req.method === 'GET') {
                    var urlObj = url.parse(req.url, true); //解析后得到的对象
                    var query = urlObj.query;            //参数
                    res.setHeader('content-type', 'application/json;charset=utf8')
                    console.log(query, '参数')
                    res.end(JSON.stringify({msg: '成功', code: 0, data: JSON.stringify(query)}))
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    /**
     * parpams:
     *       @req:接口响应拿到的数据对象,
     *       @res:需要响应给客户端的api集合对象
     * */
    dowload(req, res) {
        let route = url.parse(req.url, true).pathname    //加入url去解析的原因是为了防止传参时解析不到文件名
        if (req.url != '/favicon.ico') {
            try {
                if (req.method === 'GET') {
                    var urlObj = url.parse(req.url, true); //解析后得到的对象
                    var query = urlObj.query;            //参数
                    let fileName = query.filename
                    //读取大型文件
                    var fileStream = fs.createReadStream(`./src/static/${fileName}`)//得到文件输入流
                    let head = {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/octet-stream',    //告诉浏览器这是一个二进制文件
                        'Content-Disposition': `attachment;filename=${encodeURIComponent(fileName)}`
                    }  //告诉浏览器这是一个需要下载的文件
                    res.writeHead(200, head)//解决跨域问题
                    fileStream.on('data', function (data) {
                        console.log('fa')
                        res.write(data, 'utf-8');  //文档内容以utf-8// 的格式写到response的输出流
                    });
                    fileStream.on('end', function () {
                        res.end();
                        console.log('The file has been downloaded successfully!');
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    /**
     * parpams:
     *       @req:接口响应拿到的数据对象,
     *       @res:需要响应给客户端的api集合对象
     * */
    uploadF(req, res) {
        var multiparty = require('multiparty');//使用multiparty这个库文件,解析从客户端提交的本地文件
        //生成multiparty对象，并配置上传目标路径
        let uploadPath = __dirname + '/public/'
        nodeApi.gainFile(uploadPath, true, 'dir')
        var form = new multiparty.Form({uploadDir: uploadPath});
        //上传完成后处理
        form.parse(req, function (err, fields, {files}) {
            var filesTmp = JSON.stringify(files, null, 2);

            if (err) {
            } else {
                var inputFile = files[0];
                var uploadedPath = inputFile.path;
                var dstPath = __dirname + '/public/' + inputFile.originalFilename;
                //重命名为真实文件名,如果上传的是同样的文件则是覆盖的效果
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                    }
                });
                let head = {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json;charset=utf8'
                }
                res.writeHead(200, head)//设置响应请求头解决跨域问题
                res.end(JSON.stringify({
                    code: 200, msg: '上传成功', data: {
                        path: '/public/' + inputFile.originalFilename
                    }
                }))
            }
        });
    }
}
