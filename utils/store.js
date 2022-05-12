const state = {
    port: 8088
};
const mutations = {
    change(val){
        state.port = val
    }
};
const actions = {};
const getters = {};


module.exports = {
    state,
    mutations,
    actions,
    getters
}
