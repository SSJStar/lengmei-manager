<template>
  <div class="deviceListDiv">
    <!--  搜索  -->
    <div disabled="flex">
      <el-input
          v-model="keyWords"
          class="searchInput"
          placeholder="可查询用户名称"
          :prefix-icon="Search"
          clearable
          @clear="handelClear"
          @input="inputChange"
      />
      <button style="margin-left: 10px;height:28px" @click="handleCheck">查询</button>
    </div>

    <!--  列表  -->
    <el-table :data="tableData.slice((currentPage-1) * pageSize,currentPage *pageSize)" style="width: 100%">
      <!--  第一列  -->
    <el-table-column prop="nick_name" label="用户名" width="180" >
      <template #default="scope">
<!--        <span size="small" @click="handleDetail(scope.$index, scope.row)"-->
<!--        >{{scope.row.nick_name}}</span-->
<!--        >-->
        <RickColorLabel :refresh-count="pageTurningRefresh" :text="scope.row.nick_name" :replace-text="replaceText"
                        replace-color="#90EE90" size="small" @click="handleDetail(scope.$index, scope.row)">
        </RickColorLabel>
      </template>
    </el-table-column>

    <!--  第二列  -->
    <el-table-column prop="user_name" label="账号" width="180" >
      <template #default="scope">
        <span size="small" @click="handleDetail(scope.$index, scope.row)"
        >{{scope.row.user_name}}</span
        >
      </template>
    </el-table-column>

    <!--  第三列  -->
    <el-table-column prop="phone" label="手机号" />

    <!--  第四列  -->
    <el-table-column label="绑定/解绑">
      <template #default="scope">
        <el-button size="small" @click="handleBind(scope.$index, scope.row)"
        >绑定设备</el-button
        >
        <el-button
            size="small"
            @click="handleUnBind(scope.$index, scope.row)"
        >解绑设备</el-button
        >
      </template>
    </el-table-column>

    <!--  第五列  -->
    <el-table-column label="删除" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)"
        >X</el-button
        >
      </template>
    </el-table-column>
  </el-table>

    <!-- 分页 -->
    <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="tableData.length"
        v-model="currentPage"
        @current-change ="handelPageChange"
        style="float: right"
    />
    <!-- 添加用户 -->
    <div class="addUserDiv" v-show="isShowAddUserDiv">
      <button @click="addUser">添加用户</button>
    </div>
<!--    <RickColorLabel text="太阳当空照" replace-text="空" replace-color="#8B4513"></RickColorLabel>-->
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import BindView from "@/views/device/BindSelectedView.vue";
import { ssjTip } from "@/components/servicedialog/ssj-dialog";
import { ref } from "vue";
import { ssjAlert } from "@/components/servicedialog/ssj-dialog";
import AddUser from "@/views/user/AddUserView.vue";
import { userListData } from "@/views/user/userListData";
import { Search } from "@element-plus/icons-vue";
import { fuzzySearch } from "@/statics/ssj-method-extension";
import RickColorLabel from "@/components/RickColorLabel.vue"; //模糊搜索

// TODO：配置
let currentPage = ref(1); // 当前页

let pageSize = 10; //一页显示多少条

// TODO：从配置文件读取假数据
let dataSoure:any = ref(userListData);

//dd唯一的作用就是给tableData初始化内容，如果直接用userListData来初始化，会导致dataSoure的值受到tableData值的影响
let dd = userListData;

// 列表展示数据源（包括查询结果的展示、非查询状态下数据的展示）
let tableData:any = ref(dd);

// v-model：搜索关键词
let keyWords = ref("");

// 是否展示"添加用户" ，搜索状态下需要隐藏此按钮
let isShowAddUserDiv = ref(true);
/**
 * TODO:为什么要用两个变量控制组件的刷新（replaceText、pageTurningRefresh）
 * 因为：
 *    对于组件RickColorLabel来说，replace-text和refresh-count的变化都会刷新组件。当搜索框内容不变（replace-text不变），然后来回翻页的时候，
 * 就需要通过改变refresh-count来达到刷新组件的效果
 * */

// 传给RichColorLabel的高亮内容，点击查询按钮，会把keyWords赋值给replaceText，
// replaceText内容发生变化，richcolorlabel组件就会自动刷新
let replaceText = ref("");

// 控制richColorLabel刷新
let pageTurningRefresh = ref(0);

/**
 * 查看用户详情
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:15:18
 */
const handleDetail = (index: number, row: object) => {
  // console.log(`handleDetail~x->${index} y->${row}`);
  router.push("/layoutView/userDetailView")
};

/**
 * 删除这条用户信息
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:15:18
 */
