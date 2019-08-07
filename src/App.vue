<template>
  <div class="app-container">
    <!-- 頂部 Header 區域 
    引用 Mint-ui組件庫\CSS Component\Header：http://mint-ui.github.io/docs/#/zh-cn2/header
    -->
    <mt-header fixed title="固定在頂部"></mt-header>
    <!-- <mt-header fixed title="黑馬程式設計師·Vue專案">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>-->

    <!-- 中間的 路由 router-view 區域 -->
    <!-- <transition>
			<router-view></router-view>
    </transition>-->

    <!-- 底部 Tabbar 區域 
    引用 MUI框架\tabbar(選項卡)\底部選項卡-div模式
    -->
    <!-- 一般html方式 -->
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首頁</span>
      </a>
      <a class="mui-tab-item" href="#member">
        <span class="mui-icon mui-icon-email">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">會員</span>
      </a>
      <a class="mui-tab-item" href="#shopcar">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">購物車</span>
      </a>
      <a class="mui-tab-item" href="#search">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav>
    <!-- 改成vur路由方式 -->
    <!-- <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首頁</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">會員</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">購物車</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
    </nav>-->

    <h1>這是 APP 根元件</h1>
  </div>
</template>


<script>
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
</style>



