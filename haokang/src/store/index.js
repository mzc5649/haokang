import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barrageList:[]
  },
  mutations: {
    addToList(state,info){
      state.barrageList.push({
        id: info.id,
        avatar: info.availabilities,
        msg: info.msg,
        time: info.time,
        type: info.type,
      });
    }

  },
  actions: {},
  modules: {}
});
