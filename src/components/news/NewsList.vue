<template>
  <div>
    <!-- <h1>新聞列表頁面</h1> -->

    <!-- 
      新聞列表 ，使用MUI的"media list(圖文列表)"：mui-master\examples\hello-mui\examples\media-list.html      
    -->  
    <!-- 靜態資料，直接由範例複製修改，測試是否可用 -->
			<!-- <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/shuijiao.jpg">
						<div class="mui-media-body">
							<h1>能和心愛的人一起睡覺，是件幸福的事情；可是，打呼嚕怎麼辦？</h1>
							<p class='mui-ellipsis'>
                <span>發表時間：2019/08/14</span>
                <span>點選：99999次</span>
              </p>              
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/muwu.jpg">
						<div class="mui-media-body">
							<h1>想要這樣一間小木屋，夏天挫冰吃瓜，冬天圍爐取暖.</h1>
							<p class='mui-ellipsis'>
                <span>發表時間：2019/08/14</span>
                <span>點選：99999次</span>
              </p>              
						</div>
					</a>
				</li>
			</ul>       -->
    <!-- 標籤套用真實數據 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>發表時間：{{ item.add_time | dateFormat }}</span> <!--這邊將使用全域過濾器，過濾器寫在main.js中-->
              <span>點選：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newslist: [] // 新聞列表
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      console.log('獲取新聞列表');
      // 獲取新聞列表
      // this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result => { // 完整API路徑
      this.$http.get("api/getnewslist").then(result => {  // 入口文件有vue-resource的全域性設定時
        if (result.body.status === 0) {
          // 如果沒有失敗，應該把數據儲存到 data 上
          this.newslist = result.body.message;
        } else {
          Toast("獲取新聞列表失敗！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
