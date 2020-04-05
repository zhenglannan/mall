import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from "components/common/toast";
// 安装toast插件
Vue.use(toast)
Vue.use(VueLazyLoad,{
  // 在js中导入一张图片需要require
  loading:require('assets/img/common/placeholder.png')
})

Vue.config.productionTip = false
// 解决移动端点击事件300ms延时
// 原理： 在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，
// 并把浏览器在300ms之后真正的click事件阻止掉
fastClick.attach(document.body)
// vue实例是可以作为s事件总线的
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store,
  // toast
}).$mount('#app')
