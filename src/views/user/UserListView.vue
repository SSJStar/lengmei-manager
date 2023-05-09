<template>
  <el-table :data="tableData" style="width: 100%">
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
    <el-table-column label="删除">
      <template #default="scope">
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)"
        >X</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import router from "@/router";
import BindView from "@/views/device/BindSelectedView.vue";
import {ssjTip} from "@/components/servicedialog/ssj-dialog";
import { ref } from "vue";
import { ssjAlert } from "@/components/servicedialog/ssj-dialog";

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
  let vars = {
    component:BindView,
    title:"温馨提醒",
    subTitle:"一旦删除，用户数据将不可恢复，确定删除吗？"
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
</script>

<style scoped>

</style>