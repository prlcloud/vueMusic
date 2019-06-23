import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import VueResource from 'vue-resource'

// 注册插件Vuex
Vue.use(Vuex)
Vue.use(VueResource)
// 调试工具
const debug = process.env.NODE_ENV !== 'production'

// export一个实例Store,类似一个工厂模式
// strict严格模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
