var http = require('http');
let statica = require('publlicMethods') //根据路由进行静态资源托管
let check = require('check')       //托管的是一个项目,直接打开html文件
let publicData = require('./src/utils/publicData')  //封装的用于处理文件路径的vuex
let fileName = require('projectFileName') //所有要托管的文件名的集合数组
http.createServer(function (req, res) {
    let route = req.url
    // console.log(route,'---','路由',fileName.fileNameArrary,'集合数组')
    if (route != '/favicon.ico '){
        // if (route=='/static/swiper.min.js.map') {
        //     console.log(req,'---req----')
        // }
        if (route === '/') {
            //首页
            publicData.totalData.setPublicData('filename','airpord')
            check.careContent(req,res,'airpord')
        }else if (fileName.fileNameArrary.findIndex(item=>route===`/${item}`) !== -1){
            publicData.totalData.setPublicData('filename',route.slice(1,route.length))
            check.careContent(req,res,route.slice(1,route.length))
        }else if (route.indexOf('/static') != -1) {
            //单纯访问静态资源
            statica.careContent(req,res,'')
        }else  {
            //托管项目所依赖的静态资源
            statica.careContent(req,res,`pages/${publicData.totalData.publicData.filename}`)
        }
    }
}).listen(80,()=>{
    console.log('服务器开启完成')
})
