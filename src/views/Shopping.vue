<template>
  <div>
    <div class="shopcar">
      <p>购物车</p>
          <p @click="dels()"> <Icon type="md-trash" />清空购物车</p>
    </div>
    <div class="shopcar-div">
      <div class="gd-div">
        <div v-for="(item,index) in goodslist" :key="index">
          <div class="gd-div1" v-for="(obj,i) in item.foods" :key="i" v-show="obj.num!==0">
            <div class="left">
              <img :src="obj.icon" alt="" style="width:50%;  height:100%">
              <p>{{obj.name}}</p>
              <p>{{obj.description}}</p>
            </div>
            <div class="rigth">
              <p>￥{{obj.num*obj.price}}</p>
              <button @click="btn(index,i,-1)">-</button>
              <span>{{obj.num}}</span>
              <button @click="btn(index,i,1)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shop_bottom"></div>
  </div>
</template>

<script>
export default {
  methods: {
    // 加减
    btn(index, i, val) {
      this.$store.state.goodslist[index].foods[i].num += val;
    },
     dels(){
        this.$store.state.goodslist.map(v=> v.foods.map(dels=> dels. num=0 ) )
    }
  },
  computed: {
    goodslist() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  p{
    font: 16px/1em black;
  }
}
.shopcar-div {
    // height: 260px;
  padding: 0 20px;
  overflow: scroll;
  .gd-div {
    .gd-div1 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e0dddd;
      padding: 10px 0;
      .left {
        display: flex;
        justify-content: flex-start;
        align-content: center;
        p {
          font-size: 16px;
        } 
      }
      .rigth {
        display: flex;
        align-items: center;
        p {
          margin-right: 10px;
          color: red;
          font-size: 16px;
        }
        button {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 0;
          outline: none;
          background: #00a0dc;
          color: #fff;
          font-size: 22px;
          text-align: center;
          line-height: 24px;
        }
        span {
          padding: 0 10px;
        }
      }
    }
  }
}
   .shop_bottom{
     height: 50px;
     width: 100%;
   }

</style>