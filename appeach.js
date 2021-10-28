var http = require('http');
let statica = require('publlicMethods') //根据路由进行静态资源托管
let check = require('check')       //托管的是一个项目,直接打开html文件
let publicData = require('./src/utils/publicData')
http.createServer(function (req, res) {
    let route = req.url
    console.log(route,'---','8')
    if (route != '/favicon.ico '){
        // let fileName = ''
        // publicData.publicData.filename = ''
        if (route === '/') {
            publicData.totalData.setPublicData('filename','airpord')
            check.careContent(req,res,'airpord')
        }else if (route === '/like'){
            publicData.totalData.setPublicData('filename','like')
            check.careContent(req,res,'like')
        }else if (route.indexOf('/static') != -1) {
            //单纯访问静态资源
            statica.careContent(req,res,'')
        }else  if (route === '/line') {
            publicData.totalData.setPublicData('filename','line')
            check.careContent(req,res,'line')
        }else{
            //托管项目所依赖的静态资源
            statica.careContent(req,res,publicData.totalData.publicData.filename)
        }
    }
}).listen(80,()=>{
    console.log('服务器开启完成')
})
