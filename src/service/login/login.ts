import { userInfo } from 'os'
import jwRequest from '../index'

import { IAccount, IDataType, ILoginResult, IUserInfoResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  userInfoById = '/users/',
  userMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return jwRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: true
  })
}

export function requestUserInfoById(id: number) {
  return jwRequest.get<IDataType<IUserInfoResult>>({
    url: `${LoginAPI.userInfoById}${id}`
  })
}

export function requestUserMenusByRoleId(id: number) {
  return jwRequest.get<IDataType>({
    url: `${LoginAPI.userMenus}${id}/menu`
  })
}
