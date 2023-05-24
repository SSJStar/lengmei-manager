<template>
  <div style="display: flex" v-html="showText"></div>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, ref} from "vue";

const props = defineProps<{
  // close: (btnIndex: number, msg?: any) => void;
  text: string;
  replaceText: string;
  replaceColor:string;
  refreshCount:number;
}>();


let showText = ref("");

// onMounted(()=>{
//
//   // let str = '我愿变成童话里，你爱的那个天使';
//   // let replace_text= ["童话","天使"]
//   // let color_dict = {"童话":"rgb(255，0，0)","天使":"rgb(0，0，255)"}
//   // for(let i=0;i<replace_text.length;i++){
//   //   let color_temp=color_dict[replace_text[i]];
//   //   let replaceString = '<span style="color:' + color_temp + ';">' + replace_text[i] + "</span>";
//   //   str=str.replace(RegExp(replace_text[i],'g'), replaceString);
//   // }
//   // tt.value = str;
//
//
//   // let str = '我愿变成童话里，你爱的那个天使';
//   // str = str.replace("童话","<span style='color: indianred'>神话</span>")
//   // // tt.value = "你好"+"<span style='color: indianred'>哈哈</span>"
//   // showText.value = str;
//
//   // console.log("RickColorLabel onMounted执行一次！");
//   // showText.value = props.text.replace(props.replaceText,"<span style='color: "+props.replaceColor+"'>"+props.replaceText+"</span>")
// });

onUpdated(()=>{
  console.log("RickColorLabel onUpdated执行一次！"+props.replaceText);
  // // TODO:  实现原理
  // // props.text是全文内容，
  // // replace是替换函数，用第2个参数替换第1个参数，第2个参数是拼接好的html内容，其中包含了样式
  showText.value = props.text.replace(props.replaceText,"<span style='color: "+props.replaceColor+"'>"+props.replaceText+"</span>")
  // console.log("看看！"+showText.value);
});

</script>

<style scoped>

</style>