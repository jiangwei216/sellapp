//接口集成
import axios from 'axios'

// 请求一个对象
let req=axios.create({
// baseURL:'http://localhost:3000',
baseURL:'http://192.168.0.100:3000',

timeout:10000//超时停止请求
})
//商家信息
export function getSeller(){
    return req.get('/api/seller')
}
export function getGoods(){
    return req.get('/api/goods')
}
export function getRatings(){
    return req.get('/api/ratings')
}