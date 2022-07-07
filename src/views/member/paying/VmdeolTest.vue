<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-07 14:04:13
 * @LastEditTime: 2022-07-07 14:15:50
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits(['update:value']);
  const defaultUrl = ref('');

  watchEffect(() => {
    defaultUrl.value = props.value;
  });

  function handleClick() {
    defaultUrl.value = '54584564';
    emit('update:value', defaultUrl.value);
  }
</script>

<template>
  <div> 自定义v-model: {{ defaultUrl }} </div>
  <button @click="handleClick">点我</button>
</template>

<style scoped></style>
