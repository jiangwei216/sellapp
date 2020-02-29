<template>
  <div class="goods-div">
      <!-- 左 -->
    <div class="left-div">
      <ul class="content">
      <div @click="clickLeftTitle(index)"
          :class="{leftGoods: true, selected: index == curSelected }"
          v-for="(item,index) in data"
          :key="item.name"
          >
       
        <span> <img  v-show="item.type==1" src="../assets/imgs/discount_1@2x.png" alt />
        <img  v-show="item.type==2" src="../assets/imgs/decrease_1@2x.png" alt />
        <img  v-show="item.type==3" src="../assets/imgs/invoice_1@2x.png" alt />
        <img style="width:12px" v-show="item.type==4" src="../assets/imgs/guarantee_1@2x.png" alt />{{ item.name }}</span>
      </div>
      </ul>
    </div>
    
    <!-- 右 -->
    <div class="right-div">
        <ul class="content">
      <div :id="index" v-for="(item,index) in data" :key="item.id">
        <div class="title">
          <p>{{item.name}}</p>
        </div>
        <div class="good">
          <div class="good-list" v-for="obj in item.foods" :key="obj.id">
            <div class="img">
              <img :src="obj.icon" alt />
            </div>
            <div class="msg">
              <p class="name">{{obj.name}}</p>
              <p class="description">{{obj.description}}</p>
              <p>
                <span class="sellCount">月售{{obj.sellCount}}份</span>
                <span class="rating">评分{{obj.rating}}</span>
              </p>
              <p>
                <span class="price">￥{{obj.price}}</span>
                <span class="oldPrice">{{obj.oldPrice}}</span>
              </p>
            </div>
            <div class="btn">
              <button>+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-bottom" style="width:100%;height: 51px;"></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis.js";
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      data: [],
       curSelected: 0 //当前选项卡选中的索引
    };
  },
  created() {
    getGoods().then(res => {
    //   console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  mounted() {
       //左侧滚动版
        new BScroll(document.querySelector(".left-div"), {
      click: true //允许点击
    });

    //右侧滚动板
    this.rightDiv = new BScroll(document.querySelector(".right-div"));

  },
    methods: {
    //index:当前点击的索引
    clickLeftTitle(index) {
      //点击，把新的索引保存起来
      this.curSelected = index;
      // 左侧索引index，对应右侧id
      this.rightDiv.scrollToElement(document.getElementById(index), 600); 
    }
  }
};
</script>

<style lang="less" scoped>
// 选项卡选中
.selected {
  background-color: #fff;
}

.goods-div {
  display: flex;
  height: 520px;
  flex: 1;
  .left-div {
    width: 90px;
    height: 100%;
    background-color: #f4f5f7;
    overflow: scroll;
    .leftGoods {
        display: flex;
  justify-content: center;
      height: 60px;
      padding: 10px 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      
      img{
          width: 14px;
      }
      span{
        
          font-size: 1em
      }
    }
  }
  .right-div {
    flex: 1;
    overflow: scroll;
    .title {
      height: 30px;
      background: #f4f5f7;
      p {
        line-height: 30px;
        text-indent: 1em;
      }
    }
    .good {
      padding: 0 20px;
      .good-list {
        position: relative;
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        .img {
          width: 60px;
          height: 60px;
          margin-right: 10px;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .msg {
          flex: 1;
          color: #95989d;
          font-size: 12px;
          .name {
            color: #000;
            font-size: 14px;
          }
          .description {
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            .price {
              font-size: 16px;
              color: #fa1c0f;
              font-weight: bold;
            }
            .oldPrice {
              font-size: 12px;
              text-decoration: line-through;
            }
          }
        }
        .btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
          button {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 0;
            background: cornflowerblue;
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>