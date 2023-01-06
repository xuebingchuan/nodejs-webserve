var http = require('http');
let vx = require('./src/utils/store')  //封装的用于处理文件路径的vuex
let UtilsClass = require('./utils/index')  //服务请求工具类
let _this = new UtilsClass()
_this.gainPortNetwork().then(({printIpPort,port}) => {
    http.createServer(function (req, res) {
        let route = req.url
        if (route != '/favicon.ico ') {
            console.log(route)
            if (route === '/') {
                //没有路由的时候重定向为airpord的项目
                vx.totalData.setPublicData('filename', 'airpord')
                _this.trusteeshipPage(req, res, 'airpord')
            } else if (_this.fileRouterList.findIndex(item => route === `/${item}`) !== -1) {
                //读取项目首页的所需要的其他一些静态资源
                vx.totalData.setPublicData('filename', route.slice(1, route.length))
                _this.trusteeshipPage(req, res, route.slice(1, route.length))
            } else if (route.indexOf('/static') == 0) {
                //单纯访问静态资源,前缀为/static的访问
                _this.trusteeshipStatic(req, res, '')
            } else if (route.indexOf('/dowload') == 0) {
                //下载资源
                _this.dowload(req, res)
            } else if (route.indexOf('/get_') == 0) {
                //get请求
                _this.get(req, res)
            } else if (route.indexOf('/post_') == 0) {
                //post请求
                _this.post(req, res)
            } else if (route.indexOf('/cors') == 0) {
                //跨域请求
                console.log('跨域了')
            } else {
                //打开托管的项目
                _this.trusteeshipStatic(req, res, `pages/${vx.totalData.publicData.filename}`)
            }
        }
    }).listen(port, () => {
        console.log(printIpPort)
    })
})



