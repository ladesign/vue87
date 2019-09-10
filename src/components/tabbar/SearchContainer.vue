<template>
  <div class="shopcar-container">
    
    <div class="goods-list">

      <!-- 商品列表項區域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						
            <mt-switch 
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>

                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 問題：如何從購物車中獲取商品的數量呢 -->
                <!-- 1. 我們可以先建立一個 空對象，然後循環購物車中所有商品的數據， 把 目前循環這條商品的 Id， 作為 對像 的 屬性名，count值作為 對象的 屬性值，這樣，當把所有的商品循環一遍，就會得到一個對像： { 88: 2, 89: 1, 90: 4 } -->
                
                <a href="#" @click.prevent="remove(item.id, i)">刪除</a>
              </p>
            </div>

					</div>
				</div>
			</div>

    </div>

  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] // 購物車中所有商品的數據
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 獲取到 store 中所有的商品的Id，然後拼接出一個 用逗號分隔的 字串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果 購物車中沒有商品，則直接返回，不需要請求數據接口，否則會報錯
      if (idArr.length <= 0) {
        return;
      }
      // 獲取購物車商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      // 點選刪除，把商品從 store 中根據 傳遞的 Id 刪除，同時，把 目前元件中的 goodslist 中，對應要刪除的那個商品，使用 index 來刪除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      // 每當點選開關，把最新的 快關狀態，同步到 store 中
      // console.log(id + " --- " + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
