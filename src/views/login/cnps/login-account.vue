<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="80px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import useLoginValidation from '../hook/useLoginValidation';
import type { FormInstance } from 'element-plus'
import localCache from '@/utils/cache'

const store = useStore()


// 表单实例对象
const formRef = ref<FormInstance>()
const rules = useLoginValidation()

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 登录逻辑真正实现地
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        // 本地储存
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

/* 例外的情况，使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露 */
defineExpose({
  loginAction
})

</script>

<style lang="scss">

</style>