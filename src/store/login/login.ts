import { Module } from 'vuex'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 异步登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 请求用户数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求用户菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    // 刷新时重新保存数据到vuex
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) commit('changeToken', token)

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) commit('changeUserInfo', userInfo)

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) commit('changeUserMenus', userMenus)
    }
  }
}

export default loginModule
