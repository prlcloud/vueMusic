import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
// import pinyin from 'pinyin'
import store from './store'
import 'element-ui/lib/theme-default/index.css'    // 默认主题

import 'common/stylus/index.styl'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast'

Vue.use(MuseUI)
Vue.use(Toast)
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
