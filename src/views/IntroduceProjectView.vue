<template>
  <div class="v-for-div">
    <label
      >这是一个"vue3 +
      typescript"练习项目。整个项目贯穿Element-plus组件库，而Element-plus是由"饿了吗"前端开发团队共同研发的一套UI组件库，
      它包含了诸如el-label、el-button等常用API,大大提高了UI的开发效率。</label
    >
  </div>
</template>

<script setup></script>

<style scoped>
.v-for-div {
  margin: 15px 15px 0 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 5px 5px 8px #999999; /* 外阴影 */
}

.v-for-div label {
  padding: 10px 15px;
  font-size: 20px;
  text-align: left;
}
</style>
