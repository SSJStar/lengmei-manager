<template>
  <div>
    <!--  气泡背景  -->
    <div id="lovesBgc"></div>

    <!-- 点击biubiubiu小心心  start-->
<!--    <div v-for="(item,index) in loves" v-bind:key="index"  v-bind:ref="loves[index].count"  class="img"-->
<!--         v-bind:style="item.top+item.left+item.scale+item.opacity" style="  float: left;">-->
<!--      <div class="left"  v-bind:style="item.childBgc"></div>-->
<!--      <div class="right" v-bind:style="item.childBgc"></div>-->
<!--      <div class="under" v-bind:style="item.childBgc"></div>-->
<!--      <div class="text"> {{text[loves[index].textIndex]}}</div>-->
<!--    </div>-->
    <!-- 点击biubiubiu小心心  stop-->

    <!-- 上升气泡   start-->
    <div class="bubbels">
      <div v-for="(item,index) in bubbles" v-bind:key="index" class="bubble"
           v-bind:style="item.color+item.width+item.height+item.left+
				item.delay+item.duration">
<!--        <h5 v-if="index===0">111</h5>-->
<!--        <h5 v-else-if="index===1">222</h5>-->
<!--        <h5 v-else style="margin: auto">泡</h5>-->
        <h5>泡</h5>
      </div>
    </div>
    <!-- 上升气泡   stop-->
  </div>
</template>

<script>
export default {
  data(){
    // const text = ["佘雪楠~", "我喜欢你~", "我爱你~", "哎呀呀~", "mua~", "大美女", "想你", "咦~"];
    // const loves = [];
    const bubbles = []; //气泡配置数组
    // count:1,top:'200px',left:'200px',translateY:'-40px',transform:0.5,opacity:0.5
    return {
      // text : text,  //小心心上边显示的文字
      // textIndex : 0,  //小心心数组下标
      // loves : loves, //小心心样式
      // count : 0,   //创建元素个数
      bubbles : bubbles
    }
  },
  methods: {
    // 创建小心心
    // createLoves(event) {
    //   console.log("createLoves function is running")
    //   let x = 0;
    //   let y = 0;
    //   let index = 0;//text文本下标
    //   let color = "background-color:rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ");";
    //   index = Math.floor(Math.random()* this.text.length) ;
    //   console.log(this.text[index]);
    //   // alert(this.$el);
    //   x = event.clientX - 10;
    //   y = event.clientY  - 17;
    //   // alert(event.clientX);
    //
    //   console.log('x:'+x+' y:'+y+' color:'+color);
    //   let style = {
    //     count : 'img' + ++this.count,//
    //     top : 'top:' + y + 'px;',
    //     left : 'left:' + x + 'px;',
    //     opacity : 'opacity:' + 0.5 + ';',
    //     childBgc : color,
    //     textIndex : index,
    //     scale : 'transform: scale(' + 1 + ');',
    //     // scale : 'left:' + 1
    //   };
    //   this.loves.push(style);
    //   //在点击鼠标时更新一次泡泡的位置
    //   this.updateBubble();
    // },

    // removeSmallHert(){
    //   this.loves[this.count-1].opacity = 'opacity:' + 0 + ';',
    //       this.loves[this.count-1].scale = 'transform:translateY(' + -80 + 'px) scale(' + 0.5 + ');'
    // },
    createBubble(){
      // let left = [10, 20, 35, 50, 55, 65, 75, 80, 70, 85,77];
      let wh = [40, 20, 50, 80, 35, 45, 25, 80, 15, 50, 77];
      let duration = [8, 5, 10, 7, 6, 8, 7, 6, 9, 5, 8];
      let	delay = [0, 1, 1, 0, 0, 0, 2, 1, 0, 3, 2];
      let color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
      let bubble={}
      for (var i = 0; i < 11; i++) {
        console.log(wh[i]);
        bubble = {
          left   : 'left:' + Math.floor((Math.random() * 80) + 10)　+'%;', //左间距
          width  : 'width:' + wh[i]+'px;', //泡泡宽度
          color  : 'background-color:' + color + ';',
          height : 'height:' + wh[i]+'px;', //泡泡高度
          delay    : 'animation-delay:' + delay[i] + 's;', //延迟执行的时间
          duration : 'animation-duration:' + duration[i] + 's;', //一周期所需的时间
        }
        // if(i === 0) {
        //   bubble.left = 'left::50px;'
        //   bubble.width = 'width:80px;'
        //   bubble.height = 'width:80px;'
        // }else if(i === 1) {
        //   bubble.left = 'left::250px;'
        //   bubble.width = 'width:80px;'
        //   bubble.height = 'width:80px;'
        // }

        // if(i === 3) {
        //   bubble.width = 'width:220px;'
        // }
        // console.log('bubble'+bubble.color);
        // // if(i === 0) {
        //   console.log("start~~~");
        //   console.log(bubble.left);
        //   console.log(bubble.width);
        //   console.log(bubble.color);
        //   console.log(bubble.height);
        //   console.log(bubble.delay);
        //   console.log(bubble.duration);
        //   console.log("end~~~!");
        // // }
        //将气泡配置添加到数组
        this.bubbles.push(bubble);
        //使用随机生成位置，但是显然具有不可控性
        // wh = Math.floor((Math.random()) * 65 + 15);
        // left = Math.floor((Math.random()) * 75 + 15) ;
        // duration = Math.floor(Math.random() * 11) % 6 + 5;
        // delay = Math.floor((Math.random() * 6) % 3 + 1) * Math.floor(Math.random() * 2) % 2;
        // 随机色：下一个泡泡的背景色
        color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
        // this.sleep(1000);
        // console.log(i+'size:'+this.bubbles.length)
      }
    },
    // updateBubble(){
    //   //更新泡泡的位置
    //   let a=Math.floor(Math.random() * 80) + 10;
    //   this.bubbles[Math.floor(Math.random() * 11)].left =  'left:' + a +'%';
    // }
  },
  beforeMount() {
    this.createBubble()
  }
}
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
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  top:0;
  left: 0;
  z-index: -1;
}

/* biubiubiu小心心 start */
.img {width: 20px;height: 20px;opacity: 1;position: absolute;z-index: 1000;transition: 2.5s;}
.left,.right {width: 10px;height: 10px;border-radius: 100%;position: absolute;}
.right {right: 0;}
.under {width: 10px;height: 10px;position: absolute;top: 5px;left: 5px;transform: rotate(45deg)}
.text {width: 50px;font-size: 10px;line-height: 1;position: absolute;top: -1em;left: -15px;text-align: center;}

/* biubiubiu小心心 stop */

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
    bottom: 0px;
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
    bottom: 0px;
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

