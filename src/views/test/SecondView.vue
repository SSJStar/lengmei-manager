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




<!-- 测试watch -->
<!--<template>-->
<!--&lt;!&ndash;  <keep-alive include="a">&ndash;&gt;-->
<!--&lt;!&ndash;    <component :is="view"></component>&ndash;&gt;-->
<!--&lt;!&ndash;  </keep-alive>&ndash;&gt;-->

<!--&lt;!&ndash;   将（只）缓存组件name为a或者b的组件, 结合动态组件使用 &ndash;&gt;-->
<!--  <keep-alive include="a,b">-->
<!--    <component :is="myView"></component>-->
<!--  </keep-alive>-->

<!--  &lt;!&ndash; 组件name为c的组件不缓存(可以保留它的状态或避免重新渲染) &ndash;&gt;-->
<!--  <keep-alive exclude="c">-->
<!--    <component :is="myView"></component>-->
<!--  </keep-alive>-->

<!--  &lt;!&ndash; 使用正则表达式，需使用v-bind &ndash;&gt;-->
<!--  <keep-alive :include="/a|b/">-->
<!--    <component :is="myView"></component>-->
<!--  </keep-alive>-->

<!--  &lt;!&ndash; 动态判断 &ndash;&gt;-->
<!--  <keep-alive :include="includedComponents">-->
<!--    <router-view></router-view>-->
<!--  </keep-alive>-->

<!--  &lt;!&ndash; 如果同时使用include,exclude,那么exclude优先于include， 下面的例子只缓存a组件 &ndash;&gt;-->
<!--  <keep-alive include="a,b" exclude="b">-->
<!--    <component :is="myView"></component>-->
<!--  </keep-alive>-->

<!--  &lt;!&ndash; 如果缓存的组件超过了max设定的值5，那么将删除第一个被缓存的组件 &ndash;&gt;-->
<!--  <keep-alive exclude="c" max="5">-->
<!--    <component></component>-->
<!--  </keep-alive>-->
<!--</template>-->

<!--<script setup>-->
<!--import { computed, shallowRef } from 'vue'-->
<!--import a from './Component1.vue'-->
<!--import b from './Component2.vue'-->
<!--import c from './Component3.vue'-->
<!--import ThreeView from "@/views/test/ThreeView.vue";-->

<!--const myView = shallowRef(a)-->
<!--const includedComponents = computed(() => {-->
<!--  return myView.value-->
<!--})-->
<!--</script>-->


<template>
<!--  <div id="login" v-on:mousedown.left="createLoves($event)" v-on:mouseup="removeSmallHert">-->
<!--    <BubblesView ref="background"></BubblesView>-->
<!--  </div>-->
  <div id="login">
    <BubblesView ref="background"></BubblesView>
  </div>

  <div style="padding: 30px">
    <button @click="change('1')">组件1</button>
    <button @click="change('2')">组件2</button>
    <button @click="change('3')">组件3</button>
    <Component :is="componentTag"></Component>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const componentTag = ref("Component1")
import BubblesView from "@/views/test/BubblesView.vue"

const background = ref();
// function createLoves(e){
//   background.value.createLoves(e)
// }
// function removeSmallHert(){
//   background.value.removeSmallHert()
// }

 const change = (index) => {
    componentTag.value = 'Component' + index
 }

</script>
<!-- 此处再添加一个script标签，用于抛出组件 -->
<script lang="ts">
import Component1 from './Component1.vue'
import Component2 from './Component2.vue'
import Component3 from './Component3.vue'
export default {
  components: {Component1, Component2, Component3},
}
</script>
<style>
#login{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>


<!-- 显示/隐藏 动画 -->
<!--<template>-->
<!--  <transition name="fade">-->
<!--    <div v-if="show">我是一个div组件</div>-->
<!--  </transition>-->
<!--  <button @click="toggleShow">切换组件</button></template>-->
<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      show: true-->
<!--    };-->
<!--  },-->
<!--    methods:{-->
<!--      toggleShow(){-->
<!--        this.show=!this.show;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style>-->
<!--.fade-enter-active,.fade-leave-active {-->
<!--  transition: opacity .5s;-->
<!--}-->
<!--.fade-enter,.fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->
<!--</style>-->


<!-- 放大动画 -->

<!--<template>-->
<!--  <transition name="fade">-->
<!--    <div id="myView" v-if="show" style="background-color: #2c3e50;width: 100px;height: 50px;margin-left: 40%">我是一个div组件</div>-->
<!--  </transition>-->
<!--  <button @click="toggleShow">放大</button>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      show: true-->
<!--    };-->
<!--  },-->
<!--  methods:{-->
<!--    toggleShow(){-->
<!--      // this.show=!this.show;-->
<!--      let v = document.getElementById("myView")-->

<!--      // translate(-50%, -50%) scale(${-0.5})-->
<!--      v.style.transition = `all 0.7s linear`; // 添加动画效果-->
<!--      v.style.transform = `scale(${-0.5})`;-->
<!--      // v.setAttribute("style","scale(2);")-->

<!--      // v.setAttribute("class","bigAction")-->
<!--      // // 2秒后要移除class属性，否则下次就不执行shake动画了-->
<!--      // // setTimeout(()=>{event.target.removeAttribute("class")},2000);-->
<!--      // setTimeout(()=>{-->
<!--      //   console.log("bubbleHandel is doing")-->
<!--      //   v.removeAttribute("class")-->
<!--      //   v.setAttribute("style","display:none");-->
<!--      // },2000)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--/*.fade-enter-active,.fade-leave-active {*/-->
<!--/*  transition: opacity .5s;*/-->
<!--/*}*/-->
<!--/*.fade-enter,.fade-leave-to {*/-->
<!--/*  opacity: 0;*/-->
<!--/*}*/-->
<!--</style>-->