const handleDelete = (index: number, row: object) => {
  // console.log("handleDelete~当前页："+currentPage.value);
  const current_index = (currentPage.value - 1)*pageSize + index; //由于分页显示，这里的下标并非数据源里的下标
  // console.log(`currentPage->${currentPage.value} index->${index}  current_index->${current_index}`,);
  let nickName = tableData.value[current_index].nick_name;
  let vars = {
    component:BindView,
    title:"温馨提醒",
    subTitle:`一旦删除，用户数据将不可恢复，确定删除${nickName}吗？`
  }
  ssjAlert(vars).then((val)=>{
    // console.log('弹窗返回数据---'+val);
    if (val == "1") {
      // current仅代表查询结果里的顺序，dataSoure要删除这条内容的话，需要先找到这条数据在dataSoure里真正的索引位置
      dataSoure.value.forEach((item,aindex)=>{
        if (item.user_id === tableData.value[current_index].user_id){
          // console.log("找到在dataSour的位置："+aindex + "   a:"+item.user_id+" b:"+tableData.value[current_index].user_id);
          dataSoure.value.splice(aindex, 1);
        }
      });
      tableData.value.splice(current_index, 1);
    }
  });
};

/**
 * 绑定
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:16:08
 */
const handleBind = (index: number, row: object) => {
  // console.log("绑定 - "+ index, row)
  // console.log("addDecice");
  let vars = {
    component:BindView,
    title:"绑定设备",
    subTitle:"",
    list: [{
        index: 1,
        name: "zw101",
      },
      {
        index: 2,
        name: "zq007",
      },
      {
        index: 3,
        name: "zr209",
      },
    ]
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip---->"+msg);
  })
}

/**
 * 解绑
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:18:26
 */
const handleUnBind = (index: number, row: object) => {
  // console.log("解绑 - "+ index, row)
  let vars = {
    component: BindView,
    title: "解绑设备",
    subTitle: "",
    list: tableData.value[index].devices,
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip---->"+msg);
  })
}

/**
 * 添加用户 - 点击
 *
 *  作者：小青龙
 *  时间：2023/05/05 15:06:11
 */
const addUser = () => {
  // console.log("addUser");
  let vars = {
    component:AddUser,
    title:"添加用户",
    subTitle:"输入手机号"
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip-- id -->"+msg);
    // const device_id = msg as string;
    if (msg == null || (msg as JSON)["phone"].length == 0){
      return;
    }
    const json = msg as JSON;
    // console.log(`手机号->${json["phone"]}`);
    // console.log(`昵称->${json["nick_name"]}`);
    // console.log(`单位->${json["company"]}`);
    let user_add = {
      user_id: '10099',
          nick_name: json["nick_name"],
        user_name: "dw677",
        phone: json["phone"],
        company: json["company"],
        devices: []
    }
    tableData.value.push(user_add);
    dataSoure.value.push(user_add);
  })
}

/**
 * 翻页 - 事件
 *
 *  作者：小青龙
 *  时间：2023/05/11 11:11:44
 */
const handelPageChange = (val: number) =>{
  currentPage.value = val;
  // 这里需要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
  setTimeout(()=>{
    replaceText.value = keyWords.value;
    pageTurningRefresh.value ++;
  },20)
};

/**
 * 搜索框内容发生变化
 *
 *  作者：小青龙
 *  时间：2023/05/31 11:16:33
 *  说明：
 */
const inputChange = ()=>{
  // console.log("内容发生变化："+keyWords.value);
  // 内容发生变化，搜索框内容删除完的时候，也需要调用一次handelClear方法。
  if (keyWords.value.length === 0) {
    console.log("删完了？tableData: " + tableData.value.length);
    handelClear();
  }
}

/**
 * 查询
 *  作者：小青龙
 *  时间：2023/05/23 17:29:54
 *  说明：
 */
let handleCheck = ()=>{
  console.log("查询内容:" + keyWords.value);
  if (keyWords.value === "") {
    tableData.value = dataSoure.value;
    // 这里需要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
    setTimeout(()=>{
      replaceText.value = "";
    },20)
    return
  }
  // 隐藏"添加用户"按钮
  isShowAddUserDiv.value = false;

  // 模糊查询
  fuzzySearch(dataSoure.value,keyWords.value,"nick_name").then((res)=>{
    console.log("模糊查询结果："+JSON.stringify(res));
    tableData.value = res;
    //将搜索关键词keyWords赋值给replaceText，这样RichColorLabel就会刷新了
    // 这里需要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
    setTimeout(()=>{
      replaceText.value = keyWords.value;
    },20)
  });
};

/**
 * 一键清空 - 搜索内容
 *
 *  作者：小青龙
 *  时间：2023/05/24 10:54:31
 *  说明：点击输入框右边的"x"，清空搜索内容，并且恢复原列表数据
 */
let handelClear = ()=> {
  console.log("一键清空~")
  tableData.value = dataSoure.value;
  //将搜索关键词keyWords赋值给replaceText，这样RichColorLabel就会刷新了
  // 这里要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
  setTimeout(()=>{
    replaceText.value = "";
  },20)

  // 显示"添加用户"按钮
  isShowAddUserDiv.value = true;
};
</script>

<style scoped>
.deviceListDiv {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
  /*display: flex;*/
}

/* 添加用户 */
.addUserDiv {
  width: 100%;
  display: flow;
}
.addUserDiv button {
  background-color: #42b983;
  float: left;
  margin-top: 20px;
  font-size: 18px;
  border-radius: 6px;
  /*box-shadow: none;*/
  border: none;/* 去掉阴影 */
}
.searchInput {
  width: calc(80% - 50px);
}
</style>