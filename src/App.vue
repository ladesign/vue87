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

    <!-- 中間的 路由切換時的渲染區域 router-view  -->
    <transition>
			<router-view></router-view>
    </transition>

    <!-- 底部 Tabbar 區域 
    引用 MUI框架\tabbar(選項卡)\底部選項卡-div模式
    -->
    <!-- 一般html方式 -->
    <!-- <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首頁</span>
      </a>
      <a class="mui-tab-item" href="#member">
        <span class="mui-icon mui-icon-contact">
        </span>
        <span class="mui-tab-label">會員</span>
      </a>
      <a class="mui-tab-item" href="#shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
        <span class="mui-tab-label">購物車</span>
      </a>
      <a class="mui-tab-item" href="#search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav> -->
    <!-- 改成vur-router路由方式 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首頁</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">會員</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">購物車</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
    </nav>

    <!-- <h1>這是 APP 根元件</h1> -->
  </div>
</template>


<script>
</script>


<style lang="scss" scoped>
// 空出頂部 Header、 底部 Tabbar 區域
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden; // 加上transition後，元件切換時Header不要跟著滑動
}

// 路由切換時過場動畫
.v-enter {
  opacity: 0;
  transform: translateX(100%); // 由右側進入
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%); // 往左側消失
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}


</style>



