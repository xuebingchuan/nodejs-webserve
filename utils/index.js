/**
 * @Description: 所有工具类的总出口
 **/
let fs = require('fs')
let trusteeshipStatic = require('./trusteeshipStatic') //根据路由进行静态资源托管
let trusteeshipPage = require('./trusteeshipPage')       //托管的是一个项目,直接打开html文件
let fileRouterList = fs.readdirSync('./src/pages')   //获取src/pages所有需要托管的项目名,并集合起来准备处理为路由
let requestMethods = require('./requestMethods')      //获取封装的请求方法
module.exports = class miniVue {
    // 构造器并不是必写,一般在要对实例进行初始化操作的时候
    constructor() {
        this.getIP = require('./gainIpPort').getIP
        this.portIsOccupied = require('./gainIpPort').portIsOccupied
        this.trusteeshipStatic = trusteeshipStatic
        this.trusteeshipPage = trusteeshipPage
        this.fileRouterList = fileRouterList
        Object.keys(requestMethods).map(itme=>{
            this[itme] = requestMethods[itme]
        })
    }
}
