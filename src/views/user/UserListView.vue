<template>
  <div class="deviceListDiv">
    <el-table :data="tableData.slice((currentPage-1) * pageSize,currentPage *pageSize)" style="width: 100%">
    <el-table-column prop="nick_name" label="用户名" width="180" >
      <template #default="scope">
        <span size="small" @click="handleDetail(scope.$index, scope.row)"
        >{{scope.row.nick_name}}</span
        >
      </template>
    </el-table-column>
    <el-table-column prop="user_name" label="账号" width="180" >
      <template #default="scope">
        <span size="small" @click="handleDetail(scope.$index, scope.row)"
        >{{scope.row.user_name}}</span
        >
      </template>
    </el-table-column>
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
    <div class="addUserDiv">
      <button @click="addUser">添加用户</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import BindView from "@/views/device/BindSelectedView.vue";
import {ssjTip} from "@/components/servicedialog/ssj-dialog";
import { ref } from "vue";
import { ssjAlert } from "@/components/servicedialog/ssj-dialog";
import Tip from "@/components/servicedialog/ssj-dialog-child.vue";
import AddUser from "@/views/user/AddUserView.vue";
let currentPage = ref(1); // 当前页
let pageSize = 4; //一页显示多少条
let paperCount = 3; //第几页时开始显示省略号（比如共50页，第7页就显示省略号）
// 数据源
let tableData = ref([
  {
    user_id:"10001",
    nick_name: '张三',
    user_name: "ad123",
    phone: '15167683359',
    address: 'No. 189, Grove St, Los Angeles',
    devices: [{
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
  },
  {
    user_id: '10008',
    nick_name: 'Tom',
    user_name: "bb333",
    phone: '13866382257',
    address: 'No. 189, Grove St, Los Angeles',
    devices: [{
      index: 1,
      name: "zw201",
    },
      {
        index: 2,
        name: "zq207",
      },
      {
        index: 3,
        name: "zr109",
      },
    ]
  },
  {
    user_id: '10016',
    nick_name: 'Jack',
    user_name: "ad123",
    phone: '18058362730',
    address: 'No. 189, Grove St, Los Angeles',
    devices: [{
      index: 1,
      name: "zw102",
    },
      {
        index: 2,
        name: "zq003",
      },
      {
        index: 3,
        name: "zr208",
      },
    ]
  },
  {
    user_id: '10025',
    nick_name: '乔布撕',
    user_name: "aj668",
    phone: '13397975566',
    address: 'No. 189, Grove St, Los Angeles',
    devices: [{
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
  },
  {
    user_id: '10025',
    nick_name: '武大郎',
    user_name: "dw668",
    phone: '13397975566',
    address: 'No. 189, Grove St, Los Angeles',
    devices: [{
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
  },
]);

/** 查看用户详情
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:15:18
 */
const handleDetail = (index: number, row: object) => {
  console.log(`handleDetail~x->${index} y->${row}`);
  router.push("/layoutView/userDetailView")
};

/** 删除这条用户信息
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:15:18
 */
const handleDelete = (index: number, row: object) => {
  console.log("handleDelete~");
  let nickName = tableData.value[index].nick_name;
  let vars = {
    component:BindView,
    title:"温馨提醒",
    subTitle:`一旦删除，用户数据将不可恢复，确定删除${nickName}吗？`
  }
  ssjAlert(vars).then((val)=>{
    console.log('弹窗返回数据---'+val);
    if (val == "1") {
      tableData.value.splice(index, 1);
    }
  });
};

/** 绑定
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:16:08
 */
const handleBind = (index: number, row: object) => {
  console.log("绑定 - "+ index, row)
  console.log("addDecice");
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

/** 解绑
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:18:26
 */
const handleUnBind = (index: number, row: object) => {
  console.log("解绑 - "+ index, row)
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

/** 添加用户 - 点击
 *
 *  作者：小青龙
 *  时间：2023/05/05 15:06:11
 */
const addUser = () => {
  console.log("addUser");
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
    console.log(`手机号->${json["phone"]}`);
    console.log(`昵称->${json["nick_name"]}`);
    console.log(`单位->${json["company"]}`);
  })
}

/** 翻页 - 事件
 *
 *  作者：小青龙
 *  时间：2023/05/11 11:11:44
 */
const handelPageChange = (val: number) =>{
  console.log("当前页1---" + currentPage.value);
  console.log("当前页2---" + val);
  currentPage.value = val;
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
</style>