<!--<template>-->

<!--  <div style="background-color: yellowgreen;">-->
<!--    <button @click="userFatherMethod">点击调用RootView组件方法</button>-->
<!--    <h5>{{foo}}</h5>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->

<!--/*  此处填写对外抛出的emit字符标识 */-->
<!--import {inject, provide} from "vue";-->
<!--import bus from "@/statics/EventBus";-->

<!--/* 此处声明属性，在父组件的表现形式为：<ChildView foo="你好啊，子组件！" /> */-->
<!--const props = defineProps({-->
<!--  foo: String-->
<!--})-->

<!--/*  -> 调用父组件方法 */-->
<!--const injectMessage = inject("rootViewMethodKEY")-->
<!--function userFatherMethod() {-->
<!--  injectMessage("我是ThreeView组件，我调用了RootView组件的方法")-->
<!--}-->

<!--// 监听 - threeViewMethodKEY事件-->
<!--bus.on("threeViewMethodKEY",(data)=>{-->
<!--  console.log(`ThreeView,provide方法, data参数:${data}`)-->
<!--});-->
<!--</script>-->


<template>
  <div style="background-color: pink;">
    <div id="numID2" style="height: 50px;overflow: hidden"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(()=>{
  // for (let i = 0; i < 100000; i++) {
  //   document.getElementById("numID1").innerHTML = " " + i
  // }
  let str = ""
  for (let i = 0; i < 100000; i++) {
    str += " " + i
  }
  document.getElementById("numID2").innerHTML = str;
})
</script>