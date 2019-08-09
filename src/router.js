// 匯入 vue-router 包
import VueRouter from 'vue-router';

// 匯入對應的路由元件模板檔
// 首頁tab bar用路由
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 建立路由對像
var router = new VueRouter({
    routes: [
        // 首頁tab bar用路由
        { path: '/', redirect: '/home' }, // 首頁，沒有路由時導向 path: '/home'
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer }        
    ],
    linkActiveClass: 'mui-active' // 預設點中路由會自動添加一個叫做 router-link-active的類，因為是引用mui樣式，所以可以用mui點中時會套用的mui-active類覆蓋原有樣式即可，不要再重新定義新的類了
});

// 對外暴露路由對像
export default router;