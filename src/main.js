import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

import Axios from 'axios';
import VueAxios from 'vue-axios';
//设置全局公共路径
Axios.defaults.baseURL = 'http://localhost:8090'
Axios.defaults.timeout = 5000;
Axios.defaults.withCredentials = true;


// Vue.prototype.axios = Axios;
Vue.use(VueAxios,Axios);
import Qs from 'qs';
Vue.prototype.qs = Qs;
Vue.use(ElementUI);

import './assets/css/base.css'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
new Vue({
  el: '#app',
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
