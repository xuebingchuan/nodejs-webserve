
exports.miniVue = class miniVue {
    // 构造器并不是必写,一般在要对实例进行初始化操作的时候
    constructor() {
        this.getLocalIP = require('./getLocalIp').getLocalIP
        console.log(this.startServer)
    }
}