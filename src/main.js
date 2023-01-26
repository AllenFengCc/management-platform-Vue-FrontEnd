import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import vuescroll from 'vuescroll';
Vue.use(vuescroll);

Vue.use(ElementUI,{
  locale: locale,
});

import {getRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {delRequest} from "@/utils/api";
import {postKeyValueRequest} from "@/utils/api";
// 注册api插件
Vue.prototype.$getRequest=getRequest;
Vue.prototype.$postRequest=postRequest;
Vue.prototype.$putRequest=putRequest;
Vue.prototype.$delRequest=delRequest;
Vue.prototype.$postKeyValueRequest=postKeyValueRequest;

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

