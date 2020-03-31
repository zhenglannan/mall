import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'

Vue.config.productionTip = false
// 解决移动端点击事件300ms延时
fastClick.attach(document.body)
// vue实例是可以作为s事件总线的
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
