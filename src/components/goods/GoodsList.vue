<template>
  <div class="goods-list">
    
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>熱賣中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在網頁中，有兩種跳轉方式： -->
    <!-- 方式1： 使用 a 標籤 的形式叫做 標籤跳轉  -->
    <!-- 方式2： 使用 window.location.href 的形式，叫做 程式設計式導航 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>熱賣中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>


    <mt-button type="danger" size="large" @click="getMore">載入更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data 是往自己元件內部，掛載一些私有數據的
    return {
      pageindex: 1, // 分頁的頁數
      goodslist: [] // 存放商品列表的陣列
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 獲取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // this.goodslist = result.body.message;
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 使用JS的形式進行路由導航

      // 注意： 一定要區分 this.$route 和 this.$router 這兩個對象，
      // 其中： this.$route 是路由【參數對像】，所有路由中的參數， params, query 都屬於它
      // 其中： this.$router 是一個路由【導航對像】，用它 可以方便的 使用 JS 程式碼，實現路由的 前進、後退、 跳轉到新的 URL 地址

      console.log(this);
      // 1. 最簡單的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2. 傳遞對像
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3. 傳遞命名的路由
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
