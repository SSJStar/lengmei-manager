<template>
  <div style="display: flex" v-html="showText"></div>
</template>

<script lang="ts" setup>
import { onUpdated, ref } from "vue";

const props = defineProps<{
  text: string;
  replaceText: string; //高亮的内容
  replaceColor:string; //高亮的颜色
  refreshCount:number; //这个值变化，当前组件就会刷新
}>();

let showText = ref("");

onUpdated(()=>{
  console.log("RickColorLabel onUpdated执行一次！"+props.replaceText);
  // TODO:  实现原理
  // props.text是全文内容，
  // replace是替换函数，用第2个参数替换第1个参数，第2个参数是拼接好的html内容，其中包含了样式
  showText.value = props.text.replace(props.replaceText,"<span style='color: "+props.replaceColor+"'>"+props.replaceText+"</span>")
  console.log("richColorLabel 打印showText.value：" ,showText.value)
});

</script>
