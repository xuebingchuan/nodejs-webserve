/*
 * @Author: xuebc
 * @Date: 2019-10-22 18:42:51
 * @Description:
 * @method:类的装饰器
 * @FilePath: \src\utils\api\index.js
 */
/**
 * way:类的装饰器函数
 * parameters: target: 这个类属性函数是在谁上面挂载的，如上例对应的是MyClass类
               name: 这个类属性函数的名称，对应上面的follow
               descriptor: 这个就是我们前面说的属性描述符，通过直接descriptor上面的属性，即可实现属性只读，数据重写等功能
 * */
export function Parameters() {
    return function (target, name, descriptor) {
        console.log(target,name,descriptor)
    }
}

