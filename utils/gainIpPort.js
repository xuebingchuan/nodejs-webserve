/**
 * @Description: 获取ip及端口的工具类
 **/


var net = require('net')
 exp = {
    /**
     * way:获取当前的网络ip并推送出去
     * */
    getIP () {
        const os = require('os');
        const osType = os.type(); //系统类型
        const netInfo = os.networkInterfaces(); //网络信息
        let ip = '';
        if (osType === 'Windows_NT') {
            for (let dev in netInfo) {
                //win7的网络信息中显示为本地连接，win10显示为以太网
                if (dev === '本地连接' || dev === '以太网') {
                    for (let j = 0; j < netInfo[dev].length; j++) {
                        if (netInfo[dev][j].family === 'IPv4') {
                            ip = netInfo[dev][j].address;
                            break;
                        }
                    }
                }
            }
        } else if (osType === 'Linux') {
            ip = netInfo.eth0[0].address;
        } else if (osType === 'Darwin') {
            // mac操作系统
            // ip = netInfo.eth0[0].address;
        } else {
            // 其他操作系统
        }
        return ip?ip:'127.0.0.1';
    },

    /**
     * way:检测端口是否被占用
     */
    portIsOccupied(port) {
        return new Promise((resolve) => {
            // 创建服务并监听该端口
            var server = net.createServer().listen(port)
            server.on('listening', function () { // 执行这块代码说明端口未被占用
                server.close() // 关闭服务
                resolve(port)
            })
            server.on('error', function (err) {
                if (err.code === 'EADDRINUSE') { // 端口已经被使用
                    resolve(exp.portIsOccupied(port + 1))
                }
            })
        })
    }
}
module.exports = exp
