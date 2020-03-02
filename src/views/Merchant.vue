<template>
  <div id="merchant">
    <ul class="content">
      <div class="merchant_top">
        <div class="top_bottom">
          <div>
            <h3>{{data.name}}</h3>
            <p class="xinxin">
              <Rate allow-half v-model="data.score" />
              ({{data.sellCount}})月售{{data.sellCount}}单
            </p>
          </div>
          <div class="collect">
            <Icon type="md-heart" />
            <p>已收藏</p>
          </div>
        </div>
        <!-- 配送时间 -->
        <div class="merchant_content">
          <div class="p-size">
            <p>起送价</p>
            <p>
              {{data.minPrice}}
              <span style="font-size: 10px;">元</span>
            </p>
          </div>
          <div class="p-size">
            <p>商家配送</p>
            <p>
              {{data.deliveryPrice}}
              <span style="font-size: 10px;">元</span>
            </p>
          </div>
          <div class="p-size">
            <p>平均配送时间</p>
            <p>
              {{data.deliveryTime}}
              <span style="font-size: 10px;">分钟</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 空容器 -->
      <div class="null"></div>
      <!-- 公告与活动 -->
      <div class="activity">
        <div class="activ_t">
          <p class="title">公告与活动</p>
          <p class="title_content">{{data.bulletin}}</p>
        </div>
        <!-- 满减 -->
        <div class="reduction" v-for="(obj, i) in data.supports" :key="i">
          <p>
            <img v-show="obj.type==0" src="../assets/imgs/decrease_3@2x.png" alt />
            <img v-show="obj.type==1" src="../assets/imgs/discount_1@2x.png" alt />
            <img v-show="obj.type==2" src="../assets/imgs/special_3@2x.png" alt />
            {{obj.description}}
          </p>
        </div>
      </div>
      <div class="null"></div>
      <div class="Merchants-img">
        <h3>商家照片</h3>
        <div class="img">
          <img v-for="(obj, i) in data.pics" :key="i" class="imgs" :src="obj" alt />
          <!-- <img :src="data.pics[0]" alt  style=" height:100px ;"/>
          <img :src="data.pics[1]" alt />
          <img :src="data.pics[2]" alt />-->
        </div>
      </div>
      <div class="null"></div>

      <div class="message">
        <h3>商家信息</h3>
        <div class="reduction1" v-for="(obj, i) in data.infos" :key="i">
          <p>{{obj}}</p>
        </div>
        <!-- <p> 营业时间：</p> -->
      </div>
      <div style=" height:100px ;"></div>
    </ul>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      data: [],
      valueHalf: 4,
    };
  },
  mounted() {
    new BScroll(document.getElementById("merchant"), {
      click: true
    });
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" >
.merchant_top {
  padding: 0px 20px;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  .top_bottom {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0;
    .xinxin {
      .ivu-rate-star {
        font-size: 16px;
        margin-right: 4px;
      }
    }
    .collect {
      text-align: center;
      .ivu-icon {
        font-size: 28px;
        color: #f01414;
      }
    }
  }
  .merchant_content {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    .p-size {
      width: 30%;
      text-align: center;

      p:nth-child(1) {
        font-size: 12px;
        color: rgb(156, 156, 156);
      }
      p:nth-child(2) {
        font-size: 22px;
      }
    }
    .p-size:not(:nth-child(3)) {
      border-right: 1px solid #e8e8e8;
    }
  }
}
.null {
  padding: 10px;
  background: #f4f5f7;
  border-top: 1px solid #e9eaec;
  border-bottom: 1px solid #e9eaec;
}
// 公告
.activity {
  padding: 0 20px;
  .activ_t {
    border-bottom: 1px solid #e9eaec;
    padding: 10px 0;
    .title {
      font-size: 18px;
      color: #0f1922;
    }
    .title_content {
      color: rgb(238, 80, 63);
      padding: 0 10px;
      line-height: 28px;
    }
  }

  .reduction {
    padding: 10px 0;
    border-bottom: 1px solid #e9eaec;
    img {
      width: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
}
.Merchants-img {
  padding: 20px;

  .img {
    display: flex;
    flex-wrap: nowrap;
    // justify-content: space-between;
    // width: 30% ;
    width: 100%;
    // height: 20%;
    // height: 30%;
    .imgs {
      // height: 30%;
      width: 23%;
      margin: 5px;
    }
  }
}
// 商家信息
.message {
  padding: 20px;
  .reduction1 {
    padding: 10px 0;
    border-bottom: 1px solid #e9eaec;
  }
}
</style>