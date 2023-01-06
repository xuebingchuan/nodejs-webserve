var http = require('http');
let vx = require('./src/utils/publicData')  //封装的用于处理文件路径的vuex
let UtilsClass = require('./utils/index')  //服务请求工具类
let port = 80
let requestUtils = new UtilsClass(port)
requestUtils.portIsOccupied(port).then(res => {
    port = res
    http.createServer(function (req, res) {
        let route = req.url
        if (route != '/favicon.ico ') {
            console.log(route)
            if (route === '/') {
                //没有路由的时候重定向为airpord的项目
                vx.totalData.setPublicData('filename', 'airpord')
                requestUtils.trusteeshipPage.careContent(req, res, 'airpord')
            } else if (requestUtils.fileRouterList.findIndex(item => route === `/${item}`) !== -1) {
                //读取项目首页的所需要的其他一些静态资源
                vx.totalData.setPublicData('filename', route.slice(1, route.length))
                requestUtils.trusteeshipPage.careContent(req, res, route.slice(1, route.length))
            } else if (route.indexOf('/static') == 0) {
                //单纯访问静态资源,前缀为/static的访问
                requestUtils.trusteeshipStatic(req, res, '')
            } else if (route.indexOf('/dowload') == 0) {
                //下载资源
                requestUtils.dowload(req, res)
            } else if (route.indexOf('/get_') == 0) {
                //get请求
                requestUtils.get(req, res)
            } else if (route.indexOf('/post_') == 0) {
                //post请求
                requestUtils.post(req, res)
            } else if (route.indexOf('/cors') == 0) {
                //跨域请求
                console.log('跨域了')
            } else {
                //打开项目的首页
                requestUtils.trusteeshipStatic(req, res, `pages/${vx.totalData.publicData.filename}`)
            }
        }
    }).listen(port, () => {
        console.log(` 
                --------------服务器开启完成---------------
                    App running at:
                  - Local:   http://localhost:${port}
                  - Network: http://${requestUtils.getIP()}:${port}
                   `)
    })
})



