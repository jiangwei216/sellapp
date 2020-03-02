<template>
  <div id="evaluate">
    <!-- <ul class="content"> -->
      <div class="grade">
        <div class="left">
          <p class="left-score">3.9</p>
          <p class="left-text1">综合评分</p>
          <p class="left-text2">高于周边商家69.2%</p>
        </div>
        <div class="right">
          <p >
            <span class="right-text">服务态度</span>
            <Rate allow-half :value.sync="valueHalf"></Rate>
            <span class="right-score">3.9</span>
          </p>
          <p>
            <span class="right-text">服务态度</span>
      <Rate allow-half :value.sync="valueHalf"></Rate>
            <span class="right-score">4.0</span>
          </p>
          <p>
            <span class="right-text">送达时间</span>
            <span class="date">44分钟</span>
          </p>
        </div>
      </div>
      <div class="nav"></div>
      <div class="text">
        <p >
          <Button >全部{{data.length}}</Button>
          <Button >满意{{satisfaction()}}</Button>
          <Button >不满意{{nosatisfaction()}}</Button>
        </p>
      </div>
      <div class="comment">
        <div class="comment-list" v-for="item in data" :key="item.name">
          <div class="header">
            <img :src="item.avatar" alt />
          </div>
          <div class="msg">
            <p class="text1">
              <span class="name">{{item.username}}</span>
              <span class="date">
                {{
                timechange(item.rateTime)}}
              </span>
              <span></span>
            </p>
            <p class="text2">
              <span class="score">评分：{{item.score}}</span>
              <span class="deliveryTime">{{item.deliveryTime?item.deliveryTime+'分钟送达':''}}</span>
            </p>
            <p class="text3">{{item.text}}</p>
            <p class="text4">
              <Icon type="md-thumbs-up" />
              <span v-for="obj in item.recommend" :key="obj.name">{{obj}}</span>
            </p>
          </div>
        </div>
      </div>
    <!-- </ul> -->
  </div>
</template>

<script>
import { getRatings } from "../api/apis.js";
import BScroll from "better-scroll"; 
export default {
  data() {
    return {
      data: [],
      valueHalf: 4.5
    };
  },

  created() {
    getRatings().then(res => {
      // console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  mounted() {
    //评论滚动
    new BScroll(document.getElementById("evaluate"), {
      click: true
    });
  },
  methods: {
    timechange(value) {
      //时间戳
      var date = new Date(value);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      const h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      const m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 满意
    satisfaction() {
      let num = 0;
      this.data.map(v => {
        if (v.rateType == 0) {
          return num++;
        }
      });
      return num;
    },
    // 不满意
    nosatisfaction() {
      let num = 0;
      this.data.map(v => {
        if (v.rateType == 1) {
          return num++;
        }
      });
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
#evaluate {
  .ivu-rate-star {
        font-size: 16px;
        margin-right: 4px;
      }
  .grade {
    height: 120px;
    padding: 20px 0;
    display: flex;
    .left {
      width: 150px;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      text-align: center;
      .left-score {
        font-size: 24px;
        color: #ff9d0b;
      }
      .left-text1 {
        color: #000;
      }
      .left-text2 {
        color: #9b9ca0;
        font-size: 12px;
      }
    }
    .right {
      flex: 1;
      padding-left: 10px;
      .ivu-rate{
        font-size:14px/1em ;
      }
      p {
        line-height: 24px;
        .right-text {
          color: #000;
          vertical-align: middle;
          margin-right: 5px;
        }
        img {
          width: 20px;
          vertical-align: middle;
        }
        .right-score {
          // margin-left: 10px;
          vertical-align: middle;
          color: #ff9d0b;
        }
        .date {
          margin-left: 10px;
          vertical-align: middle;
        }
      }
    }
  }
  .nav {
    height: 20px;
    background: #f4f5f7;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
  }
  .text {
    padding: 20px;
    border-bottom: 1px solid #e7e7e7;
    p {
      button {
        margin-right: 10px;
      }
       .ivu-btn {
      border-radius: 0px;
      margin-right: 8px;
    }
    .ivu-btn:nth-child(1) {
      background: #00a0dc;
      color: #fff;
    }
    .ivu-btn:nth-child(2) {
      background: #ccecf7;
      color: #242424;
    }
    .ivu-btn:nth-child(3) {
      background: #eaebed;
      color: #242424;
    }
    }
  }
  .comment {
    padding: 0 20px;
    .comment-list {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      .header {
        width: 40px;
        width: 40px;
        margin-right: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .msg {
        flex: 1;
        .text1 {
          display: flex;
          justify-content: space-between;
        }
        .text2 {
          img {
            width: 10px;
          }
          .deliveryTime {
            margin-left: 10px;
            font-size: 12px;
            color: #97989c;
          }
        }
        .text3 {
          color: #030d17;
          font-size: 14px;
        }
        .text4 {
          i {
            color: #2d8cf0;
          }
          display: flex;
          flex-wrap: nowrap;

          span {
            font-size: 4px;
            border: 1px solid rgb(161, 158, 158);
            justify-content: space-around;
            //   justify-content: space-around;
            padding: 2px;
          }
        }
      }
    }
  }
}
</style>