let fs = require('fs')
let url= require ('url')
let path = require('path')
let querystring = require('querystring');
/**
 * method:'动态改变请求头来识别文件'
 * */
getHttpType = function (name){
    try{
        var data=fs.readFileSync('./src/methods/static/mime.json'); //同步方法
        let mimeObj = JSON.parse(data.toString())
        return mimeObj[name]
    }catch (e) {
        console.log(e)
    }
}


/**
 * method:'下载静态资源
 * */
exports.dowload = function (req,res,pathName){
    let route = url.parse(req.url,true).pathname    //加入url去解析的原因是为了防止传参时解析不到文件名
    // console.log(pathName,route,'---','24')
    let pathExtname = path.extname(route)     //path本来的特性,用来取后缀名
    if (req.url!='/favicon.ico') {
        try{
            let routeUrl = route.split('/')
            let fileName = routeUrl[routeUrl.length-1]
            var fileStream =  fs.createReadStream(`./src/static/${fileName}`)
            // let data = fs.readFileSync(routerName.join('/'))
            let head = {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/octet-stream',
                'Content-Disposition': `attachment;filename=${fileName}`}
            res.writeHead(200,head)//解决跨域问题
            fileStream.on('data', function (data) {
                console.log('fa')
                res.write(data, 'utf-8');
            });
            fileStream.on('end', function () {
                res.end();
                console.log('The file has been downloaded successfully!');
            });
        }catch (e) {
            console.log(e)
        }
    }

}
