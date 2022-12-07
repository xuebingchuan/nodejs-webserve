/**
 * @createDate:2021.06.08
 * @updateDate:2022.12.07
 * @Author: xuebc
 * @Description: 动态读取pages文件夹下的文件,将其补充道路由中,方便托管访问
 **/
let fs = require('fs')
let fileNameArrary = fs.readdirSync('./src/pages')

exports.fileNameArrary = fileNameArrary
