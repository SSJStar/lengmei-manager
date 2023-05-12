<template>
<div class="DeviceDetailDiv">
  <div class="body">
    <div class="itemDiv">
      <button class="backBtn" @click="handelBack()">{{"< 返  回"}}</button>
    </div>
    <label class="title-one">【基本信息】</label>
    <!-- 设备ID -->
    <div class="itemDiv">
      <label class="title-two">设备ID：</label><label>{{ jsonData.device_id }}</label>
    </div>
    <!-- 设备型号 -->
    <div class="itemDiv">
      <label class="title-two">设备型号：</label><label>{{ jsonData.device_type }}</label>
    </div>
    <!-- 生产日期 -->
    <div class="itemDiv">
      <label class="title-two">生产日期：</label><label>{{ jsonData.create_date }}</label>
    </div>
    <!-- 使用者 -->
    <div class="itemDiv">
      <label class="title-two">使用者：</label><label>{{ getDeviceUsers() }}</label>
    </div>

    <!-- 【故障】 -->
    <label class="title-one">【故障】</label>
    <!-- 故障代码 -->
    <div class="itemDiv">
      <label class="title-two">故障代码：</label><label>{{ jsonData.fault }}</label>
    </div>

    <!-- 【运行状态】 -->
    <label class="title-one">【运行状态】</label>
    <!-- 冷媒重量 -->
    <div class="itemDiv">
      <label class="title-two">冷媒重量：</label><label>{{ jsonData.re_weight }}</label>
    </div>
    <!-- 管道温度 -->
    <div class="itemDiv">
      <label class="title-two">管道温度：</label><label>{{ jsonData.pipe_temperature }}℃</label>
    </div>
    <!-- 真空表 -->
    <div class="itemDiv">
      <label class="title-two">真空表：</label><label>{{ jsonData.vacuum_meter }}</label>
    </div>
    <!-- 管压表 -->
    <div class="itemDiv">
      <label class="title-two">管压表：</label><label>{{ jsonData.pipe_pressure }}</label>
    </div>
    <!-- 液管追加 -->
    <div class="itemDiv">
      <label class="title-two">液管追加：</label><label>{{ jsonData.yeguanzhuij }}m</label>
    </div>
    <!-- 再热管追加 -->
    <div class="itemDiv">
      <label class="title-two">再热管追加：</label><label>{{ jsonData.zaireguanzhuij }}m</label>
    </div>
    <!-- 内机追加 -->
    <div class="itemDiv">
      <label class="title-two">内机追加：</label><label>{{ jsonData.three_pipe_fill }}KG</label>
    </div>
    <!-- 外机追加 -->
    <div class="itemDiv">
      <label class="title-two">外机追加：</label><label>{{ jsonData.external_machine_fill }}KG</label>
    </div>
    <!-- 总追加 -->
    <div class="itemDiv">
      <label class="title-two">总追加：</label><label>{{ jsonData.total_fill }}KG</label>
    </div>

    <!-- 【绑定了哪些使用者】 -->
<!--    <label class="title-one">【使用者】</label>-->
<!--    &lt;!&ndash; 列表 &ndash;&gt;-->
<!--    <div>-->
<!--      <el-table :data="jsonData.userList" class="listView">-->
<!--        <el-table-column label="昵称">-->
<!--          <template #default="scope">-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <span>{{ scope.row.nick_name }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--        &lt;!&ndash; 手机号 &ndash;&gt;-->
<!--        <el-table-column label="手机号">-->
<!--          <template #default="scope">-->
<!--            <span>{{ scope.row.phone }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->

    <!-- 【使用记录】 -->
    <label class="title-one">【使用记录】</label>
    <!-- 列表 -->
    <el-table :data="jsonData.useHistoryList" class="listView">
        <el-table-column label="昵称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.nick_name }}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 手机号 -->
        <el-table-column label="手机号">
          <template #default="scope">
<!--            <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
<!--              <template #default>-->
<!--                <div>name: {{ scope.row.phone }}</div>-->
<!--                <div>address: {{ scope.row.address }}</div>-->
<!--              </template>-->
<!--              <template #reference>-->
                <span>{{ scope.row.phone }}</span>
<!--              </template>-->
<!--            </el-popover>-->
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
  </div>
</div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";

//TODO 数据源
let jsonData = ref({
  device_id:'1',
  device_type:'SDA-10001',
  create_date:"2021-03-09",
  fault: "e1",// 故障代码
  re_weight: "",// 冷媒重量
  vacuum_meter: "",// 真空表
  pipe_temperature: "",// 管道温度
  pipe_pressure: "",// 管压表
  yeguanzhuij: "1.5",// 液管追加
  zaireguanzhuij: "2.5",// 再热管追加
  three_pipe_fill: "2",// 内机追加
  external_machine_fill: "3",// 外机追加
  total_fill: "",// 总追加
  userList: [
    {
      user_id: "10001",
      nick_name:'王晓东',
      phone:'15167178859',
    },
    {
      user_id: "10011",
      nick_name:'许茹萍',
      phone:'13386887795',
    },
    {
      user_id: "10009",
      nick_name:'李大军',
      phone:'15567875593',
    },
    {
      user_id: "10015",
      nick_name:'王晓东',
      phone:'15167178859',
    },
    {
      user_id: "10022",
      nick_name:'许茹萍',
      phone:'13386887795',
    },
    {
      user_id: "10023",
      nick_name:'李大军1',
      phone:'15567875593',
    }
  ],
  useHistoryList: [
    {
      nick_name:'王晓东',
      phone:'15167178859',
      date:'2023-04-26',
    },
    {
      nick_name:'许茹萍',
      phone:'13386887795',
      date:'2023-04-09',
    },
    {
      nick_name:'李大军',
      phone:'15567875593',
      date:'2023-03-25',
    },
    {
      nick_name:'王晓东',
      phone:'15167178859',
      date:'2023-04-06',
    },
    {
      nick_name:'许茹萍',
      phone:'13386887795',
      date:'2023-04-09',
    },
    {
      nick_name:'李大军1',
      phone:'15567875593',
      date:'2023-03-25',
    }
  ],
})

/** 获取当前设备的使用者（可能存在多人）
 *
 *  作者：小青龙
 *  时间：2023/05/09 16:58:14
 */
const getDeviceUsers = () => {
  let users:any = [];
  jsonData.value.userList.forEach((item)=>{
    users.push(item.nick_name);
  });
  return users.join("，");
};

/** 返回上一夜
 *
 *  作者：小青龙
 *  时间：2023/05/12 14:42:18
 */
const handelBack = ()=> {
  router.go(-1); //返回上一页
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
  float: left;
}

.listView {
  width: 100%;
  height: 200px;
}

</style>