<!--第四种-->
<!--
数据源大概是要这样展示：
浙江
  杭州
    西湖区
    滨江区
    上城区
  绍兴
  宁波
  台州
上海
内蒙
  呼和浩特
  包头
  乌海
-->

<template>
  <div class="foldIcon">
    <img @click="zhedie" v-bind:src="foldImageName" />
  </div>
  <el-container>
    <el-aside :width="isCollapse ? props.foldOff_width : props.foldOn_width">
      <el-menu
        active-text-color="#ffd04b"
        v-bind:background-color="staticVars.BACKGROUNBD_COLOR"
        class="el-menu-vertical-demo"
        :default-active="sel"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <!--这是一个for循环，遍历第一级-->
        <!-- 针对每一个item、item2，要判断它下面有没有子菜单，如果有就用el-sub-menu创建它，如果没有就用el-menu-创建它 -->
        <!-- 注意：item3作为第三级菜单，不再往下拓展-->
        <div
          :index="item.index"
          v-for="item in props.listJson.list"
          :key="item.key"
        >
          <!--能进入这个v-if，表示这个一级菜单下面还有子菜单（二级菜单）-->
          <div v-if="item.childrens.length > 0">
            <el-sub-menu :index="item.index" :key="item.id">
              <!--   这里的item表示第一级菜单   -->
              <template #title>
                <el-icon>
                  <!--  <icon-menu /> -->
                  <!--  上面这行使用的是element-plus自带图标库，下面这行使用的我们自己导入到项目的图片
                      利用v-bind将item.iconName的图片路径赋值给src，请注意：路径需要用require()包裹住
                -->
                  <img class="icon-style" v-bind:src="item.iconName" />
                </el-icon>
                <span v-show="!isCollapse" class="caiDanAuth">{{
                  item.title
                }}</span>
              </template>

              <!-- 这里展示二级菜单，没有子菜单（三级菜单）就用el-menu-item-->
              <div v-for="item2 in item.childrens" :key="item2.key">
                <!--   此处v-if表示二级菜单下面，没有子菜单   -->
                <div v-if="item2.childrens.length === 0">
                  <el-menu-item
                    :index="item2.index"
                    :key="item2.id"
                    @click="goUrl(item2.parent_id, item2.title, item2.index)"
                  >
                    <el-icon><Setting /></el-icon>
                    <span class="caiDanAuth">{{ item2.title }}</span>
                  </el-menu-item>
                </div>

                <!--   此处v-else表示二级菜单下面，还有子菜单   -->
                <div v-else>
                  <!--   这里的item2表示第二级菜单   -->
                  <el-sub-menu :index="item2.index" :key="item2.id">
                    <template #title>
                      <el-icon><Setting /></el-icon>
                      <span class="caiDanAuth">{{ item2.title }}</span>
                    </template>
                    <!--  这里展示三级菜单，三级菜单为最后一层，不再往下拓展（所以用el-menu-item）-->
                    <el-menu-item
                      :index="item3.index"
                      v-for="item3 in item2.childrens"
                      :key="item3.id"
                      @click="goUrl(item3.parent_id, item3.title, item3.index)"
                    >
                      <el-icon><Location /></el-icon>
                      <span class="caiDanAuth">{{ item3.title }}</span>
                    </el-menu-item>
                  </el-sub-menu>
                </div>
              </div>
            </el-sub-menu>
          </div>

          <!--能进入这个v-else，表示这个一级菜单下面没有子菜单-->
          <div v-else>
            <!-- 一级菜单下面没有子菜单，那一级菜单就用el-menu-item-->
            <el-menu-item
              :index="item.index"
              :key="item.id"
              @click="goUrl(item.parent_id, item.title, item.index)"
            >
              <el-icon>
                <img class="icon-style" v-bind:src="item.iconName" />
              </el-icon>
              <span v-show="!isCollapse" class="caiDanAuth">{{
                item.title
              }}</span>
            </el-menu-item>
          </div>
        </div>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script setup>
