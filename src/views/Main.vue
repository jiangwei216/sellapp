<template>
  <div>
    <!-- 头部 -->
    <div>
      <div class="header-bar">
        <!-- 模糊 -->
        <div class="moi" :style="{backgroundImage:'url('+data.avatar+')'}"></div>
        <div class="header-top">
          <div class="img">
            <img :src="data.avatar" alt />
          </div>
          <div class="msg">
            <p class="name">
              <img src="../assets/imgs/brand@2x.png" alt />
              {{data.name}}
            </p>
            <p class="des">{{data.description}}/{{data.deliveryTime}}分钟送达</p>
            <p class="sup">
              <span>
                <img src="../assets/imgs//decrease_1@2x.png" alt />
                {{data.supports?data.supports[0].description:''}}
              </span>
              <span class="top_smbtn">
                5个
                <Icon class="nav_icon" type="ios-arrow-forward" color="#ccc" />
              </span>
            </p>
          </div>
        </div>
        <div class="header-bottom">
          <p class="bul">
            <img src="../assets/imgs/bulletin@2x.png" alt />
            <span>{{data.bulletin}}</span>
          </p>
          <!-- <span>》</span>  -->
        </div>
      </div>
      <!-- 导航 -->
      <div class="router-link-div">
        <div :class="this.curindex == '1'? 'active' : ''" @click="aclick('1')">
          <router-link to="/goods">商品</router-link>
        </div>
        <div :class="this.curindex == '2'? 'active' : ''" @click="aclick('2')">
          <router-link to="/evaluate">评价</router-link>
        </div>
        <div :class="this.curindex == '3'? 'active' : ''" @click="aclick('3')">
          <router-link to="/merchant">商家</router-link>
        </div>
      </div>
    </div>

    <!-- //容器 -->
    <router-view class="link-div"></router-view>

    <!-- //購物車容器-板子 -->
    <transition name="slide-fade">
      <div class="shopcar-bar1" v-show="shopcarbar1">
        <Shopping/>
      </div>
    </transition>
    <!-- 购物车logo -->
    <div class="shopcar-bar">
      <div class="left">
        <div class="img" @click="shopcarbar1=!shopcarbar1">
          <Icon type="md-cart" />
        </div>
        <p>
          <span class="sum">￥{{prices}}</span>
          <span class="deliveryPrice">另需配送费￥{{data.deliveryPrice}}元</span>
        </p>
      </div>
      <div class="right">￥{{data.minPrice}}元起送</div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
import Shopping from "./Shopping";
export default {
    components: {
        Shopping
      },
  data() {
    return {
      data: {},
      color:false,
      shopcarbar1: false,
      curindex: "1" //选中状态
    };
  },
   computed:{
   prices(){
      let num=0;
      let goodsd = this.$store.state.goodslist 
         goodsd.map(v=>{
           v.foods.map(obj=>{
           num+= obj.num*obj.price
           })
         })
         if(num>=20){
           document.querySelector('.sum').style.color='#faf5f1';
           document.querySelector('.right').style.cssText="color:#faf5f1;"
         }
     return num
    }
    
    
 },
  methods: {
    //切换选中状态
    aclick(index) {
      this.curindex = index;
    }
  },

  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.link-div {
  flex: 1;

}
.header-bar {
  //  z-index: 99;
  position: relative;
  //背景
  .moi {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 20px;
    height: 126px;
    width: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    filter: blur(1px);
  }
  // background-attachment: fixed;
  //   头部
  .header-top {
    height: 100px;
    padding: 15px;
    display: flex;
    background-color: rgba(14, 12, 12, 0.1);
    .top_smbtn {
      position: absolute;
      top: 46%;
      left: 84%;
      width: 14%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
    .img {
      width: 70px;
      height: 70px;
      margin-right: 20px;

      img {
        width: 100%;
        border-radius: 10%;
      }
    }
    .msg {
      flex: 1;
      .name {
        font-size: 20px;
        color: #fff;
        img {
          height: 20px;
          vertical-align: middle;
        }
      }
      .des,
      .sup {
        color: #faf5f1;
        display: flex;
        justify-content: space-between;
      }
      .sup {
        font-size: 12px;
        img {
          height: 12px;
          vertical-align: middle;
        }
      }
    }
  }
  .header-bottom {
    height: 26px;
    background-color: rgba(26, 22, 22, 0.2);
    color: #fff;
    .bul {
      padding: 4px 10px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      img {
        height: 12px;
        vertical-align: middle;
      }
    }
  }
}
.router-link-div {
  display: flex;
  justify-content: space-around;
  height: 40px;
  border-bottom: 1px solid #ccc;
  a {
    line-height: 40px;
    color: #4e555d;
  }
  .active {
    a {
      color: #eb1311;
    }
  }
}
// 底部购物车
.shopcar-bar {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  color: #97989a;
  .left {
    flex: 1;
    display: flex;
    background: #141c27;
    position: relative;
    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #2b343b;
      position: relative;
      left: 20px;
      top: -10px;
      i {
        font-size: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    p {
      line-height: 50px;
      margin-left: 30px;
      .sum {
        font-size: 20px;
        padding: 5px;
        border-right: 1px solid #2b343b;
      }
      .deliveryPrice {
        padding: 5px;
        font-size: 12px;
      }
    }
  }
  .right {
    width: 120px;
    background: #2b343b;
    text-align: center;
    line-height: 50px;
  }
}
//購物車容器-板子
.shopcar-bar1 {
  position: fixed;
  // height: 50px;
  width: 100%;
  bottom: 5px;
  background-color: white;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}
</style>