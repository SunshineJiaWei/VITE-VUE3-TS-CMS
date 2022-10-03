<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <i-ep-Expand v-if="isFold" />
      <i-ep-Fold v-else />
    </el-icon>
  </div>

</template>

<script setup lang="ts">

const emit = defineEmits(['foldChange'])


const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="scss">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>