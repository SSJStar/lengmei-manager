<template>
  <div class="UserDetailDiv">
    <div class="body">
      <div class="itemDiv">
        <button class="backBtn" @click="handelBack()">{{"< 返  回"}}</button>
      </div>
      <label class="title-one">【基本信息】</label>
      <!-- 用户ID -->
      <div class="itemDiv">
        <label class="title-two">ID：</label>
        <label class="title-three">{{ jsonData.user_id }}</label>
      </div>
      <!-- 姓名 -->
      <div class="itemDiv">
        <label class="title-two">姓名：</label>
        <label class="title-three">{{ jsonData.nick_name }}</label>
      </div>
      <!-- 性别 -->
      <div class="itemDiv">
        <label class="title-two">性别：</label>
        <label class="title-three">{{ jsonData.sex }}</label>
      </div>
      <!-- 手机号 -->
      <div class="itemDiv">
        <label class="title-two">手机号：</label>
        <label class="title-three">{{ jsonData.phone }}</label>
      </div>
      <!-- 工作单位/公司 -->
      <div class="itemDiv">
        <label class="title-two" style="white-space: pre-wrap;">{{"工作单位  "+"\n"+"/公司："}}</label>
<!--        <label class="title-two">工作单位/公司</label>-->
        <label class="title-three">{{ jsonData.company }}</label>
      </div>

      <!-- 【绑定的设备】 -->
      <label class="title-one">【绑定的设备】</label>
      <!-- 列表 -->
      <el-table :data="jsonData.deviceList" class="listView">
        <el-table-column label="设备ID">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.device_id }}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 设备型号 -->
        <el-table-column label="设备型号">
          <template #default="scope">
<!--            <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
              <!--  鼠标放置上面时，现实的内容    -->
<!--              <template #default>-->
<!--                <div>name: {{ scope.row.device_type }}</div>-->
<!--                <div>address: {{ scope.row.device_id }}</div>-->
<!--              </template>-->
              <!--  字段显示的内容    -->
<!--              <template #reference>-->
                <span>{{ scope.row.device_type }}</span>
<!--              </template>-->
<!--            </el-popover>-->
          </template>
        </el-table-column>

        <!-- 设备状态 -->
        <el-table-column label="拥有者">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.holder }}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 设备状态 -->
        <el-table-column label="设备状态">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="margin-left: 10px">{{ getState(scope.row.state) }}</span>
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
import router from "@/router";
import { ref } from "vue";

let jsonData = ref({
  user_id:'10001',
  nick_name:'张恒胜',
  sex:"男",
  phone:"15167671859",
  company:"浙江xx空调有限公司",
  deviceList: [
    {
      device_id: '1',
      device_type: 'zw1001',
      address: 'No. 189, Grove St, Los Angeles',
      state: "0",
      holder: "李强", //持有者
    },
    {
      device_id: '2',
      device_type: 'zw2105',
      address: 'No. 189, Grove St, Los Angeles',
      state: "1",
      holder: "王羽", //持有者
    },
    {
      device_id: '3',
      device_type: 'zw1516',
      address: 'No. 189, Grove St, Los Angeles',
      state: "2",
      holder: "李林", //持有者
    },
    {
      device_id: '4',
      device_type: 'zw1001',
      address: 'No. 189, Grove St, Los Angeles',
      state: "3",
      holder: "李秋生", //持有者
    },
    {
      device_id: '5',
      device_type: 'zw2105',
      address: 'No. 189, Grove St, Los Angeles',
      state: "1",
      holder: "王萌", //持有者
    },
    {
      device_id: '6',
      device_type: 'zw1516',
      address: 'No. 189, Grove St, Los Angeles',
      state: "2",
      holder: "张豪", //持有者
    }
  ]
});

const handelBack = ()=> {
  //返回上一页
  router.go(-1);
};

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

<style scoped>
.UserDetailDiv {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.UserDetailDiv .body {
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
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
  width: 80px;
  text-align: right;
  float: left;
}
.title-three {
  margin-left: 5px;
}

.itemDiv label {
  float: left;
}
.listView {
  width: 100%;
  height: 200px;
}

</style>