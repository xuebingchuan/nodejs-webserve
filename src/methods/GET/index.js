let url= require ('url')


/**
 * method:进入html文件
 * */
exports.careContent = function (req,res){
    if (req.url!='/favicon.ico') {
        try{
            if (req.url.indexOf('/get_ibox') == 0 && req.method === 'GET') {
                var urlObj = url.parse(req.url ,true); //解析后得到的对象
                var query = urlObj.query;            //参数
                res.setHeader('content-type', 'application/json;charset=utf8')
                console.log(query,'参数')
                res.end(JSON.stringify({msg:'上传成功',code:0,data:JSON.stringify(query)}))
            }
        }catch (e) {
            console.log(e)
        }
    }
}
