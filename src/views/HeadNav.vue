<template>
  <div class="head-nav">
    <div style="position: absolute; text-align: center">
      <label>冷媒后台管理系统</label>
    </div>

    <!--  头像 + 昵称  -->
    <div class="userInfoDiv" id="head-div" ref="userInfoDivRef">
<!--      &lt;!&ndash;  头像  &ndash;&gt;-->
<!--      <img-->
<!--        src="https://randomuser.me/api/portraits/men/33.jpg"-->
<!--        alt=""-->
<!--        :onmouseenter="mouthIntoHead"-->
<!--        :onmouseleave="mouthLeaveHead"-->
<!--      />-->
<!--      &lt;!&ndash;  昵称  &ndash;&gt;-->
<!--      <label>-->
<!--        {{ nickNameVal }}-->
<!--      </label>-->
      <!--   假数据   -->
      <label style="font-size: 16px;margin-top: 20px;height: 24px;">欢迎您，小王（管理员）</label>
    </div>

    <!-- box列表    flex-shrink: 0-->
    <div
      class="boxDiv"
      v-show="boxShow"
      ref="boxRef"
      :onmouseenter="mouthIntoBox"
      :onmouseleave="mouthLeaveBox"
    >
      <!--   个人信息   -->
      <label @click="userInfoClick"> 个人信息 </label>
      <!--   退出登录   -->
      <label @click="unLoginClick" style="margin-top: 10px"> 退出登录 </label>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { staticVars } from "@/statics/global.js";
// let navHidden = ref(true); //控制返回控件的显示或隐藏（根据navArray个数）
// let navArray = ref([]);
let nickNameVal = ref(""); //昵称
let boxShow = ref(true); //box显示与否,默认显示，目的是为了在onMounted里得到实际宽度
let boxRef = ref(null);
let userInfoDivRef = ref(null);
let boxRight = ref("20px"); //box组件距离右边的值
let mouthInBox = false; //当前光标是否在列表上
// const route = useRoute();

// 设置导航栏高度、背景颜色、大标题字体大小、点击头像列表字体大小、字体颜色
const navgation_height = staticVars.NAVGATION_HEIGHT;
const navgation_bgColor = staticVars.NAVGATION_BGCOLOR;
const navgation_fontSize = staticVars.NAVGATION_TITLEFONTSIZE;
const navgation_list_fontSize = staticVars.NAVGATION_LISTFONTSIZE;
const navgation_titleColor = staticVars.NAVGATION_TITLECOLOR;

onMounted(function () {
  console.log("onMounted被执行");
  // 加延迟是因为，直接获取到的userInfoDiv宽度不对，可能是组件没有加载完全
  setTimeout(() => {
    // 计算box组件的right值
    // box.right = userInfoDiv 的宽度 + userInfoDiv.right - box.width * 0.5 - 头像宽度 * 0.5
    // action: 头像 - 退出登录，会进入这里且userInfoDivRef.value为空
    if (userInfoDivRef.value) {
      boxRight.value =
        (
          userInfoDivRef.value.offsetWidth +
          20 -
          boxRef.value.offsetWidth * 0.5 -
          30 * 0.5
        ).toString() + "px";
      // 控制台 - 打印宽度
      // console.log(
      //   "userInfoDiv宽度 -- " +
      //     userInfoDivRef.value.offsetWidth +
      //     "  box宽度---" +
      //     boxRef.value.offsetWidth +
      //     "  boxRight---" +
      //     boxRight.value
      // );
    }
    //到此，已经利用完了，可以把它先隐藏起来
    boxShow.value = false;
  }, 0);
}, undefined);

/** 鼠标移动事件*/
// 移入到头像 ，显示展示列表
const mouthIntoHead = () => {
  boxShow.value = true;
};

// 移出头像 ，隐藏展示列表
const mouthLeaveHead = () => {
  // 1秒后判断：如果光标不在列表上就隐藏
  setTimeout(() => {
    console.log("mouthInBox---" + mouthInBox);
    if (mouthInBox === false) {
      boxShow.value = false;
    }
  }, 100);
};

// 鼠标移入列表 ，显示展示列表
function mouthIntoBox() {
  mouthInBox = true;
  boxShow.value = true;
}

// 鼠标移出列表 ，隐藏展示列表
function mouthLeaveBox() {
  mouthInBox = false;
  boxShow.value = false;
}

const inj_person = inject("showUserInfoViewKEY");
function userInfoClick() {
  console.log("点击了 个人信息");
  boxShow.value = false;
  // 调用LayoutView里的「showUserInfoView」方法
  inj_person();
}

const inj = inject("showLoginVueKEY");
function unLoginClick() {
  console.log("点击了 退出登录");
  boxShow.value = false;
  inj(true); //告诉App.vue，展示登录页面
}

//修改的登录账户的昵称
function changeLoginName(nickName) {
  console.log("接收外界nickName:" + nickName);
  nickNameVal.value = nickName;
}

defineExpose({ changeLoginName });
</script>

<style>
.head-nav {
  width: 100%;
  height: v-bind(navgation_height);
  overflow: hidden;
  background-color: v-bind(navgation_bgColor); /** cadetblue */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 标题 */
.head-nav label {
  font-size: v-bind(navgation_fontSize);
  color: v-bind(navgation_titleColor);
}
/* 点击头像-列表-每一项的字体大小*/
.boxDiv label {
  font-size: v-bind(navgation_list_fontSize);
}
/* 头像 + 昵称 */
.userInfoDiv {
  right: 20px;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
}
.userInfoDiv img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.userInfoDiv label {
  float: right;
  margin-left: 10px;
  height: 30px;
}

/* 点击头像-列表 */
.boxDiv {
  display: flex;
  top: v-bind(navgation_height);
  right: v-bind(boxRight);
  background-color: #333333;
  position: absolute;
  flex-direction: column;
  padding: 10px 8px;
  z-index: 999;
}
.boxDiv label {
  color: white;
}
</style>
