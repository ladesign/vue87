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
                <!-- 問題：如何從購物車中獲取目前商品的購買數量呢 -->
                <!-- 1. 我們可以先建立一個 空對象，然後循環購物車中所有商品的數據， 把 目前循環這條商品的 Id， 作為 對像 的 屬性名，count值作為 對象的 屬性值，這樣，當把所有的商品循環一遍，就會得到一個對像： { 88: 2, 89: 1, 90: 4 } -->
                

                <a href="#" @click.prevent="remove(item.id, i)">刪除</a>
                <!-- 使用 .prevent 阻止預設行為：
                    (操作筆記\day1\程式碼\code\04.事件修飾符.html) 
                -->
                <!-- 未用 .prevent 阻止預設行為，以下會觸發test()後轉到到href指定的連結 -->
                  <!-- <a href="http://www.google.com" @click="test('沒有使用.prevent阻止預設行為')">刪除</a> -->
                <!-- 未用 .prevent 阻止預設行為，以下觸發test()後，頁面 會 滾動回到頂部' -->
                  <!-- <a href="#" @click="test('a的href為#，未使用.prevent阻止預設行為，觸發事件後頁面 會 滾動回到頂部')">刪除</a> -->
                <!-- 有用 .prevent 阻止預設行為，以下只會觸發click指定的事件，頁面 不會 滾動回到頂部 -->
                  <!-- <a href="#" @click.prevent="test('a的href為#，有用.prevent阻止預設行為，觸發事件後頁面 不會 滾動回到頂部')">刪除</a> -->
                
              </p>
              <!-- <p>(在goodslist內索引{{i}})(商品id={{item.id}})</p> -->
            </div>

					</div>
				</div>
			</div>

    </div>

    <!-- 結算區域 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>總計（不含運費）</p>
              <p>
                已勾選商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 
                總價 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去結算</mt-button>
					</div>
				</div>
			</div>

<p>$store.getters.getGoodsCount 返回 {{ $store.getters.getGoodsCount }}</p>
<p>$store.getters.getGoodsSelected 返回 {{ $store.getters.getGoodsSelected }}</p>
<p>$store.getters.getGoodsCountAndAmount 返回 {{ $store.getters.getGoodsCountAndAmount }}</p>

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
    test(message) {
      console.log(message);
    },    
    getGoodsList() {
      // 1. 獲取到 store 中所有的商品的Id，然後拼接出一個 用逗號分隔的 字串
      var idArr = []; // 商品Id陣列
      // 循環出每個商品id並push到 商品Id陣列
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果 購物車中沒有商品，則直接返回，不需要請求數據接口，否則會報錯
      if (idArr.length <= 0) {
        return;
      }
      // 獲取購物車商品列表
      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => { // 將陣列內所有數據用","拼接成一個字串
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      // 點選刪除後，(1)把商品從 store 中根據 傳遞的 Id 刪除，
      // (2)同時，把 目前元件中的 goodslist 中，對應要刪除的那個商品，使用 index 來刪除
      this.$store.commit("removeFormCar", id);
      this.goodslist.splice(index, 1);      
    },
    selectedChanged(id, val) {
      // 每當點選開關，把最新的 快關狀態，同步到 store 中
      // console.log(id + " --- " + val);      

       // 對象內屬性寫法正常如下，是 {屬性名:屬性值}
      this.$store.commit("updateGoodsSelected", { id: id, selected: val })
       // 因為屬性名id與傳入的參數名id相同所以簡寫成一個：
      // this.$store.commit("updateGoodsSelected", { id, selected: val });
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
