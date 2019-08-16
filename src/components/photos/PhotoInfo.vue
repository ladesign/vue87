<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>發表時間：{{ photoinfo.add_time | dateFormat }}</span>
      <span>點選：{{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!-- 縮圖區域 -->
    <div class="thumbs">
      <!-- 注意：這裡使用的 vue-preview 元件是版本 1.1.3,
           之前上課錄屏時候, 所使用的 1.0.5 版本的 vue-preview 存在 Bug -->
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 圖片內容區域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一個現成的 評論子元件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 匯入評論子元件
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 從路由中獲取到的 圖片Id
      photoinfo: {}, // 圖片詳情
      list: [] // 縮圖的陣列
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      // 獲取圖片的詳情
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0]
        }
      })
    },
    getThumbs() {
      // 獲取縮圖
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status === 0) {
          // 循環每個圖片數據，補全圖片的寬和高
          result.body.message.forEach(item => {
            item.w = 600
            item.h = 600
            item.msrc = item.src
          })
          // 把完整的數據儲存到 list 中
          this.list = result.body.message
          console.log(this.list)
        }
      })
    }
  },
  components: {
    // 註冊 評論子元件
    'cmt-box': comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>

<style lang="scss">
.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  figure {
    width: 100px;
    height: 100px;
    margin: 10px;
    box-shadow: 0 0 8px #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
