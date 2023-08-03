<template>
  <div>
    <!--  气泡背景  -->
    <div id="lovesBgc"></div>

    <!-- 上升气泡   start-->
    <div class="bubbels">
      <div v-for="(item,index) in bubbles" v-bind:key="index" class="bubble"
           v-bind:style="item.color+item.width+item.height+item.left+
				item.delay+item.duration" @click="bubbleHandel($event,index)">
        <!--        <h5 v-if="index===0">111</h5>-->
        <!--        <h5 v-else-if="index===1">222</h5>-->
        <!--        <h5 v-else style="margin: auto">泡</h5>-->
        <h5>泡</h5>
      </div>
    </div>
    <!-- 上升气泡   stop-->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

  import {onBeforeMount} from "vue";

  const bubbles:any = ref([]); //气泡配置数组

  // 气泡点击
  function bubbleHandel(event,index){
    let ar = bubbles.value
    ar[index].width = 'width:' + 150 +'px;'
    ar[index].height = 'height:' + 150 +'px;'
    setTimeout(()=>{event.target.setAttribute("style","display:none");},50);
  }
 function createBubble(){
    let wh = [80, 60, 90, 120, 75, 85, 65, 120, 55, 90, 117];
    let duration = [8, 5, 10, 7, 6, 8, 7, 6, 9, 5, 8];
    let	delay = [0, 1, 1, 0, 0, 0, 2, 1, 0, 3, 2];
    let color = "rgb(" + parseInt((Math.random() * 255).toString()) + "," + parseInt((Math.random() * 255).toString()) + "," + parseInt((Math.random() * 255).toString()) + ")";
    let bubble = {}
    for (let i = 0; i < 11; i++) {
      console.log(wh[i]);
      bubble = {
        left   : 'left:' + Math.floor((Math.random() * 80) + 10)　+'%;', //左间距
        width  : 'width:' + wh[i]+'px;', //泡泡宽度
        color  : 'background-color:' + color + ';',
        height : 'height:' + wh[i]+'px;', //泡泡高度
        delay    : 'animation-delay:' + delay[i] + 's;', //延迟执行的时间
        duration : 'animation-duration:' + duration[i] + 's;', //一周期所需的时间
      }

      //将气泡配置添加到数组
      bubbles.value.push(bubble);
      //使用随机生成位置，但是显然具有不可控性
      // wh = Math.floor((Math.random()) * 65 + 15);
      // left = Math.floor((Math.random()) * 75 + 15) ;
      // duration = Math.floor(Math.random() * 11) % 6 + 5;
      // delay = Math.floor((Math.random() * 6) % 3 + 1) * Math.floor(Math.random() * 2) % 2;
      // 随机色：下一个泡泡的背景色
      color = "rgb(" + parseInt((Math.random() * 255).toString()) + "," + parseInt((Math.random() * 255).toString()) + "," + parseInt((Math.random() * 255).toString()) + ")";
      // this.sleep(1000);
      // console.log(i+'size:'+this.bubbles.length)
    }
  }

  onBeforeMount(()=>{
    createBubble()
  })

</script>

<style>
#lovesBgc{
  position: absolute;
  /*background-color: aqua;*/
  background-color: bisque;
  /*background-image: radial-gradient(red, yellow 10%, green 15%);*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}


/* 下边都是泡泡 start */
.bubble{
  position: absolute;
  bottom:0;
  border-radius:50%; /* 全圆 */
  /*
  opacity 属性设置元素的不透明级别。
  默认值: 1 继承性: no 版本: CSS3
  JavaScript 语法: object.style.opacity=0.5
  */
  opacity: 0.2;
  z-index: 999;
  animation: flying 10s infinite ease-in;
  display: flex;
}
.bubble h5{
  /* 通过父元素flex，子元素外边距（margin）自动，达到居中的效果 */
  margin: auto;
  /*width: 100%;*/
  /*height: 100%;*/
}
/* :nth-child(odd) 表示控制奇数样式 */
.bubble:nth-child(odd){
  /* infinite： 无限循环 */
  /* ease-in：变化以低速率开始，平均速度过度，结尾戛然而止 */
  animation: flyingOdd 10s infinite ease-in;
}

/* :nth-child(even) 表示控制偶数样式 */
.bubble:nth-child(even){
  animation: flyingEven 10s infinite ease-in;
}

/* @keyframes：在CSS3中，用于定义CSS动画的关键帧和属性值 */
/* translateX：表示X轴位移 */
@keyframes flyingEven{
  0%{
    bottom: 0;
    transform: translateX(0);
  }
  25%{
    transform: translateX(-200px);
  }
  50%{
    transform: translateX(0);
  }
  100%{
    bottom: 1080px;
    /* transform: rotateX(0); */
    transform: translateX(150px);
  }
}
@keyframes flyingOdd{
  0%{
    bottom: 0;
    transform: translateX(0);
  }
  25%{
    transform: translateX(50px);
  }
  50%{
    transform: translateX(-50px);
  }
  75%{
    transform: translateX(-80px);
  }
  100%{
    bottom: 1080px;
    /* transform: rotateX(0); */
    transform: translateX(180px);
  }
}

</style>
