let fs = require('fs')
let url= require ('url')
let path = require('path')

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
 * method:'托管静态资源
 * */
exports.careContent = function (req,res,pathName){
    let route = url.parse(req.url,true).pathname    //加入url去解析的原因是为了防止传参时解析不到文件名
    // console.log(pathName,route,'---','24')
    let pathExtname = path.extname(route)     //path本来的特性,用来取后缀名

    if (req.url!='/favicon.ico') {
        try{
            let routerName = `./src/${pathName}${route}`.split('/')
            let data = fs.readFileSync(routerName.join('/'))
            let routeSuffix =  getHttpType(pathExtname)
            res.writeHead(200,{'Content-Type':`${routeSuffix};charset=utf-8`})
            res.end(data)
           }catch (e) {
            console.log(e)
        }
    }

}
