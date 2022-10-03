import { ILoginState } from '@/store/login/type'

export interface IRootState {}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
