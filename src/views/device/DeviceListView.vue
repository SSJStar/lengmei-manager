<template>
  <div class="deviceListDiv">

    <!--  搜索  -->
    <div disabled="flex">
      <el-input
          v-model="keyWords"
          class="searchInput"
          placeholder="可查询设备型号"
          :prefix-icon="Search"
          clearable
          @clear="handelClear"
          @input="inputChange"
      />
      <button style="margin-left: 10px;height:28px" @click="handleCheck">查询</button>
    </div>

    <!-- 数据列表 -->
    <el-table :data="tableData.slice((currentPage-1) * pageSize,currentPage *pageSize)" class="listView">
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
<!--              <el-tag @click="handleDetail()">{{ scope.row.device_type }}</el-tag>-->
<!--            </template>-->
<!--          </el-popover>-->
<!--          <el-tag @click="handleDetail()">{{ scope.row.device_type }}</el-tag>-->
          <RickColorLabel :refresh-count="pageTurningRefresh" :text="scope.row.device_type" :replace-text="replaceText" replace-color="#90EE90" size="small" @click="handleDetail(scope.$index, scope.row)"></RickColorLabel>
        </template>
      </el-table-column>

      <!--  第三列  -->
      <el-table-column label="持有者">
        <template #default="scope">
<!--          <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
<!--            &lt;!&ndash;    鼠标放到这个字段，将会显示的内容        &ndash;&gt;-->
<!--            <template #default>-->
<!--              <div>name: {{ scope.row.holder }}</div>-->
<!--              <div>address: {{ scope.row.address }}</div>-->
<!--            </template>-->
<!--            <template #reference>-->
<!--              <span style="margin-left: 10px">{{ scope.row.holder }}</span>-->
<!--            </template>-->
<!--          </el-popover>-->
          <span style="margin-left: 10px">{{ scope.row.holder }}</span>
        </template>
      </el-table-column>

      <!--  第四列  -->
      <el-table-column label="绑定/解绑" width="300px">
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
      <el-table-column label="设备状态" align="center" >
        <template #default="scope">
<!--          <div style="display: flex; align-items: center;">-->
          <div>
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px;">{{ getState(scope.row.state) }}</span>
          </div>
        </template>
      </el-table-column>

      <!--  第六列  -->
      <el-table-column label="删除" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleDelete(scope.$index, scope.row)"
          >X</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="tableData.length"
        v-model="currentPage"
        @current-change ="handelPageChange"
        style="float: right"
    />
    <!-- 添加设备 -->
    <div class="addDivceDiv" v-show="isShowAddDeviceDiv">
      <button @click="addDecice">添加设备</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {Burger, Timer} from '@element-plus/icons-vue'
import {ssjAlert, ssjTip} from "@/components/servicedialog/ssj-dialog";
import Tip from "@/components/servicedialog/ssj-dialog-child.vue"; //弹窗-子视图
import BindView from "@/views/device/BindSelectedView.vue";
import router from "@/router";
import {onMounted} from "vue"; //弹窗-子视图-绑定
import { getDeviceList } from "@/api/api.js" //请求
import { deviceListData } from "@/views/device/deviceListData";
import { Search } from "@element-plus/icons-vue"; //搜索图标
import { fuzzySearch } from "@/statics/ssj-method-extension"; //模糊搜索
import RickColorLabel from "@/components/RickColorLabel.vue";
import {userListData} from "@/views/user/userListData"; //高亮组件
interface User {
  device_id: string
  device_type: string
  address: string
  state: string
  holder: string, //持有者
}

// TODO: 配置
let currentPage = ref(1); // 当前页
let pageSize = 10; //一页显示多少条

// TODO：从配置文件读取假数据
// let dataSoure:any = ref(deviceListData);
// //dd唯一的作用就是给tableData初始化内容，如果直接用userListData来初始化，会导致dataSoure的值受到tableData值的影响
// let dd = deviceListData;
//
// // 列表展示数据源（包括查询结果的展示、非查询状态下数据的展示）
// let tableData:any = ref(dd);

// 数据源
let dataSoure:any = ref([]);

//dd唯一的作用，就是给tableData初始化内容，如果直接用userListData来初始化，会导致dataSoure的值受到tableData值的影响
let dd:any = [];

// 列表展示的数据源（包括查询结果的展示、非查询状态下数据的展示）
let tableData:any = ref([]);

onMounted(()=>{
  console.log("onMounted---");
  // TODO：从配置文件读取假数据
  dataSoure.value = deviceListData;

//dd唯一的作用，就是给tableData初始化内容，如果直接用userListData来初始化，会导致dataSoure的值受到tableData值的影响
  dd = deviceListData;

// 列表展示数据源（包括查询结果的展示、非查询状态下数据的展示）
  tableData.value = dd;
})


// v-model：搜索关键词
let keyWords = ref("");

// 是否展示"添加用户" ，搜索状态下需要隐藏此按钮
let isShowAddDeviceDiv = ref(true);

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
 * 查看设备详情
 *
 *  作者：小青龙
 *  时间：2023/05/06 16:05:48
 */
const handleDetail = (index: number, row: object) => {
  console.log(`handleDetail~x->${index} y->${row}`);
  router.push("/layoutView/deviceDetailView")
};

/**
 * 绑定
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

/**
 * 解绑
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

/**
 * 添加设备 - 点击
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
        dataSoure.value.push(obj);
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

/**
 * 翻页 - 事件
 *
 *  作者：小青龙
 *  时间：2023/05/11 11:11:44
 */
const handelPageChange = (val: number) =>{
  console.log("当前页1---" + currentPage.value);
  console.log("当前页2---" + val);
  currentPage.value = val;
  replaceText.value = keyWords.value;
  setTimeout(()=>{
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
  // 隐藏"添加设备"
  isShowAddDeviceDiv.value = false;

  // 模糊搜索
  fuzzySearch(dataSoure.value,keyWords.value,"device_type").then((res)=>{
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
  // 隐藏"添加设备"
  isShowAddDeviceDiv.value = true;
};

/**
 * 删除这条设备
 *
 *  作者：小青龙
 *  时间：2023/05/08 15:15:18
 */
const handleDelete = (index: number, row: object) => {
  console.log("handleDelete~当前页："+currentPage.value);
  const current_index = (currentPage.value - 1)*pageSize + index; //由于分页显示，这里的下标并非数据源里的下标
  console.log(`currentPage->${currentPage.value} index->${index}  current_index->${current_index}`,);
  let nickName = tableData.value[current_index].device_type;
  let vars = {
    component:BindView,
    title:"温馨提醒",
    subTitle:`一旦删除，设备数据将不可恢复，确定删除${nickName}吗？`
  }
  ssjAlert(vars).then((val)=>{
    console.log('弹窗返回数据---'+val);
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

// TODO: 页面加载
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

      let device_id = userJson["device_id"]; //设备编号
      let device_type = userJson["device_type"]; //设备型号;
      alert(`设备编号:${device_id} 设备型号:${device_type}`);
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

/* 搜索 - 输入框 */
.searchInput {
  width: calc(80% - 50px);
}

/* 列表 */
.listView {
  width: 100%;
  /*height: 400px;*/
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