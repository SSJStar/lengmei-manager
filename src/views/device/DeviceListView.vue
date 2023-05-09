<template>
  <div class="deviceListDiv">
    <!-- 数据列表 -->
    <el-table :data="tableData" class="listView">
      <!--  第一列  -->
      <el-table-column label="设备编号" >
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!--          <el-icon><timer /></el-icon>-->
            <span style="margin-left: 10px">{{ scope.row.device_id }}</span>
          </div>
        </template>
      </el-table-column>

      <!--  第二列  -->
      <el-table-column label="设备型号">
        <template #default="scope">
<!--          <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
<!--            <template #default>-->
<!--              <div>name: {{ scope.row.device_type }}</div>-->
<!--              <div>address: {{ scope.row.address }}</div>-->
<!--            </template>-->
<!--            <template #reference>-->
              <el-tag @click="handleDetail()">{{ scope.row.device_type }}</el-tag>
<!--            </template>-->
<!--          </el-popover>-->
        </template>
      </el-table-column>

      <!--  第三列  -->
      <el-table-column label="持有者">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.holder }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <span style="margin-left: 10px">{{ scope.row.holder }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <!--  第四列  -->
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

      <!--  第五列  -->
      <el-table-column label="设备状态">
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
import router from "@/router";
import {onMounted} from "vue"; //弹窗-子视图-绑定
import { getDeviceList } from "@/api/api.js" //请求
import { ref } from "vue";
interface User {
  device_id: string
  device_type: string
  address: string
  state: string
  holder: string, //持有者
}

// 数据源
// let tableData: User[] = [{},{}]
let tableData = ref([
  {
    device_id: '1',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "0",
    holder: "李强", //持有者
    users:[
      {
        user_id: "10001",
        name: "张三",
      },
      {
        user_id: "10001",
        name: "张小萌",
      },
    ]
  },
  {
    device_id: '2',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
    holder: "王羽", //持有者
    users:[
      {
        user_id: "10001",
        name: "李丹",
      },
      {
        user_id: "10001",
        name: "张大圣",
      },
      {
        user_id: "10001",
        name: "李修缘",
      },
    ]
  },
  {
    device_id: '3',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
    holder: "李林", //持有者
    users:[
      {
        user_id: "10001",
        name: "李月童",
      },
      {
        user_id: "10001",
        name: "吴三宝",
      },
      {
        user_id: "10001",
        name: "李道然",
      },
    ]
  },
  {
    device_id: '4',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "3",
    holder: "李秋生", //持有者
    users:[
      {
        user_id: "10001",
        name: "张胜意",
      },
      {
        user_id: "10001",
        name: "吴秋风",
      },
      {
        user_id: "10001",
        name: "李寒月",
      },
    ]
  },
  {
    device_id: '5',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
    holder: "王萌", //持有者
    users:[],
  },
  {
    device_id: '6',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
    holder: "张豪", //持有者
    users:[],
  },
  {
    device_id: '7',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "0",
    holder: "李雪娜", //持有者
    users:[],
  },
  {
    device_id: '8',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
    holder: "赵岑", //持有者
    users:[],
  },
  {
    device_id: '9',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
    holder: "孙建", //持有者
    users:[],
  },
  {
    device_id: '10',
    device_type: 'zw1001',
    address: 'No. 189, Grove St, Los Angeles',
    state: "3",
    holder: "李秋风", //持有者
    users:[],
  },
  {
    device_id: '11',
    device_type: 'zw2105',
    address: 'No. 189, Grove St, Los Angeles',
    state: "1",
    holder: "林奇", //持有者
    users:[],
  },
  {
    device_id: '12',
    device_type: 'zw1516',
    address: 'No. 189, Grove St, Los Angeles',
    state: "2",
    holder: "张圣儒", //持有者
    users:[],
  },
])

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
  let users = [
    {
      user_id: "10001",
      name: "张三",
    },
    {
      user_id: "10001",
      name: "张小萌",
    },
  ];
  let vars = {
    component:BindView,
    title:"绑定使用者",
    subTitle:"",
    list: users,
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
  let vars = {
    component: BindView,
    title: "解绑使用者",
    subTitle: "",
    list: tableData.value[index].users,
  }
  ssjTip(vars).then((msg)=>{
    console.log("ssjTip---->"+msg);
  })
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
    console.log("ssjTip-- id -->"+msg);
    const device_id = msg as string;
    if (device_id.length == 0){
      return;
    }
    let alertMsg = ""
    if (msg == "000") {
      alertMsg = "该设备号（000）不存在";
    }else {
      alertMsg = "设备添加成功"
      let obj = {
        device_id: device_id,
        device_type: 'zw1001',
        address: 'No. 189, Grove St, Los Angeles',
        state: "0",
        holder: "李小强", //持有者
        users:[],
      }
      if (device_id.length > 0){
        tableData.value.push(obj);
        console.log("添加成功！tableData---->"+tableData);
      }
    }
    // alertMsg有内容说明点击的不是"取消"按钮
    setTimeout(()=>{
      alert(alertMsg);
    },1000)
  })
}

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

// 页面加载
onMounted(()=>{
  getDeviceList({
    user_id: 10000014
  }).then((res) => {
    console.log("请求结束了\\n");
    console.log(res);
    if (res["code"] && res["code"] === "0") {
      // 登录成功
      alert("请求成功");
      // json字符串 -> map
      let userJson = JSON.parse(res["body"]);
      // 取出用户名
      let device_id = userJson["device_id"]; //设备编号
      let device_type = userJson["device_type"]; //设备型号;
    }
  })
});
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
  /*background-color: #42b983;*/
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