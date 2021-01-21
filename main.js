import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

// import VConsole from './static/js/common/vconsole.min.js'

// const VConsole = require('./static/js/common/vconsole.min.js')
// if(process.env.NODE_ENV==='development'){
	
// 	 var vconsole = new VConsole();
// }
import ajax from '@/utils/common/ajax.js'
Vue.prototype.$ajax = ajax

const app = new Vue({
    ...App
})
import httpInterceptor from '@/utils/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
