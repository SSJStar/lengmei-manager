<!--<template>-->
<!--  <h1>{{acount}}</h1>-->
<!--  <div style="background-color: cadetblue;width: 100%;height: 100%;position: absolute;">-->
<!--    <button @click="useChildMethod" style="margin-top: 20px;margin-bottom: 30px;">点击调用SecondView方法</button>-->
<!--    <button @click="userFThreeViewMethod" style="margin-top: 20px;margin-bottom: 30px;">点击调用ThreeView方法</button>-->
<!--    <div>-->
<!--      &lt;!&ndash;       定义ref是用来在js里获取ChildView组件对象；-->
<!--            定义@fold是为了方便响应ChildView组件发出的fold信号  &ndash;&gt;-->
<!--&lt;!&ndash;      <SecondView ref="childViewRef" @fold="responseFold" foo="你好啊，Second组件！" style="width: 500px;height:200px;background-color: burlywood;align-items: center;display: inline-block;" :close="goMthod"></SecondView>&ndash;&gt;-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script setup>-->

<!--import {onMounted, onUpdated, provide, ref} from "vue";-->
<!--import SecondView from "@/views/test/SecondView.vue";-->
<!--import bus from "@/statics/EventBus";-->
<!--import acount from "../../main";-->

<!--onUpdated(()=>{-->
<!--  if (acount.value > 1) {-->
<!--    alert("检测到acount已经大于1");-->
<!--  }-->
<!--})-->

<!--function  responseFold(value){-->
<!--  console.log("我是父组件方法 -> responseFold，接收参数："+value)-->
<!--}-->

<!--// 定义与 ref 同名变量 (不要写在方法里面，否则会报错找不到)-->
<!--const childViewRef = ref(null)-->

<!--const useChildMethod = () => {-->
<!--  // 调用子组件的方法-->
<!--  childViewRef.value.childViewMethod1("111")-->
<!--  acount.value ++;-->
<!--}-->

<!--// 声明方法，供其他页面调用-->
<!--provide("rootViewMethodKEY",(data) => {-->
<!--  console.log(`RooTView,provide方法, data参数:${data}`)-->
<!--})-->

<!--const goMthod = (index, msg) => {-->
<!--  console.log("goMthod~");-->
<!--  console.log(`index:${index}  msg:${msg}`);-->
<!--}-->

<!--/*  -> 调用"孙组件"方法 */-->
<!--function userFThreeViewMethod() {-->
<!--  bus.emit("threeViewMethodKEY","我是RootView组件，我调用了ThreeView组件的方法")-->
<!--}-->
<!--</script>-->

<!--<script>-->
<!--export default {-->
<!--  setup(){-->
<!--    const title = "张三啊";-->
<!--    return-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
<!--  <img alt="Vue logo" src="./assets/logo.png" />-->
  <div style="background-color: #42b983">
    <h2>我是父组件</h2>
    <child>
<!--      <layout></layout>-->
<!--      <template :v-slot="header">-->
<!--        <div>我是 header：{{ message }}</div>-->
<!--      </template>-->
<!--      <div>我没有名字：{{ message }}</div>-->
      <template v-slot="footer">
        <div>我是 footer：{{ message }}</div>
      </template>
    </child>
  </div>
</template>

<script setup>
import ddSon from "@/views/test/SecondView.vue";
const message = "标题"
const header = "header"
const footer = "footer"
</script>






