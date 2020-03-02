import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入请求函数
// import { getGoods } from "../src/api/apis";
//vue数据仓库 存放交互数据
var store = new Vuex.Store({
    state: {
        // name: '张三',
        goodslist:[
]
    },
    mutations: {
        aaa(state, name) {
            state.name = name
        },
        initGoodsList(state,arrs){
            state.goodslist=arrs
        }
    },

    getters:{

    }

})
// store.commit('aaa', '李四')
// console.log(store.state.name);
export default store
