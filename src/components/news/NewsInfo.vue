<template>
  <div class="newsinfo-container">
    <!-- 大標題 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子標題 -->
    <p class="subtitle">
      <span>發表時間：{{ newsinfo.add_time | dateFormat }}</span>
      <span>點選：{{ newsinfo.click }}次</span>
    </p>
    <hr>
    <!-- 內容區域 -->
    <div class="content" v-html="newsinfo.content"></div>
    
    <!-- 評論子元件區域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 1. 匯入 評論子元件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 將 URL 地址中傳遞過來的 Id值，掛載到 data上，方便以後呼叫
      newsinfo: {} // 新聞對像
    };
  },
  created() {
    console.log(this.$route)
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // 獲取新聞詳情
      // this.$http.get("http://www.liulongbin.top:3005/api/getnew/" + this.id).then(result => { // 完整API路徑
      this.$http.get("api/getnew/" + this.id).then(result => {  // 入口文件有vue-resource的全域性設定時      
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("獲取新聞失敗！");
        }
      });
    }
  },
  components: {
    // 用來註冊子元件的節點
    "comment-box": comment
  }
};
</script>

<!-- <style lang="scss" scoped>  用scoped時，img {width"100%;}無效-->
<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%; 
    }
  }
}
</style>
