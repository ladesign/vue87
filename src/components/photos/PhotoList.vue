<template>
  <div>
    
    <!-- 頂部滑動條區域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>

    </div>

    <!-- 圖片列表區域 -->
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
// 1. 匯入 mui 的js檔案
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], // 所有分類的列表陣列
      list: [] // 圖片列表的陣列
    };
  },
  created() {
    this.getAllCategory();
    // 預設進入頁面，就主動請求 所有圖片列表的數據
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 當 元件中的DOM結構被渲染好並放到頁面中后，會執行這個 鉤子函式
    // 如果要操作元素了，最好在 mounted 裡面，因為，這裡時候的 DOM 元素 是最新的
    // 2. 初始化滑動控制元件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 減速係數，係數越大，滾動速度越慢，滾動距離越小，預設值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 獲取所有的圖片分類
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手動拼接出一個最完整的 分類列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根據 分類Id，獲取圖片列表
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
