<!--<template>-->
<!--  <h1>This is B page.</h1>-->
<!--</template>-->

<!--<script>-->
<!--</script>-->


<template>
  <div>
    <h3>组件2-图片</h3>
    <img src="https://ss2.bdstatic.com/70cFvnSh.jpg" alt="">
  </div>
</template>
<script setup>
import {onBeforeUnmount, onMounted} from "vue";

onMounted(()=>{
  console.log("Component2.vue   onMounted");
})
onBeforeUnmount(()=>{
  console.log("Component2.vue   即将卸载组件");
});
</script>
