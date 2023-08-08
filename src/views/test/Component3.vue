<template>
  <div>
    <h3>组件3—输入框</h3>
    <input type="text" placeholder="说点什么吧……">
  </div>
</template>
<script setup>
import {onBeforeUnmount, onMounted} from "vue";

onMounted(()=>{
  console.log("Component3.vue   onMounted");
})

onBeforeUnmount(()=>{
  console.log("Component3.vue   即将卸载组件");
});
</script>
