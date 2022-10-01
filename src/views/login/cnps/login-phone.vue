<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="80px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginValidation from '../hook/useLoginValidation';
import type { FormInstance } from 'element-plus'


// 表单实例对象
const formRef = ref<FormInstance>()
const rules = useLoginValidation()

const phone = reactive({
  num: '',
  code: ''
})
</script>

<style lang="scss">
.login-account {
  .get-code {
    display: flex;

    .get-btn {
      margin-left: 8px;
    }
  }
}
</style>