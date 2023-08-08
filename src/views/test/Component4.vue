<!--<template>-->
<!--  <div>-->
<!--    <h3>组件4—输入框</h3>-->
<!--    <input v-bind="$attrs" type="text" placeholder="我是组件4……">-->
<!--  </div>-->
<!--</template>-->
<!--<script setup>-->
<!--// inheritAttrs: false;-->

<!--import {onActivated, onBeforeUnmount, onDeactivated, onMounted} from "vue";-->

<!--onMounted(()=>{-->
<!--  console.log("Component4.vue onMounted");-->
<!--})-->

<!--onBeforeUnmount(()=>{-->
<!--  console.log("Component4.vue  即将卸载组件");-->
<!--});-->

<!--// keep-alive 钩子函数-->
<!--onActivated(()=>{-->
<!--  console.log("Component4.vue   onActivated");-->
<!--})-->
<!--onDeactivated(()=>{-->
<!--  console.log("Component4.vue   onDeactivated");-->
<!--})-->
<!--</script>-->

<!--<script>-->
<!--export default {-->
<!--  inheritAttrs: false,-->
<!--}-->
<!--</script>-->



<template>
  <div id="Component4">
    <h3>组件</h3>
    <input v-bind="$attrs" type="text" placeholder="我是组件4……">
    <h4>{{$attrs.pp}}</h4>
  </div>
</template>
<script setup>
import {onMounted} from "vue";
import {bind} from "lodash-es";

onMounted(()=>{

})
</script>

<script>
export default {
  inheritAttrs: false,

}
</script>