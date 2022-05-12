/**
 *  methods:类似vue的vuex私有化模块
 *
 * */
exports.totalData = {
    publicData : {
        filename:'',   //需要加载的文件的前缀路由
    },
    setPublicData : function (dataName,newData) {
        this.publicData[dataName] = newData
    },

}