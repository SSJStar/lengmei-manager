<template>
  <div class="addUser" v-if="isShow">
    <div class="bgView">
      <!--    标题    -->
      <label class="title-label">{{ titleValue }}</label>

      <!--    副标题    -->
      <!--         <label class="subTitle-label">{{ subTitleValue }}</label>-->

      <!--    输入框    -->
      <div class="input-div">
        <input
            type="text"
            placeholder=" 请输入手机号"
            v-model="form.phone"
        />
      </div>

      <!--    输入框    -->
      <div class="input-div">
        <input
            type="text"
            placeholder=" 请输入昵称"
            v-model="form.nick_name"
        />
      </div>

      <!--    输入框    -->
      <div class="input-div">
        <input
            type="text"
            placeholder=" 请输入工作单位/公司"
            v-model="form.company"
        />
      </div>

      <div class="actionView">
        <!--    分割线    -->
        <div class="row-line"></div>
        <button class="leftButton" @click="cancel">取消</button>
        <button class="rightButton" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
let isShow = ref(false);

// //定义类型 Obj
// export interface SSJDialogParams {
//   // [key: string]: string | number;
//   [key: string]: string;
// }

// export type SSJDialogParams = {
//   title: string;
//   subTitle: string;
// };

let form = reactive({
    phone: "",
    nick_name: "",
    company: "",
});
let titleValue = ref("");
let subTitleValue = ref("");

const props = defineProps<{
  close: (btnIndex: number, msg?: any) => void;
  params: any;
}>();

// console.log("111 " + props.params);
const show = () => {
  isShow.value = true;
  titleValue.value = props.params["title"];
  subTitleValue.value = props.params["subTitle"];
  console.log(`titleValue - ${titleValue}  subTitleValue - ${subTitleValue}`)
  console.log(props.params);
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
    props.close(btnIndex, form);
  }
  // 清空
  form = reactive({
    phone: "",
    nick_name: "",
    company: "",
  });
};

// 取消事件
const cancel = () => {
  hide(0);
};

//确定事件
const confirm = () => {
  hide(1);
};

defineExpose({
  hide,
  show,
});

onMounted(() => {
  // 此刻的props是没有值的，要在show()函数里进行操作
});
</script>

<style scoped>
.addUser {
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
.addUser .bgView {
  background-color: white;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0px 5px 5px 5px;
  border-radius: 10px;
}
/* 标题 */
.addUser .bgView .title-label {
  padding: 0;
  font-size: 28px;
  width: 100%;
  text-align: center;
  color: #333333;
}
/* 副标题 */
.addUser .bgView .subTitle-label {
  font-size: 24px;
  width: 100%;
  text-align: center;
  color: #666666;
}

/* 输入区域 */
.addUser .bgView .input-div {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
.addUser .bgView .input-div input {
  font-size: 24px;
  width: 70%;
  height: 30px;
  margin-top: 20px;
  display: inline-block;
  justify-items: center;
  color: #666666;
}

/* 虚线 */
.addUser .bgView .actionView .row-line {
  border: 1px dashed #999999;
  height: 0px;
  width: 100%;
}

/* 取消、确定 - 父视图 */
.addUser .bgView .actionView {
  width: 100%;
  height: auto;
  margin-top: 40px;
  /*background-color: #42b983;*/
}

/* 左边按钮 */
.addUser .bgView .leftButton {
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
.addUser .bgView .rightButton {
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

/* 输入框-placeholder-颜色、字体大小 */
::-webkit-input-placeholder{/*Webkit browsers*/
  color:#999;
  font-size:16px;
}
:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
  color:#999;
  font-size:16px;
}
/*::moz-placeholder{!*Mozilla Firefox 19+*!*/
/*  color:#999;*/
/*  font-size:16px;*/
/*}*/
:-ms-input-placeholder{/*Internet Explorer 10+*/
  color:#999;
  font-size:16px;
}
</style>
