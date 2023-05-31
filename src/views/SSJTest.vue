<template>
  <div class="demoListDiv">
    <!--  搜索框  -->
    <div disabled="flex">
      <el-input
          v-model="keyWords"
          class="searchInput"
          placeholder="可查询用户名称"
          :prefix-icon="Search"
          clearable
          @clear="handelClear"
      />
      <button class="button-check" @click="handleCheck">查询</button>
    </div>

    <!--  列表  -->
    <el-table :data="tableData.slice((currentPage-1) * pageSize,currentPage *pageSize)" style="width: 100%">
      <!--  第一列  -->
      <el-table-column prop="nick_name" label="用户名" width="180" >
        <template #default="scope">
          <!--  自定义组件 - 高亮Label  -->
          <RickColorLabel :refresh-count="richLabelRefresh" :text="scope.row.nick_name" :replace-text="replaceText" replace-color="#90EE90" size="small" @click="handleDetail(scope.$index, scope.row)"></RickColorLabel>
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
  </div>
</template>

<script lang="ts" setup>
import BindView from "@/views/device/BindSelectedView.vue";
import { ref } from "vue";
import { ssjAlert } from "@/components/servicedialog/ssj-dialog";
import { listData } from "@/views/user/userListData";
import { Search } from "@element-plus/icons-vue";
import { fuzzySearch } from "@/statics/ssj-method-extension"; //模糊搜索
import RickColorLabel from "@/components/RickColorLabel.vue"; //高亮组件

// TODO：配置
let currentPage = ref(1); // 当前页

let pageSize = 8; //一页显示多少条

// TODO：从配置文件读取假数据
let dataSoure:any = ref(listData);

//dd唯一的作用就是给tableData初始化内容，如果直接用userListData来初始化，会导致dataSoure的值受到tableData值的影响
let dd = listData;

// 列表展示数据源（包括查询结果的展示、非查询状态下数据的展示）
let tableData:any = ref(dd);

// 搜索关键词
let keyWords = ref("");

// 传给RichColorLabel的高亮内容，点击查询按钮，会把keyWords赋值给replaceText，
// replaceText内容发生变化，richcolorlabel组件就会自动刷新
let replaceText = ref("");

// 控制richColorLabel刷新
let richLabelRefresh = ref(0);

/** 查看用户详情 */
const handleDetail = (index: number, row: object) => {
  console.log(`要查看的是：index->${index} row->${row}`);
};

/** 删除这条用户信息 */
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
    console.log('弹窗返回数据---'+val);
    if (val == "1") {
      // current仅代表查询结果里的顺序，dataSoure要删除这条内容的话，需要先找到这条数据在dataSoure里真正的索引位置
      dataSoure.value.forEach((item,aindex)=>{
        if (item.user_id === tableData.value[current_index].user_id){
          console.log("找到在dataSour的位置："+aindex + "   a:"+item.user_id+" b:"+tableData.value[current_index].user_id);
          dataSoure.value.splice(aindex, 1);
        }
      });
      tableData.value.splice(current_index, 1);
    }
  });
};

/** 翻页 - 事件 */
const handelPageChange = (val: number) =>{
  currentPage.value = val;
  // 这里需要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
  setTimeout(()=>{
    replaceText.value = keyWords.value;
    richLabelRefresh.value ++;
  },20)
};

/** 查询 */
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

/** 一键清空 - 搜索内容 */
let handelClear = ()=> {
  console.log("一键清空~")
  tableData.value = dataSoure.value;
  //将搜索关键词keyWords赋值给replaceText，这样RichColorLabel就会刷新了
  // 这里要加延迟，否则会出现错误：列表展示条数 = 上一次查询结果的条数
  setTimeout(()=>{
    replaceText.value = "";
  },20)
};
</script>

<style scoped>
/* 列表 */
.demoListDiv {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
}

/* 搜索输入框 */
.searchInput {
  width: calc(80% - 50px);
}

/* 搜索按钮 */
.button-check {
  margin-left: 10px;
  height:28px
}
</style>