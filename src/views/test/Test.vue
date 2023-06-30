<template>
  <button @click="handelUpdate">所有id + 1</button>
  <br/>
  <button @click="handelUpdate2">所有name，追加"张"</button>

  <div class="itemDiv" v-for="item in menu" v-memo="[item.name]">
    第{{count }}次渲染！<br />
    <h2>{{ item.id }} </h2>
    <h4> {{ item.name }} </h4>
  </div>

</template>

<script setup>
import { nextTick } from "vue";
import { ref } from "vue";

let count = ref(0) // 记录渲染次数

// 初始化menu数组 - 制造5000条数据
const menu = ref(
    Array.from({ length: 50000}, (_, index) => {
      return {
        id: "1000" + index,
        name: "name"+ index,
      };
    }),
);

// 所有id + 1
const handelUpdate = () => {
  menu.value.forEach((item)=>{
    item.id = (Number.parseInt(item.id)+1).toString();
  });
  // 打印渲染时间
  console.time()
  nextTick(()=> {
    // 记录结束时间
    console.timeEnd()
  })
}

// 所有name，追加"张"
const handelUpdate2 = () => {
  menu.value.forEach((item)=>{
    item.name += "张";
  });
  count.value ++;
  // 打印渲染时间
  console.time()
  nextTick(()=> {
    // 记录结束时间
    console.timeEnd()
  })
}
</script>

<style>

.itemDiv {
  margin: 20px;
  background-color: #b8b8b8;
}

h2,h4 {
  margin: 0;
  padding: 0;
}
</style>



<!--<template>-->
<!--  <h1 v-memo="[]">{{ num }}</h1>-->
<!--  <button @click="changeNum">累加</button>-->

<!--</template>-->

<!--<script setup>-->
<!--import { ref } from "vue";-->

<!--let num = ref(1);-->
<!--const changeNum = () => {-->
<!--  num.value ++;-->
<!--  console.log(num.value)-->
<!--}-->
<!--</script>-->





<!--<script setup>-->
<!--import { ref } from 'vue'-->
<!--// v-memo依赖项-->
<!--const subscribers = ref(10000);-->
<!--// v-memo子节点依赖项-->
<!--const inner = ref(500);-->
<!--</script>-->
<!--<template>-->
<!--  <div>-->
<!--    <p>视图状态</p>-->
<!--    <div v-memo="[subscribers]">-->
<!--      <p>Subscribers: {{ subscribers }}</p>-->
<!--      <p>inner: {{ inner }}</p>-->
<!--    </div>-->
<!--    <button @click="subscribers++">v-memo依赖项(Subscribers)++</button>-->
<!--    &lt;!&ndash; 这里改变内部依赖 视图不会更新 &ndash;&gt;-->
<!--    <button @click="inner++">子节点依赖项(inner)++</button>-->
<!--    <div>-->
<!--      <p>当前状态</p>-->
<!--      <p>Subscribers: {{ subscribers }}</p>-->
<!--      <p>inner: {{ inner }}</p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->