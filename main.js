import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import uView from "uview-ui";
console.log(uView)
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
