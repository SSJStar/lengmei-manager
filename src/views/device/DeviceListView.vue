<template>
  <div class="deviceListDiv">
    <!-- 数据列表 -->
    <el-table :data="tableData" class="listView">
      <!--  第一列  -->
      <el-table-column label="设备编号" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!--          <el-icon><timer /></el-icon>-->
            <span style="margin-left: 10px">{{ scope.row.device_id }}</span>
          </div>
        </template>
      </el-table-column>

      <!--  第二列  -->
      <el-table-column label="设备型号" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.device_type }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag @click="handleDetail()">{{ scope.row.device_type }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <!--  第三列  -->
      <el-table-column label="绑定/解绑">
        <template #default="scope">
          <el-button size="small" @click="handleBind(scope.$index, scope.row)"
          >绑定使用者</el-button
          >
          <el-button
              size="small"
              @click="handleUnBind(scope.$index, scope.row)"
          >解绑使用者</el-button
          >
        </template>
      </el-table-column>

      <!--  第四列  -->
      <el-table-column label="设备状态" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ getState(scope.row.state) }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加设备 -->
    <div class="addDivceDiv">
      <button @click="addDecice">添加设备</button>
    </div>
<!--    <button :click="addDecice" style="background-color: #42b983; top: 80px">添加设备</button>-->
  </div>
</template>

<script lang="ts" setup>
import {Burger, Timer} from '@element-plus/icons-vue'
import {ssjTip} from "@/components/servicedialog/ssj-dialog";
import Tip from "@/components/servicedialog/ssj-dialog-child.vue"; //弹窗-子视图
import BindView from "@/views/device/BindSelectedView.vue";
import router from "@/router"; //弹窗-子视图-绑定
interface User {
  device_id: string
  device_type: string
  address: string
  state: string
}

/** 查看设备详情
 *
 *  作者：小青龙
 *  时间：2023/05/06 16:05:48
 */
const handleDetail = () => {
  console.log("handleDetail~");
router.push("/layoutView/deviceDetailView")
};

/** 绑定
 *
 *  作者：小青龙
 *  时间：2023/05/06 10:09:00
 */
const handleBind = (index: number, row: User) => {
  console.log("绑定 - "+ index, row)
  console.log("addDecice");
  let vars = {
    component:BindView,
    title:"添加设备",
    subTitle:"输入设备编号"
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip---->"+msg);
  })
}

/** 解绑
 *
 *  作者：小青龙
 *  时间：2023/05/06 10:09:23
 */
const handleUnBind = (index: number, row: User) => {
  console.log("解绑 - "+ index, row)
}

/** 添加设备 - 点击
 *
 *  作者：小青龙
 *  时间：2023/05/05 15:06:11
 */
const addDecice = () => {
  console.log("addDecice");
  let vars = {
    component:Tip,
    title:"添加设备",
    subTitle:"输入设备编号"
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip---->"+msg);
  })
}

// 数据源
const tableData: User[] = [
  {
    device_id: '1',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "0",
  },
  {
    device_id: '2',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
  },
  {
    device_id: '3',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
  },
  {
    device_id: '4',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "3",
  },
  {
    device_id: '5',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
  },
  {
    device_id: '6',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
  },
  {
    device_id: '7',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "0",
  },
  {
    device_id: '8',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
  },
  {
    device_id: '9',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
  },
  {
    device_id: '10',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "3",
  },
  {
    device_id: '11',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
  },
  {
    device_id: '12',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
  },
]

// 数字转文字描述
const  getState = (type: string) => {
  switch (Number(type)) {
    case 0: {
      return "关闭";
    } break;
    case 1: {
      return "开启";
    } break;
    case 2: {
      return "暂停";
    } break;
    case 3: {
      return "运行";
    } break;
  }
  console.log(type + " 未知")
  return "未知";
}
</script>

<style>
.deviceListDiv {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
  /*display: flex;*/
}
.listView {
  width: 100%;
  height: 400px;
  background-color: #42b983;
}

/* 添加设备 */
.addDivceDiv {
  width: 100%;
  display: flow;
}
.addDivceDiv button {
  background-color: #42b983;
  float: left;
  margin-top: 20px;
  font-size: 18px;
  border-radius: 6px;
  /*box-shadow: none;*/
  border: none;/* 去掉阴影 */
}
</style>