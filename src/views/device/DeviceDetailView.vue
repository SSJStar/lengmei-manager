<template>
<div class="DeviceDetailDiv">
  <div class="body">
    <div class="itemDiv">
      <button class="backBtn" @click="handelBack()">{{"< 返  回"}}</button>
    </div>
    <label class="title-one">【基本信息】</label>
    <!-- 设备ID -->
    <div class="itemDiv">
      <label class="title-two">设备ID：</label><label>xx</label>
    </div>
    <!-- 设备型号 -->
    <div class="itemDiv">
      <label class="title-two">设备型号：</label><label>xx</label>
    </div>
    <!-- 生产日期 -->
    <div class="itemDiv">
      <label class="title-two">生产日期：</label><label>xx</label>
    </div>
    <!-- 使用者 -->
    <div class="itemDiv">
      <label class="title-two">使用者：</label><label>张三、李四、王五</label>
    </div>

    <!-- 【故障】 -->
    <label class="title-one">【故障】</label>
    <!-- 使用日期 -->
    <div class="itemDiv">
      <label class="title-two">故障代码：</label><label>e1</label>
    </div>

    <!-- 【运行状态】 -->
    <label class="title-one">【运行状态】</label>
    <!-- 冷媒重量 -->
    <div class="itemDiv">
      <label class="title-two">冷媒重量：</label><label>xx</label>
    </div>
    <!-- 管道温度 -->
    <div class="itemDiv">
      <label class="title-two">管道温度：</label><label>xx</label>
    </div>
    <!-- 真空表 -->
    <div class="itemDiv">
      <label class="title-two">真空表：</label><label>xx</label>
    </div>
    <!-- 管压表 -->
    <div class="itemDiv">
      <label class="title-two">管压表：</label><label>xx</label>
    </div>
    <!-- 液管追加 -->
    <div class="itemDiv">
      <label class="title-two">液管追加：</label><label>xx</label>
    </div>
    <!-- 再热管追加 -->
    <div class="itemDiv">
      <label class="title-two">再热管追加：</label><label>xx</label>
    </div>
    <!-- 内机追加 -->
    <div class="itemDiv">
      <label class="title-two">内机追加：</label><label>xx</label>
    </div>
    <!-- 外机追加 -->
    <div class="itemDiv">
      <label class="title-two">外机追加：</label><label>xx</label>
    </div>
    <!-- 总追加 -->
    <div class="itemDiv">
      <label class="title-two">总追加：</label><label>xx</label>
    </div>

    <!-- 【使用记录】 -->
    <label class="title-one">【使用记录】</label>
    <!-- 列表 -->
      <el-table :data="userHistoryList" class="listView">
        <el-table-column label="昵称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 手机号 -->
        <el-table-column label="手机号">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>name: {{ scope.row.phone }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <!-- 使用时间 -->
        <el-table-column label="使用记录">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    <!--  间隔  -->
    <!--    <div style="width: 100%; height: 800px; background-color: #42b983;margin-top: 0px">123456</div>-->
  </div>
</div>
</template>

<script lang="ts" setup>
import { staticVars } from "@/statics/global";
import router from "@/router";
// 设置导航栏高度
const navgation_height = staticVars.NAVGATION_HEIGHT;
let jsonData = {
  device_id:'1',
  device_type:'SDA-10001',
  create_date:"2021-03-09",
}

let userHistoryList = [
  {
    name:'王晓东',
    phone:'15167178859',
    date:'2023-04-26',
  },
  {
    name:'许茹萍',
    phone:'13386887795',
    date:'2023-04-09',
  },
  {
    name:'李大军',
    phone:'15567875593',
    date:'2023-03-25',
  },
  {
    name:'王晓东',
    phone:'15167178859',
    date:'2023-04-26',
  },
  {
    name:'许茹萍',
    phone:'13386887795',
    date:'2023-04-09',
  },
  {
    name:'李大军1',
    phone:'15567875593',
    date:'2023-03-25',
  }
];

const handelBack = ()=> {
  //返回上一页
  router.go(-1);
};
</script>

<style scoped>
.DeviceDetailDiv {
  width: 100%;
  height: 100%;
  /*height: calc(100% - v-bind(navgation_height));*/
  /*position: absolute;*/
  overflow-y: scroll;
}
.DeviceDetailDiv .body {
  display: flex;
  flex-direction: column;
  /*padding-bottom: 20px;*/
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
  /*background-color: #666666;*/
}
.backBtn {
  float: left;
  /*margin-top: 15px;*/
  border-radius: 6px;
  font-size: 16px;
  /*background-color: #42b983;*/
  border: none;
}
.itemDiv {
  width: 100%;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*margin-left: 20px;*/
  margin-top: 10px;
}
.DeviceDetailDiv label {
  float: left;
}

.title-one {
  text-align: left;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 6px;
  background-color: #e8e8e8;
}
.title-two {
  /*background-color: #42b983;*/
  float: left;
}

.listView {
  width: 100%;
  height: 200px;
}

</style>