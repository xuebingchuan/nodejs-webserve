let fs = require('fs')
/**
 * @parames:
 *          @name:路由解析后获得的文件后缀名
 * method:'动态获取文件后缀并映射对应的content-type进行解析'
 * */
module.exports = function (name){
    try{
        var data = fs.readFileSync('./utils/gainContenType/mime.json'); //同步方法
        let mimeObj = JSON.parse(data.toString())
        return mimeObj[name]
    }catch (e) {
        console.log(e)
    }
}
