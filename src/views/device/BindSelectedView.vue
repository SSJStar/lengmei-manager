<template>
  <div class="tip" v-if="isShow">
    <div class="bgView">
      <!--   内容   -->
      <label class="title">{{ titleValue }}</label>
      <!--    <el-checkbox v-model="checked1" disabled>Disabled</el-checkbox>-->
      <!--    <el-checkbox v-model="checked2">Not disabled</el-checkbox>-->
      <br />
      <div class="listDiv">
        <div v-for="(item,index) in listValue" :key="index">
          {{ item.name }}<input class="checkBox" :id="index" type="checkbox" name="item.name" value="item.index" v-model="item.selectedState" @change="handelChange(index)" />
        </div>
        <!--          李四1<input class="checkBox" type="checkbox" name="lisi" value="1" v-model="selecteds" />-->
      </div>
      <br />
      <!--  绑定/解绑  -->
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
import {onMounted, ref} from "vue";
import {User} from "@element-plus/icons-vue";
let selecteds:any = [];

// isShow 控制当前view的显示/隐藏
let isShow = ref(false);

// 标题
let titleValue = ref("");
// 用户列表数据
let listValue = ref([]);

// 定义props属性
const props = defineProps<{
  close: (btnIndex: number, msg?: any) => void;
  params: any;
}>();

interface Item {
  id: string
  name: string
  selectedState: number
}

// let jsonData = [
//   {
//     id: "10001",
//     name: "张三",
//     phone: "13396551781",
//     selectedState: 0,
//     isChecked: false,
//   },
//   {
//     id: "10002",
//     name: "里斯",
//     phone: "13896883359",
//     selectedState: 0,
//     isChecked: false,
//   },
//   {
//     id: "10003",
//     name: "王武",
//     phone: "15167661836",
//     selectedState: 0,
//     isChecked: false,
//   }
// ];

// jsonData[0].isChecked="2";
// onMounted(()=> {
//   jsonData.forEach(v => {
//     v.isChecked = '';
//   })
// });

/** numnber -> bool
 *
 *  作者：小青龙
 *  时间：2023/05/06 11:51:22
 */
const handelChange = (index: number)=> {
  console.log(selecteds.value);
  console.log(index);
  if(listValue.value[index]['selectedState']){
    console.log("选中~"+index)
    //   添加到selecteds
    selecteds.push(listValue.value[index])
  }else {
    console.log("没选中~"+index)
    //   从selecteds数组里移除
    for (let i in selecteds) {
      if (selecteds[i] == listValue.value[index]) {
        selecteds.splice(i,1);
      }
    }
  }
};
const show = () => {
  isShow.value = true;
  titleValue.value = props.params["title"];
  selecteds.length = 0; //清空数组
  let list_value: [any] = props.params["list"];
  let list_value2:any = [];
  // 遍历json数组，重新组装为Item数组
  if (list_value instanceof Array){
    list_value.forEach(item => {
      Object.assign(item,{selectedState: 0})
      // list_value2.push(Object.assign(item,{selectedState: 0}))
      item["selectedState"] = 0
      let model: Item = {
        id: item['user_id'],
        name: item['name'],
        selectedState: 0,
      }
      list_value2.push(model);
    });
  }

  listValue.value = list_value2;
  console.log("selecteds  ",selecteds)
  // titleValue.value = props.params["title"];
  // subTitleValue.value = props.params["subTitle"];
  // console.log(`titleValue - ${titleValue}  subTitleValue - ${subTitleValue}`)
  // console.log(props.params);
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
    props.close(btnIndex, selecteds);
    props.close(btnIndex, "");
  }
  // 打印绑定了哪些用户
  selecteds.forEach((a: { name: string; }) => {
    console.log("绑定name~"+a.name);
  });
  //   取消所有选中(恢复默认状态)
  listValue.value.forEach(a => {
    (a as Item)['selectedState'] = 0
  });
  listValue.value = []
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

/** 绑定- 点击
 *
 *  作者：小青龙
 *  时间：2023/05/05 17:20:24
 */
const bindAction = ()=> {
  // console.log("")
  alert("绑定事件还没写！");
};
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

.listDiv {
  margin-left: 10px;
  margin-right: 10px;
}
/* 复选框样式 */
.listDiv .checkBox {
  float: right;
}
</style>

