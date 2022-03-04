import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import debounce from 'vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  debounce,
  render: h => h(App)
}).$mount('#app')
