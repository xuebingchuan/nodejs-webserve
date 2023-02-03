<div align="center">
  <a href="https://gridea.dev">
    <img src="https://avatars.githubusercontent.com/u/58848987?s=400&v=4"  width="80px" height="80px">
  </a>
  <h1 align="center">
    nodejs-webserve
  </h1>
  <h3 align="center">
   使用nodejs原生搭建
  </h3>

[visit](https://github.com/xuebingchuan/nodejs-webserve) 

  <a href="javascript:void(0);">
    <img src="https://img.shields.io/github/release/getgridea/gridea.svg?style=flat-square" alt="">
  </a>

  <a href="javascript:void(0);">
    <img src="https://img.shields.io/github/license/getgridea/gridea.svg?style=flat-square" alt="">
  </a>

  <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/actions?query=workflow%3ACI">
    <img src="https://github.com/xugaoyi/vuepress-theme-vdoing/workflows/CI/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/actions?query=workflow%3AbaiduPush">
    <img src="https://github.com/xugaoyi/vuepress-theme-vdoing/workflows/baiduPush/badge.svg" alt="baiduPush">
  </a>

</div>
  <h3 align="center">
   项目功能摘要
  </h3>
  1.使用nodejs,参考Express/Koa进行原生搭建,实现了常用的页面托管,上传下载断点传输等功能

  2.博客采用VuePress技术将markdown文档编译为html,再使用vue的模板进行处理

  3.简历网站位于早期使用jq,swiper等技术进行搭建

  4.xue-vue2项目是参考vue2的源码之后实现了双向绑定,VDom,diff更新,$nextTick等功能(具体内容敬请移步项目仓库)

  5.基于nodejs的在线云盘程序,并支持图片,音频,pdf等文件进行在线预览(努力开发中,敬请期待....)

  <h3 align="center">
   程序详情
  </h3>

  case1:<a href="http://175.178.22.195:8088/line">简历地址<a/>

  <img src="https://pic.imgdb.cn/item/63db4d93ac6ef8601638e6e1.png"  width="160px" height="80px">

  case2:
  <a href="http://175.178.22.195:8080">博客地址<a/>

  <img src="https://pic.imgdb.cn/item/63db4d9cac6ef8601638f0de.pnn"  width="160px" height="80px">

  case3:
  <a href="http://175.178.22.195:8088/vue2">xue-vue2项目<a/>

  <img src="https://pic.imgdb.cn/item/63db4ccbac6ef860163790cc.jpg"  width="160px" height="80px">

  <h3 align="center">
   用方法介绍
  </h3>
   
   1.启动nodejs-webserve并使用
  ```bash
  # clone the project
  git clone https://gitee.com/xueBingChuan/nodejs-webserve.git
  
  # enter the project directory
  cd nodejs-webserve
  
  # install dependency
  npm install 
  
  # develop
  node appeach.js 
  ```


   2.xue-vue2项目示例在实战项目中引入并使用
  ```bash
  #warehouse address
  https://gitee.com/xueBingChuan/vue2

  # Introduce dependency
   npm install xue-vue2
   
  # calling interface
   get_cdn/xue-vue2
  
  # remark
  使用前需要先将nodejs-webserve项目启动,通过调用接口(get_cdn/xue-vue2)引入main.js文件,之后可以直接在html页面中使用对应的vue语法
  ```
 其他:vue源码项目这样引入的方式是为了方便xue-vue2项目修改之后直接发包,nodejs-webserve项目就直接修改版本号就可以同步xue-vue2的修改内容,类似的实现还有应用到博客中....
