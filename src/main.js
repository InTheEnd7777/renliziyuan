import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import Print from 'vue-print-nb'
Vue.use(Print)
//自定义指令
import * as directive from '@/directives'
for (let key in directive) {
  Vue.directive(key, directive[key])
}
//自定义组件
import components from '@/components'
//统一注册组件
Vue.use(components)
//注册所有过滤器
import * as filters from '@/filters'
for (let key in filters) {
  Vue.filter(key, filters[key])
}
import '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
