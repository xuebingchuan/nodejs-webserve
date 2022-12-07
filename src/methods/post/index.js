
let querystring = require('querystring');


//当前时间
function NowDate() {
    var time = new Date();
    var year = time.getFullYear()//年
    var month = time.getMonth() + 1;//月
    var date = time.getDate();//几号
    var day = time.getDay();//星期几
    var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var hour = time.getHours();//小时
    var minutes = time.getMinutes();//分钟
    var second = time.getSeconds();//秒
    var ti =  year + '年' + month + '月' + date + '号' + arr[day] + hour + '时' + minutes + '分' + second + '秒'
    return ti
}

/**
 * method:进入html文件
 * */
exports.careContent = function (req,res){
    if (req.url!='/favicon.ico') {
        try{
            console.log('----------------------')
            if (req.url.indexOf('/post_ibox') == 0 && req.method === 'POST') {
                // 定义了一个post变量，用于暂存请求体的信息
                var data = '';

                // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                req.on('data', function(chunk){
                    data += chunk;
                });

                // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                req.on('end', function(){
                    res.setHeader("Content-Type", "application/json;charset=utf-8");
                    // res.setHeader('Access-Control-Allow-Origin', 'http://10.254.111.220:80'); //是否允许跨域
                    res.setHeader("Access-Control-Allow-Origin", "*");   //是否允许跨域

                    var str = { data:{...JSON.parse(data)}, code : 0, date: NowDate() };
                    // 把对象转成字符串之后再返回
                    res.end(JSON.stringify(str));
                });
            }
        }catch (e) {
            console.log(e)
        }
    }
}
