<!--<template>-->
<!--  <div>-->
<!--    <h1>This is A page.</h1>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--</script>-->

<template>
  <div>
    <h3>组件1—文字</h3>
<!--    <span>我爱你，中国！</span>-->
  </div>
</template>
<script setup>
import {onActivated, onBeforeUnmount, onDeactivated, onMounted} from "vue";

onMounted(()=>{
  console.log("Component1.vue   onMounted");
})
onBeforeUnmount(()=>{
  console.log("Component1.vue   即将卸载组件");
});

// keep-alive 钩子函数
onActivated(()=>{
  console.log("Component1.vue   onActivated");
})
onDeactivated(()=>{
  console.log("Component1.vue   onDeactivated");
})
</script>
