<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './cnps/login-panel.vue'
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg')
}
</style>
