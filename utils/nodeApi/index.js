const fs = require("fs");
// https://blog.csdn.net/qq_37899792/article/details/106115288?spm=1001.2101.3001.6650.16&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-106115288-blog-127857070.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-106115288-blog-127857070.pc_relevant_aa2&utm_relevant_index=18
//fs.stat 检测是文件还是目录
//fs.mkdir 创建目录
//fs.writeFile 创建写入文件(存在则替换文件,不存在则创建)
//fs.appendFile 追加文件
//fs.readFile 读取文件
//fs.readdir 读取目录
//fs.rename 重命名
//fs.rmdir 删除目录
//fs.unlink 删除文件
//https://blog.csdn.net/glorydx/article/details/127857070
//fs.open  开启或者是关闭文件
//fs.copyFile  复制文件
//fs.stat   判断是文件还是文件夹
//fs.watch 监视某个文件或文件夹是否发生变化
//fs.watchFile   fs.unwatchFile  监视文件的另一种方式
//读取写入一个超大的文件两种方式   超大文件上传,使用断点传输的方式
//-------------------------------------------------------------
//fs.existsSync(path) 判断是否存在该文件或是文件夹
//fs.mkdir新建文件夹   没有mkdirSync
const example = {
    /**
     * @params:
     *          @filename      (String)            文件路径
     *          @data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
     *          @options        (Object)           option数组对象，包含：
     *              · encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
     *              · mode         (Number)        文件读写权限，默认值 438
     *              · flag            (String)            默认值 ‘w'
     *          @callback {Function}  回调，传递一个异常参数err。
     *
     * */
    writeFile(param) {
        fs.writeFile(...param)
    }
}
exp = {
    /**
     * @params:
     *         @path:需要解析的文件夹地址
     * */
    gainFileNameList(path) {
        // return fs.readdirSync('./src/pages')   //获取src/pages所有需要托管的项目名,并集合起来准备处理为路由
        return fs.readdirSync(path)   //获取该文件夹所有的文件名
    },
    /**
     * @params:
     *         @path:该路径下是否存在该文件
     *         @isMk:不存在时是否创建这个文件
     *         @type:dir代表判断文件夹,file代表文件
     *         @fileCon:如果是新建文件可以传想要写入的内容
     *         @dataTypeObj:如果是新建文件可以选择写入内容的数据格式------object
     *@way: 判断该路径下是否存在该文件,不存在时是否新建
     * */
    gainFile(path, isMk, type, fileCon, dataTypeObj) {
        let exists = fs.existsSync(path)
        if (!exists) {
            //    不存在
            if (!isMk) return
            if (type == 'dir') {
                fs.mkdir(path, function(err){
                    //如果目录已存在，会报错
                    if (err) {
                        console.log(err)
                        return false
                    }
                    console.log(`创建成功,路径:${path}`)
                })
            } else if (type == 'file') {
                example.writeFile({path, fileCon, dataTypeObj})
            }
        }
    },
    /**
     * way:删除目标文件夹下的多有所有文件,文件夹下的文件也会递归删除
     * */
    deleteDirPath(path) {
        var files = [];
        //是否存在改文件
        if (fs.existsSync(path)) {
            //读取目录
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                // fs.statSync(curPath).isFile()     判断是否是文件
                // fs.statSync(curPath).isDirectory()     判断是否是目录
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    exp.deleteDirPath(curPath);
                } else {
                    //开始删除文件
                    fs.unlinkSync(curPath);
                }
            });
            //删除目录
            fs.rmdirSync(path);
        }

    },
}
module.exports = exp
