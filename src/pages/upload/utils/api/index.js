/*
 * @Author: xuebc
 * @Date: 2019-08-22 18:42:51
 * @Description: 
 * @FilePath: \src\utils\api\index.js
 */

// 加载对应的装饰器
import {Parameters} from './decorator.js';

console.log(Parameters)
/**
 * @way:封装独立的请求接口
 */
class api {
    constructor(axios) {
        // this.axios = axios
    }
    // @Parameters(["file"])
    dowload() {
        console.log('获取数据')
    }
}

export default function (axios) {
    return new api(axios);
}