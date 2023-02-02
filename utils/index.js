/**
 * @Description: 所有工具类的总出口
 **/
let fs = require('fs')
let trusteeshipStatic = require('./trusteeshipStatic') //根据路由进行静态资源托管
let trusteeshipPage = require('./trusteeshipPage')       //托管的是一个项目,直接打开html文件
let fileRouterList = fs.readdirSync('./src/pages')   //获取src/pages所有需要托管的项目名,并集合起来准备处理为路由
let requestMethods = require('./requestMethods')      //获取封装的请求方法
let store = require('./store')      //服务器工具类依赖的默认数据仓库
let copy = require('./copyDir')
module.exports = class miniVue {
    // 构造器并不是必写,一般在要对实例进行初始化操作的时候
    constructor() {
        copy.copyDir('./node_modules/xue-vue2/dist','./src/pages/boke',(err)=>{
            console.log('拷贝文件夹执行出错,这是博客文件夹的拷贝,暂时不处理')
        }) //拷贝依赖中的博客并写入托管页面中
        this.trusteeshipStatic = trusteeshipStatic
        this.trusteeshipPage = trusteeshipPage
        this.fileRouterList = fileRouterList
        Object.keys(requestMethods).map(itme => {
            this[itme] = requestMethods[itme]
        })
        this.$store = {}
        Object.keys(store).map(itme => {
            this.$store[itme] = store[itme]
        })
    }
    /**
     * way:获取当前环境下的ip及端口
     */
    gainPortNetwork = () => {
        return new Promise((resolve) => {
            let getIP = require('./gainIpPort').getIP
            let portIsOccupied = require('./gainIpPort').portIsOccupied
            portIsOccupied(this.$store.state.port).then(port => {
                resolve({
                    printIpPort: ` 
                --------------服务器开启完成---------------
                    App running at:
                  - Local:   http://localhost:${port}
                  - Network: http://${getIP()}:${port}
                   `,
                    port:port
                    }
                )
            })
        })
    }
}
