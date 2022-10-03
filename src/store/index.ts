import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './type'

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

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
