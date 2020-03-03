import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入请求函数
// import { getGoods } from "../src/api/apis";
//vue数据仓库 存放交互数据
var store = new Vuex.Store({
    state: {
        // name: '张三',
        goodslist:[]
    },
    mutations: {
        changeName(state, name) {
            state.name = name
        },
        initGoodsList(state,arrs){
            state.goodslist=arrs
        },
        // 改变商品数量（根据商品名，找到goodslist中对应的商品，然后把数量+-）
        changeGoodsNum(state, obj) {
            for (let typeObj of state.goodslist) {
               

                //判断Name进行数量+1 -1
                for (let food of typeObj.foods) {
                    // 找到同名商品，进行数量改变！
                    if (food.name == obj.name) {
                        food.num += obj.val
                    }
                }
            }
        }
    },

    getters:{
 //getter和mutation一样，每一个getter函数，都会接受state形参
 getAdult(state) {
    // state.list
    return state.list.filter(obj => obj.age >= 18)
},
//获取购物车商品
getShopCarGoods(state) {
    let arr = [] //空数组
    let names = [] //商品名字数组
    for (let typeObj of state.goodslist) {
        for (let food of typeObj.foods) {
            if (food.num > 0) {
                //如果当前商品名字在names数组中不存在，才push
                if (!names.includes(food.name)) {
                    arr.push(food)
                    names.push(food.name)
                }

            }
        }
    }
    return arr
       
}
    }

})
// store.commit('aaa', '李四')
// console.log(store.state.name);
export default store
