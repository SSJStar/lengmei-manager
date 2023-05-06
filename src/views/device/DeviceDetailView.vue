<template>
<div class="DeviceDetailDiv">
  <div itemDiv>
    <button class="backBtn">返  回</button>
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
  <el-table :data="userHistoryList" class="listView">
    <el-table-column label="昵称" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

<!--    &lt;!&ndash; 手机号 &ndash;&gt;-->
<!--    <el-table-column label="手机号" width="180px">-->
<!--      <template #default="scope">-->
<!--        <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
<!--          <template #default>-->
<!--            <div>name: {{ scope.row.phone }}</div>-->
<!--            <div>address: {{ scope.row.address }}</div>-->
<!--          </template>-->
<!--          <template #reference>-->
<!--            <el-tag @click="handleDetail()">{{ scope.row.phone }}</el-tag>-->
<!--          </template>-->
<!--        </el-popover>-->
<!--      </template>-->
<!--    </el-table-column>-->

<!--    &lt;!&ndash; 使用时间 &ndash;&gt;-->
<!--    <el-table-column label="使用记录" width="180px">-->
<!--      <template #default="scope">-->
<!--        <div style="display: flex; align-items: center">-->
<!--          <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>

</div>
</template>

<script lang="ts" setup>
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
  }
];
</script>

<style scoped>
.DeviceDetailDiv {
  display: flex;
  flex-direction: column;
}
.backBtn {
  float: left;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 6px;
  font-size: 16px;
  /*background-color: #42b983;*/
  border: none;
}
.itemDiv {
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
}
.DeviceDetailDiv label {
  float: left;
}

.title-one {
  text-align: left;
  margin-top: 10px;
  background-color: #f8f8f8;
}
.title-two {
  /*background-color: #42b983;*/
  float: left;
}

.listView {
  width: 100%;
  height: 400px;
}

</style>