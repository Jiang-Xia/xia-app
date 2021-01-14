import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import uView from "uview-ui";
import VConsole from 'vconsole'
if(process.env.NODE_ENV==='development'){
	 new VConsole();
}
// import axios from 'axios'
// Vue.prototype.$axios = axios
import ajax from '@/utils/common/ajax.js'
Vue.prototype.$ajax = ajax
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
import httpInterceptor from '@/utils/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
