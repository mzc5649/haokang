import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        danMuList: [],//弹幕列表
        m_id:sessionStorage.getItem("m_id"), //当前登录用户id
        memberInfo:{},
        memberIconSrc:''
    },
    mutations: {
        addToDanMuList(state, info) {
            for (let i = 0; i < info.length; i++) {
                if(info[i].m_id==state.m_id){
                    let data = {
                        content: info[i].content,
                        direction: info[i].direction,
                        isSelf: true,
                        style: {
                            color: info[i].color
                        },
                        isJs: false
                    };
                    state.danMuList.push(data);
                }else{
                    let data = {
                        content: info[i].content,
                        direction: info[i].direction,
                        isSelf: false,
                        style: {
                            color: info[i].color
                        },
                        isJs: false
                    };
                    state.danMuList.push(data);
                }

            }
        },
        sendToDanMuList(state, info) {
            state.danMuList.push(info);
        },
        setMId(state, info) {
            state.m_id=info;
        },
    },
    actions: {},
    modules: {}
});
