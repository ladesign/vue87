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

    <!-- 結算區域 -->
    <!-- <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>總計（不含運費）</p>
              <p>已勾選商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 總價 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去結算</mt-button>
					</div>
				</div>
			</div> -->


      <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->

  </div>
</template>

<script>

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
