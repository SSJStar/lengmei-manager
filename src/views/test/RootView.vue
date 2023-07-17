
<!-- 例子5 -->
<template>
  <div class="div1"> <b>&emsp;&nbsp;计算属性compute实例</b></div>
  <h2>--------------------------------------</h2>
  <div class="div2">
    姓：<input type="text" v-model="r_info.xing">
    <br><br>
    名：<input type="text" v-model="r_info.ming">
    <br><br>
    姓名（对象）：{{ r_info.xm }}
    <br><br>
    姓名（变量）：{{ xingming }}
    <br><br>
    姓名（可修改文本框）： <br><input type="text" v-model="xmGetSet">


  </div>
</template>

<script>
// import { get } from 'http'
import {reactive, computed, watch, ref, onMounted} from 'vue'

export default {
  name: 'App',
  setup() {

    // reactive对象定义
    let r_info = reactive({
      xing: '张',
      ming: '飞',
      xm: computed(() => { return r_info.xing + ' | ' + r_info.ming })
    })
    // reactive数组定义
    let xingming = computed(() => {
      return r_info.xing + '-' + r_info.ming
    })

    // reactive数组定义
    let xmGetSet = computed({
      get(){
        return r_info.xing + '-' + r_info.ming
      },
      set(value){
        // r_info.xing = 1
        // r_info.ming = 2
      }

    })

    // 返回定义的数据变量和方法
    return {
      xingming,
      r_info,
      xmGetSet
    }
  }
}

</script>

<style>
.div1 {
  padding-left: 50px;
  text-align: left;
  font-size: 18px;
}

h2 {
  color: rgb(23, 50, 202);
}

.div2 {
  text-align: left;
  padding-left: 50px;
}

h4 {
  height: 20px;
  background-color: rgb(27, 40, 155);
}
</style>



