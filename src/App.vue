<template>
  <div class="app-container">
    <!-- 頂部 Header 區域 
    引用 Mint-ui組件庫\CSS Component\Header：http://mint-ui.github.io/docs/#/zh-cn2/header
    -->
    <!-- <mt-header fixed title="商城"></mt-header> -->
    <mt-header fixed title="商城">
      <!-- 官網範例直用 -->
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <!-- 修改成呼叫自定義事件 -->
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    (返回按鈕顯示用的flag={{flag}})

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
			<!-- <router-link class="mui-tab-item" to="/home"> -->
      <!-- 解決導入mui js後，tab bar點選無法切換路由的問題，將標籤中原來的類名由 mui-tab-item 改成 mui-tab-item-llb -->
      <router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首頁</span>
			</router-link>
			<!-- <router-link class="mui-tab-item" to="/member"> -->
      <router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">會員</span>
			</router-link>
			<!-- <router-link class="mui-tab-item" to="/shopcar"> -->
      <router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <!--監聽store內的getters.getAllCount方法，當返回值改變時這邊同步更新-->
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">購物車</span>
			</router-link>
			<!-- <router-link class="mui-tab-item" to="/search"> -->
      <router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
    </nav>

    <!-- <h1>這是 APP 根元件</h1> -->
    
  </div>
  
</template>


<script>

export default {
  data() {
    return {
      flag: false //預設為false，不顯示返回按鈕
    };
  },
  created() { //實例已經創建完成之後被調用，沒有這個時，每次重讀app時flag都會變成false，返回鈕就不見
    this.flag = this.$route.path === "/home" ? false : true;
  },
  methods: {    
    goBack() {
      // click觸發事件，使用vue-routert的編程式導航中的 router.go方法，這邊每次返回一步歷史紀錄
      this.$router.go(-1);
    }
  },
  watch: {   
    "$route.path": function(newVal) {
      console.log("監聽的$route.path值為 "+newVal)
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
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

// 解決導入mui js後，tab bar 點選無法切換的問題 (將標籤中原來的類名由 mui-tab-item 改成 mui-tab-item-llb)
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>



