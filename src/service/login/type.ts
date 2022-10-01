export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

export interface IUserInfoResult<T = any> {
  cellphone: number
  createAt: string
  department: T
  enable: number
  id: number
  name: string
  realname: string
  role: T
  updateAt: string
}
