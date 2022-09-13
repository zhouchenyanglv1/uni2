import App from './App'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}
$http.afterRequest = function(options){
  uni.hideLoading()
}

uni.$showMsg = function(title='数据请求失败',duration=1500){
   uni.showToast({
      title,
      duration,
      icon:'none'
   })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif