<template>
  <div class="merchant">
    <div class="top">
      <div class="top-top">
        <p>粥品</p>
        <p>
          <img src="../assets//imgs/star36_on@2x.png" alt />
          <img src="../assets//imgs/star36_on@2x.png" alt />
          <img src="../assets//imgs/star36_on@2x.png" alt />
          <img src="../assets//imgs/star36_on@2x.png" alt />
          <img src="../assets//imgs/star36_off@2x.png" alt />
          <span class="right-score">(661)</span>
          <span class="right-text">月销690单</span>
        </p>
      </div>
    </div>
    <div>
      <span></span>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.merchant {
  display: flex;
  width: 100%;
}
</style>