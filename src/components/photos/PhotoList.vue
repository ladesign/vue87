<template>
  <div>
    
    <!-- 
      圖片分類：頂部滑動條區域
      使用MUI的"頂部選項卡-可左右拖動(webview)"：mui-master\examples\hello-mui\examples\tab-top-webview-main.html       
    --> 
    <!-- 靜態資料，直接由範例複製修改，測試是否可用 -->
    <!-- <div id="slider" class="mui-slider mui-fullscreen"> --><!-- 這邊用不需要滿版 -->
			<!-- <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
							推荐
						</a>
						<a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
							热点
						</a>
						<a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
							北京
						</a>
						<a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
							社会
						</a>
						<a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
							娱乐
						</a>
					</div>
				</div>
			</div> -->
    <!-- 標籤套用真實數據 -->  
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!-- <a class="mui-control-item" v-for="item in cates" :key="item.id"> -->

          <!-- 剛載入預設是"全部"這個選項卡高亮，點擊時加入mui-active類高亮則是mui的js處理，不理他 -->
          <!-- <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id"> -->

           <!-- 根據分類id，獲取該分類的圖片列表 -->
           <!-- 用@click觸發事件在手機上並無反應，改用@tap，限mui框架元件用 -->
          <!-- <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)"> -->
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 
      圖片列表區域
      直接使用 Mint-UI 的 lazy-load組件 懶加載圖片
     -->
    <!-- 範例複製 -->
    <!-- <ul>
      <li v-for="item in list">
        <img v-lazy="item">
      </li>
    </ul> -->
    <!-- 標籤套用真實數據 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
// 1. 若使用區域滾動組件，需手動初始化scroll控件，匯入 mui 的js檔案
import mui from "../../lib/mui/js/mui.min.js";

// 2. 初始化滑動控制元件，放在這邊會有第一次載入頁面時，無法區域滾動的問題，要改放到 mounted() 生命週期內
// mui(".mui-scroll-wrapper").scroll({
//   deceleration: 0.0005 //flick 減速係數，係數越大，滾動速度越慢，滾動距離越小，預設值0.0006
// });

export default {
  data() {
    return {
      cates: [], // 所有圖片分類的列表陣列
      list: [] // 圖片列表的陣列
    };
  },
  created() {
    // 請求圖片分類
    this.getAllCategory();
    // 預設進入頁面，就主動請求所有圖片列表的數據，就是手動加入的頂部選項卡為 { title: "全部", id: 0 } 時對應的圖片列表資料
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 用途，當元件中的DOM結構被渲染好並放到頁面中後就會執行這個 鉤子函式
    // 如果要操作元素了，最好在 mounted 裡面，因為，這裡時候的 DOM 元素 是最新的
    // 2. 初始化滑動控制元件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 減速係數，係數越大，滾動速度越慢，滾動距離越小，預設值0.0006
    });
  },
  methods: {
    // 獲取所有的圖片分類，並加入一個"全部"項
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 在最前面插入一個"全部"的對象，手動拼接出一個最完整的分類列表陣列
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    // 根據分類Id，獲取圖片列表，觸發時間(1)剛載入時，傳入0，(2)點擊圖片分類導航時，傳入分類id
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 在chrome下區域滾動時會出現警告訊息，啟用單指水平平移手勢可以移除警告
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }

    // Mint-UI 的 lazy-load組件 樣式
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
