/**
 * @Description: 托管项目的工具函数,以项目名为路由,访问路由默认直接打开index.html文件
 **/

let fs = require('fs')
let path = require('path')
let gainContenType = require('gainContenType')



/**
 * parpams:
 *       @req:接口响应拿到的数据对象,
 *       @res:需要响应给客户端的api集合对象
 *       @pathName:路由处理后拿到的文件名
 * method:进入html文件
 * */
module.exports =  function (req,res,pathName){
    route = '/index.html'
    let pathExtname = path.extname(route) //path本来的特性,用来取后缀名
    if (req.url!='/favicon.ico') {
        try{
            let routerName = `./src/pages/${pathName}${route}`.split('/')
            console.log(routerName.join('/'))
            let data = fs.readFileSync(routerName.join('/'))
            let routeSuffix = gainContenType(pathExtname)
            res.writeHead(200,{'Content-Type':`${routeSuffix};charset=utf-8`})
            res.end(data)
           }catch (e) {
            console.log(e)
        }
    }
}
