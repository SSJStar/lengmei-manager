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



<!-- 测试comouted -->
<!--<template>-->
<!--  <div class="child-box" style="background-color: #999999">-->
<!--    <h3>我是子组件</h3>-->
<!--    <footer>-->
<!--      语文成绩：-->
<!--      <input id="grade1" placeholder="请输入语文成绩" style="margin-top: 10px" v-model="a" />-->
<!--      数学成绩：-->
<!--      <input id="grade2" placeholder="请输入数学成绩" style="margin-top: 10px" v-model="b" />-->
<!--      总成绩：-->
<!--      <label style="margin-top: 10px">{{ sum }}</label>-->
<!--      <br />-->
<!--      <button @click="()=>{ a ++ }">语文成绩累加</button>-->
<!--      <button @click="()=>{ b ++ }" style="margin-left: 30px" >数学成绩累加</button>-->
<!--      <button @click="sumAdd" style="margin-left: 30px" >sum累加</button>-->
<!--    </footer>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {computed, ref} from "vue";-->

<!--let a = ref(20); // 语文成绩-->

<!--let b = ref(30); // 数学成绩-->

<!--let sum = computed(()=>{ // 总成绩-->
<!--  return a.value + b.value-->
<!--})-->

<!--// 测试直接操作sum-->
<!--const sumAdd = ()=> {-->
<!--  console.log("sumAdd被执行")-->
<!--  sum ++-->
<!--  console.log(sum)-->
<!--  console.log(typeof sum)-->
<!--}-->
<!--</script>-->
<template>
  <div>sencondView</div>
</template>
<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";

onMounted(()=>{
  console.log("ref----");
  // ref - 浅度监听
  let numRef1 = ref(1)
  watch(numRef1,(newValue, oldValue)=>{
    console.log(`ref浅度监听1 -  新值：${newValue}    旧值:${oldValue}`);
  });
  numRef1.value = 2;

  // ref - 深度监听
  let numRef2 = ref({num:100})
  watch(numRef2,(newValue, oldValue)=>{
    console.log(`ref深度监听2 -  新值：${newValue}    旧值:${oldValue}`);
  });
  numRef2.value.num = 101;

  // ref - 深度监听
  let numRef3 = ref({num:100})
  watch(numRef3,(newValue, oldValue)=>{
    console.log(`\nref深度监听3 -  新值：${newValue}    旧值:${oldValue}`);
    console.log("新值：");
    console.log(newValue);

    console.log("旧值:");
    console.log(oldValue);
  },{deep:true});
  numRef3.value.num = 101;


  // let numRef4 = ref({num:1000})
  // computed:{
  //   function data(){
  //     return JSON.parse(JSON.stringify(numRef4))
  //   }
  // };
  // watch(
  //     data: {
  //       handel:function (newValue, oldValue){
  //         console.log("新值：");
  //         console.log(newValue);
  //
  //         console.log("旧值:");
  //         console.log(oldValue);
  //       },
  //   // deep:true,
  //   },
  // );
  //
  // numRef4.value.num = 1001;



/// reactive监听
//
//
//   let hobbyRef = reactive({hobby:"打篮球"})
//   watch(hobbyRef,(newValue, oldValue,onCleanup)=>{
//     console.log("hobbyRef.hobby发生了变化。  ")
//
//     console.log("newValue   ")
//     console.log(newValue)
//
//     console.log("oldValue   ")
//     console.log(oldValue)
//
//     console.log("onCleanup  ")
//     console.log(onCleanup)
//   },{deep:true});
//   hobbyRef.hobby = "打乒乓球";
});
</script>