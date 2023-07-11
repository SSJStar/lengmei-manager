<!--<template>-->
<!--  <h1>{{acount}}</h1>-->
<!--  <div style="background-color: cadetblue;">-->
<!--    <button @click="userFatherMethod">点击调用父组件(RootView)方法</button>-->
<!--    <h5>{{foo}}</h5>-->
<!--    <ThreeView ref="threeViewRef" foo="你好啊，ThreeView组件！"></ThreeView>-->
<!--  </div>-->
<!--</template>-->


<!--<script setup lang="ts">-->
<!--import ThreeView from "@/views/test/ThreeView.vue";-->
<!--import {onMounted, ref} from "vue";-->
<!--import acount from "../../main";-->

<!--const threeViewRef = ref(null)-->

<!--/* 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，-->
<!--* 它们具备完整的类型推断并且在 <script setup> 中是直接可用的：-->
<!--*/-->
<!--/*  此处填写对外抛出的emit字符标识 */-->

<!--/* 此处声明属性，在父组件的表现形式为：<ChildView foo="你好啊，子组件！" /> */-->
<!--// const props = defineProps({-->
<!--//   foo: String;-->
<!--//   go: () => void;-->
<!--// })-->
<!--const props = defineProps<{-->
<!--  close: (btnIndex, msg?) => void;-->
<!--  foo: any;-->
<!--}>();-->

<!--/*  -> 调用父组件方法 */-->
<!--const emit = defineEmits(['fold'])-->
<!--function userFatherMethod() {-->
<!--  /*    此处的fold在父组件的表现形式为 <ChildView @flod="XXX"/>-->
<!--  fold相当于一个标记，父组件的@flod可以理解为对ChildView组件的一种响应，响应的方法实现则是 XXX */-->

<!--  emit("fold","Second调用RootView组件")-->

<!--  /*  温馨提示：此处的fold要加入到上面defineEmits里，否则控制台会报警告：-->
<!--*     [Vue warn]: Component emitted event "fold" but it is neither declared in the emits option nor as an "onFold" prop.-->
<!--* */-->
<!--}-->

<!--onMounted(()=>{-->
<!--  console.log("secondpage onMounted~");-->
<!--  props.close(1,"测试一下");-->
<!--});-->

<!--function childViewMethod1(value) {-->
<!--  console.log("我是SecondView方法1 -> childViewMethod1，接收参数："+value)-->
<!--}-->

<!--function childViewMethod2(value) {-->
<!--  console.log("我是SecondView方法2 -> childViewMethod2")-->
<!--}-->

<!--const doSth = (str) => {-->
<!--  console.log("SecondView的 doSth 方法执行了！" + str);-->
<!--}-->

<!--/* 暴露给外界3个方法 */-->
<!--defineExpose({childViewMethod1, childViewMethod2, doSth})-->

<!--</script>-->



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


<!--<template>-->
<!--  <div style="background-color: yellowgreen;">-->
<!--    <div id="numID1" style="height: 100px;overflow: hidden"></div>-->
<!--  </div>-->
<!--  <ThreeView></ThreeView>-->
<!--</template>-->

<!--<script setup>-->
<!--import {onMounted} from "vue";-->
<!--import ThreeView from "@/views/test/ThreeView.vue";-->
<!--import router from "@/router";-->
<!--onMounted(()=>{-->
<!--  let str = ""-->
<!--  for (let i = 0; i < 100000; i++) {-->
<!--    str = " " + i-->
<!--  }-->
<!--  document.getElementById("numID1").innerHTML = str;-->
<!--})-->
<!--</script>-->




<template>
  <div class="child-box" style="background-color:red">
    <h3>我是子组件</h3>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>