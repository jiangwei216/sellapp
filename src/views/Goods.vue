<template>
  <div class="goods" >
    <!-- 左边 -->
    <div class="goods-left">
      <ul class="content">
        <div
          @click="clickLeft(obj)"
          :class="{content_list:true,active:obj==all}"
          v-for="(item,obj) in goodslist"
          :key="obj"
        >
          <div class="span1">
            <span >
              <img v-show="item.type==1" src="../assets/imgs/discount_1@2x.png" alt />
              <img v-show="item.type==2" src="../assets/imgs/decrease_1@2x.png" alt />
              <img v-show="item.type==3" src="../assets/imgs/invoice_1@2x.png" alt />
              <img v-show="item.type==4" src="../assets/imgs/guarantee_1@2x.png" alt />
              {{ item.name }}
            </span>
          </div>
        </div>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="goods-rigth">
      <ul class="content">
        <div :id="index" v-for="(item,index) in goodslist" :key="index">
          <!-- 标题 -->
          <p class="title">{{item.name}}</p>
          <div class="goods_content" v-for="(child,i) in item.foods" :key="i">
            <div class="bor_bom">
              <div class="icon">
                <img :src="child.icon" alt />
              </div>
              <div class="bor_content">
                <h3>{{child.name}}</h3>
                <p>{{child.description}}</p>
                <p>月售{{child.sellCount}}份 好评率{{child.rating}}%</p>
                <div class="subtract">
                  <h4>
                    <span style="color:#F9171E; font-size:16px">￥{{child.price}}</span>
                    <span
                      style="text-decoration :line-through " v-show="child.oldPrice">￥{{child.oldPrice}}</span>
                  </h4>
                  <div>
                    <button class="button" v-show="child.num > 0" @click="clickNumChange(child.name,-1)">－</button>
                    <span v-show="child.num > 0">{{child.num}}</span>
                    
                   <button class="button" @click="clickNumChange(child.name,1)">＋</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll"; 
export default {
  
  data() {
    return {
      all: 0 
    };
  },
  created() {
    getGoods().then(res => {
      this.$store.commit('initGoodsList',res.data.data)
    });
  },
  mounted() {
    //左侧滚动版
    new BScroll(document.querySelector(".goods-left"), {
      click: true
    });
    //右侧滚动板
    this.goodsRigth = new BScroll(document.querySelector(".goods-rigth"), {
      probeType: 3 //监听滚动事件
    });

    // 滚动距离
    this.goodsRigth.on("scroll", o => {
      let _y = Math.abs(o.y); //取正数
     
      // 遍历取得的值
      for (let objDiv of this.getHeight) {
        if (_y >= objDiv.min && _y <= objDiv.max) {
          this.all = objDiv.index;
          return;
        }
      }
    });
  },
  methods: {
    clickLeft(index) {
      this.all = index;
      // 左侧索引index，对应右侧DIV id
      this.goodsRigth.scrollToElement(document.getElementById(index), 400);
    },
    // 点菜按钮
    clickNumChange(name, val){
      // console.log('被点了：' , name , val)
      //触发改变数量mutation 1 -1
      this.$store.commit('changeGoodsNum', {
        name,
        val
      })
       // 改变vuex中对应商品的数量 -1
    }
  },
  // 计算属性
  computed: {
    getHeight() {
      let arr = []; //用于储存
      let total = 0; //保存最大值或最小值
      for (let i = 0; i < this.goodslist.length; i++) {
        let count = document.getElementById(i).offsetHeight; //保存高度
        arr.push({ min: total, max: total + count, index: i });
        total += count; //获取每次的高度
      }
      return arr;
    },
    goodslist(){
      return  this.$store.state.goodslist
    },
  }
};
</script>

<style lang="less" >
.active {
  background: #fff;
  color: #000;
  
}
.goods {
  height: 520px;
  border-top: 1px solid #dbdce0;
  display: flex;
  flex: 1;
  overflow: scroll;

  .goods-left {
    width: 110px;
    height: 100%;
    background: #f4f5f7;
    .span1{
      display: flex;justify-content: center;
    
    }
    .content_list {
      padding: 0 10px;
      div {
        height: 60px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dedfe1;
        img {
          display: inline-block;
          width: 18px;
          height: 18px;
          vertical-align: middle;
        }
      }
    }
  }
  .goods-rigth {
    flex: 1;
    height: 100%;
    background: #f4f5f7;
    overflow: scroll;
    .span1{
      display: flex;
       justify-content: center;
    }
    .title {
      font-size: 16px;
      color: #989ba0;
      border-left: 2px solid #d9dce1;
      padding: 4px 10px;
    }
    .goods_content {
      padding: 0 20px;

      background: #fff;
      .bor_bom {
        padding: 10px 0;
        display: flex;
        border-bottom: 1px solid #dedfe1;
        .icon {
          img {
            width: 80px;
            height: 80px;
            margin-right: 10px;
          }
        }
        .bor_content {
          width: 100%;
          line-height: 22px;
          p {
            font-size: 12px;
          }
          .subtract{
            display: flex;
            justify-content: space-between;
            align-items: center;
           div{
             display: flex;
             align-items: center;
              .button{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 0;
                outline: none;
                background: #00A0DC;
                color: #fff;
                font-size: 22px;
                text-align: center;
                line-height: 24px;
              }
              span{
                padding: 0 10px;
              }
           }
          }
        }
      }
    }
  }
}
</style>