import { Location, Setting } from "@element-plus/icons-vue"; //引入图标
import { onMounted, ref } from "vue";
// import { staticVars } from "../GitHub/ ssj-vue-project/src/statics/global.js";
import { staticVars } from "@/statics/global";
import {useRoute, useRouter} from "vue-router";
onMounted(() => {
  const router = useRoute();

  console.log("3333 - " + router.name + "  " + router.path + "  " + router.query);
  // 保证网页刷新，菜单栏选中状态不丢失
  if (router.name === "home") {
    sel.value = "1";
  }else{
    sel.value = router.name;
  }
  // console.log(staticVars.BACKGROUNBD_COLOR);
});

//TODO: 选中的菜单
const sel = ref("1");

// 折叠还是展开
let isCollapse = ref(false);

let displayValue = ref("block");

// （展开 ｜ 收起）图片路径
// eslint-disable-next-line @typescript-eslint/no-var-requires
let foldImageName = ref(require("/src/assets/menu/icon-menu-shouqi.png"));

let foldIconColor = staticVars.BACKGROUNBD_COLOR;

let menuFontSize = staticVars.LEFTMENU_FONTSIZE; //菜单栏-字体大小

/* 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，
 * 它们具备完整的类型推断并且在 <script setup> 中是直接可用的：
 */
const emit = defineEmits(["change", "selected"]);
const props = defineProps({
  foldOn_width: String, //展开时的宽度
  foldOff_width: String, //收起时的宽度
  listJson: Object, //菜单数据源
});

/**
 * 点击了菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:17:49
 * @param parent_id {string}  上一级的index
 * @param title     {string}      被点击菜单-》文字
 * @param parent_id {string}  被点击菜单-》index
 * @return void
 */
function goUrl(parent_id, title, index) {
  // alert(title + "，id是" + index);
  //通知父视图，点击了哪个index
  emit("selected", index);
}

/**
 * 展开菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:25:51
 * @example {说点什么}
 * @param key     {string}    index
 * @param keyPath {string[]}  描述信息
 * @return {void}
 */
const handleOpen = (key, keyPath) => {
  console.log("handleOpen--" + key, keyPath);
};

/**
 * 收起菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 15:54:22
 * @param key     {string}    描述信息
 * @param keyPath {string[]}  描述信息
 */
const handleClose = (key, keyPath) => {
  console.log("handleClose--" + key, keyPath);
};

//折叠方法
function zhedie() {
  // console.log("执行zhedie方法")
  isCollapse.value = !isCollapse.value;
  //修改displayValue值，控制三角形的显示或隐藏
  if (isCollapse.value) {
    displayValue.value = "none";
    foldImageName.value = require("/src/assets/menu/icon-menu-zhankai.png");
  } else {
    displayValue.value = "block";
    foldImageName.value = require("/src/assets/menu/icon-menu-shouqi.png");
  }
  //告诉调用者，展开还是收起（即由当前组件，通知外面）
  emit("change", !isCollapse.value);
}

//定义方法，并暴露给外界调用
function pubMethod(value) {
  console.log("接收外界value:" + value);
}
// 暴露给外界调用
defineExpose({ pubMethod });
</script>

<style>
/*设置 - 每一级别的菜单图标大小*/
.el-icon .icon-style {
  width: 16px;
  height: 16px;
}

/*折叠按钮*/
.foldIcon {
  height: 30px;
  background-color: v-bind(foldIconColor);
  /*设置子元素 - 水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/*设置 - 折叠图标大小*/
.foldIcon img {
  width: 16px;
  height: 16px;
}

/*去掉el-menu右侧 - 白色边框线*/
.el-menu {
  border: 0 !important;
  height: 100%;
  text-align: center;
}

/*虽然灰色，但是起作用了……*/
.caiDanAuth {
  font-size: v-bind(menuFontSize);
}

/*设置三角形显示还是隐藏，由响应式变量displayValue来控制*/
.el-menu .el-sub-menu__icon-arrow {
  display: v-bind(displayValue);
}
</style>
