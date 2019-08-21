// 匯入 vue-router 包
import VueRouter from 'vue-router';

// 
// 匯入對應的路由元件模板檔
// 
// 首頁tab bar用路由
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
// 首頁九宮格用路由(九宮格跳轉到列表頁)
import NewsList from './components/news/NewsList.vue'
import PhotoList from './components/photos/PhotoList.vue'
import GoodsList from './components/goods/GoodsList.vue'
// 詳情頁路由(列表頁跳轉到詳情頁)
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
// import GoodsInfo from './components/goods/GoodsInfo.vue'
// import GoodsDesc from './components/goods/GoodsDesc.vue'
// import GoodsComment from './components/goods/GoodsComment.vue'
// 建立路由對像
var router = new VueRouter({
    routes: [
        // 首頁tab bar用路由
        { path: '/', redirect: '/home' }, // 首頁，沒有路由時導向 path: '/home'
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        // 首頁九宮格用路由(九宮格跳轉到列表頁)
        { path: '/home/newslist', component: NewsList },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/goodslist', component: GoodsList },
        // 詳情頁路由(列表頁跳轉到詳情頁)  
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        // { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
        // { path: '/home/goodsdesc/:id', component:GoodsDesc, name: 'goodsdesc'  },
        // { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }                  
    ],
    linkActiveClass: 'mui-active' // 預設點中路由會自動添加一個叫做 router-link-active的類，因為是引用mui樣式，所以可以用mui點中時會套用的mui-active類覆蓋原有樣式即可，不要再重新定義新的類了
});

// 對外暴露路由對像
export default router;