<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <i-ep-UserFilled />
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref='accountRef' />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <i-ep-Iphone />
            </el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref='phoneRef' />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue'

// 是否记住密码
const isKeepPassword = ref(false)
// 绑定login-account组件实例
const accountRef = ref<InstanceType<typeof LoginAccount>>()
// 绑定login-phone组件实例
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
// 选项卡的值
const currentTab = ref('account')

const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  }
}

</script>

<style lang="scss">
.login-panel {
  width: 320px;

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>