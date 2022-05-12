let fs = require('fs')
let url= require ('url')
let path = require('path')
let gainContenType = require('./gainContenType')


/**
 *  * parpams:
 *       @req:接口响应拿到的数据对象,
 *       @res:需要响应给客户端的api集合对象
 *       @pathName:路由处理后拿到的文件名
 * method:'托管静态资源(通过路由名来拿到该文件内容,并返回给前端)
 * */
module.exports = function (req,res,pathName){
    let route = url.parse(req.url,true).pathname    //加入url去解析的原因是为了防止传参时解析不到文件名
    let pathExtname = path.extname(route)     //path本来的特性,用来取后缀名
    if (req.url!='/favicon.ico') {
        try{
            let routerName = `./src/${pathName}${route}`.split('/')
            let data = fs.readFileSync(routerName.join('/'))
            let routeSuffix =  gainContenType(pathExtname)
            res.writeHead(200,{'Content-Type':`${routeSuffix};charset=utf-8`})
            res.end(data)
           }catch (e) {
            console.log(e)
        }
    }

}
