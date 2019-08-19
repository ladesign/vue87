<template>
  <div class="cmt-container">
    <h3>發表評論</h3>
    <hr>

    <textarea placeholder="請輸入要BB的內容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    
    <!-- mint-ui模組 -->
    <mt-button type="primary" size="large" @click="postComment">發表評論</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}樓&nbsp;&nbsp;使用者：{{ item.user_name }}&nbsp;&nbsp;發表時間：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          <!-- {{ item.content }} 這樣寫沒有數據時會輸出 undefined -->
          {{ item.content === 'undefined' ? '此使用者很懶，嘛都沒說': item.content }}
        </div>
      </div>

    </div>

    <mt-button type="danger" size="large" plain @click="getMore">載入更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, // 預設展示第一頁數據
      comments: [], // 所有的評論數據
      msg: "" // 評論區新輸入的內容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // 獲取評論
      // this.$http.get("http://www.liulongbin.top:3005/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => { // 完整API路徑
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {  // 入口文件有vue-resource的全域性設定時   
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每當獲取新評論數據的時候，不要把老數據清空覆蓋，而是應該以老數據，拼接上新數據
            this.comments = this.comments.concat(result.body.message); //會將兩個陣列合併產生新的陣列，原陣列不改變 
          } else {
            Toast("獲取評論失敗！");
          }
        });
    },
    getMore() {
      // 載入更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 校驗是否為空內容
      if (this.msg.trim().length === 0) {
        return Toast("評論內容不能為空！");
      }

      // 發表評論
      // 參數1： 請求的URL地址
      // 參數2： 提交給伺服器的數據對像 { content: this.msg }
      // 參數3： 定義提交時候，表單中數據的格式  { emulateJSON:true }
      this.$http.post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一個評論對像
            var cmt = {
              user_name: "匿名使用者",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
