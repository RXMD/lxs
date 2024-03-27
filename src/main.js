import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import Directive from './directive/directive.js'
import { guid } from './utils/tool'

import * as filters from './filters' // global filters
const yz = require('./utils/yz').default

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.prototype.$guid = guid
Object.assign(Vue.prototype, {
  yz
})
function noticfy(tip, type = 'error', customClass, duration = 1500) {
  this.$notify[type]({
    title: '提示',
    dangerouslyUseHTMLString: true,
    message: tip,
    offset: 0,
    duration: duration,
    customClass: customClass
  })
}
Vue.prototype.noticfy = noticfy
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Directive)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
