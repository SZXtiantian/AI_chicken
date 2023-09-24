
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import share from './utils/share.js'	// 导入并挂载全局的分享方法
Vue.mixin(share)
// 根据用户的身份动态设置tabBar的内容
function setTabBarForIdentity(identity) {
    if (identity === '1'||identity==='0') {
        uni.setTabBarList({
            list: [
                {
                    pagePath: "pages/index/index",
                    text: "养殖场展示",
                    iconPath: "static/系统首页.png",
                    selectedIconPath: "static/系统首页 (1).png"
                },
                {
                    pagePath: "pages/user/user",
                    text: "用户信息",
                    iconPath: "static/账号.png",
                    selectedIconPath: "static/账号 (1).png"
                }
            ]
        });
    } else {
        // 恢复成4个导航栏
        uni.setTabBarList({
            list: [
                {
                    pagePath: "pages/index/index",
                    text: "养殖场展示",
                    iconPath: "static/系统首页.png",
                    selectedIconPath: "static/系统首页 (1).png"
                },
                {
                    pagePath: "pages/WorkOrder/WorkOrder",
                    text: "工单打卡",
                    iconPath: "static/看板管理.png",
                    selectedIconPath: "static/看板管理 (1).png"
                },
                {
                    pagePath: "pages/BreedData/BreedData",
                    text: "养殖管理",
                    iconPath: "static/区域管理 (1).png",
                    selectedIconPath: "static/区域管理.png"
                },
                {
                    pagePath: "pages/user/user",
                    text: "用户信息",
                    iconPath: "static/账号.png",
                    selectedIconPath: "static/账号 (1).png"
                }
            ]
        });
    }
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif