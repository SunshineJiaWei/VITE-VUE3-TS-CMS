import { createStore } from 'vuex'

import { IRootState } from './type'

//导出login模块
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {}
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
