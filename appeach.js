var http = require('http');
let statica = require('publlicMethods') //根据路由进行静态资源托管
let check = require('check')       //托管的是一个项目,直接打开html文件
let publicData = require('./src/utils/publicData')  //封装的用于处理文件路径的vuex
let fileName = require('projectFileName') //所有要托管的文件名的集合数组
let dowloadFile = require('dowload') //所有要托管的文件名的集合数组
let GET_METHODS = require('GET') //GET请求
let POST_METHODS = require('post') //post 请求

http.createServer(function (req, res) {
    let route = req.url
    if (route != '/favicon.ico '){
        console.log(route)
        if (route === '/') {
            /**
             * way:没有路由的时候重定向为airpord的项目
             * */
            publicData.totalData.setPublicData('filename','airpord')
            check.careContent(req,res,'airpord')
        }else if (fileName.fileNameArrary.findIndex(item=>route===`/${item}`) !== -1){
            /**
             * way:读取项目首页的所需要的其他一些静态资源
             * */
            publicData.totalData.setPublicData('filename',route.slice(1,route.length))
            check.careContent(req,res,route.slice(1,route.length))
        }else if (route.indexOf('/static') == 0) {
            /**
             * way:单纯访问静态资源,前缀为/static的访问
             * */
            statica.careContent(req,res,'')
        }else if (route.indexOf('/dowload') == 0){
            /**
             * way:下载资源
             * */
            dowloadFile.dowload(req,res)
        }else  if (route.indexOf('/get_') == 0){
            /**
             * way:get请求
             * */
            GET_METHODS.careContent(req,res)
        }else if (route.indexOf('/post_') == 0){
            /**
             * way:post请求
             * */
            POST_METHODS.careContent(req,res)
        }else if (route.indexOf('/cors') == 0){
            /**
             * way:跨域请求
             * */
            console.log('跨域了')
        }else {
            /**
             * way:打开项目的首页
             * */
            statica.careContent(req,res,`pages/${publicData.totalData.publicData.filename}`)
        }
    }
}).listen(80,()=>{
    console.log('服务器开启完成')
})
