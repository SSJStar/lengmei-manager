<template>
  <div class="tip" v-if="isShow">
    <div class="bgView">
      <!--   内容   -->
      <label class="title">{{ titleValue }}</label>
      <br />
      <div class="actionView">
        <!--    分割线    -->
        <div class="row-line"></div>
        <button class="leftButton" @click="cancel">取消</button>
        <button class="rightButton" @click="confirm">确定</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// isShow 控制当前view的显示/隐藏
let isShow = ref(false);

// 标题
let titleValue = ref("");

// 定义props属性
const props = defineProps<{
  close: (btnIndex: number, msg?: any) => void;
  params: any;
}>();

const show = () => {
  isShow.value = true;
  titleValue.value = props.params["title"];
};
/**
 * 隐藏当前弹窗组件
 *
 * 作者: 小青龙
 * 时间：2022/11/04 11:20:48
 * @param btnIndex {number}  btnIndex为0，表示点击了取消按钮；btnIndex为1，表示点击了确定按钮；
 * @return {void}
 */
const hide = (btnIndex: number) => {
  isShow.value = false;
  if (btnIndex === 0) {
    props.close(btnIndex, "");
  } else if (btnIndex === 1) {
    props.close(btnIndex, "");
  }
};

// 取消事件
const cancel = () => {
  hide(0);
};

//确定事件
const confirm = () => {
  hide(1);
};
// 对外抛出两个方法
defineExpose({
  hide,
  show,
});

</script>

<style scoped>
.tip {
  position: fixed;
  display: flex;
  flex-direction: column;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /*设置颜色*/
  justify-content: center;
  align-items: center;
  z-index: 999; /** 设置层级最高 */
}

/* 中间背景 */
.tip .bgView {
  background-color: white;
  width: 20%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0px 5px 5px 5px;
  border-radius: 10px;
}
/* 取消、确定 - 父视图 */
.tip .bgView .actionView {
  width: 100%;
  height: auto;
  margin-top: 20px;
  /*background-color: #42b983;*/
}
/* 虚线 */
.tip .bgView .actionView .row-line {
  border: 1px dashed #999999;
  height: 0px;
  width: 100%;
}

/* 左边按钮 */
.tip .bgView .leftButton {
  margin-top: 20px;
  margin-left: 10px;
  display: inline-block;
  float: left;
  background-color: cadetblue;
  font-size: 18px;
  width: 100px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0);
}

/* 右边按钮 */
.tip .bgView .rightButton {
  margin-top: 20px;
  margin-right: 10px;
  display: inline-block;
  float: right;
  background-color: cadetblue;
  font-size: 18px;
  width: 100px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0);
}
/* 标题 */
.title {
  width: 100%;
  text-align: center;
  /*background-color: #42b983;*/
  font-size: 20px;
}
</style>
