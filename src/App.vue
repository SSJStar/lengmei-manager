<template>
<!--  <img src="./assets/logo.png">-->
<!--  <div>-->
<!--    <p>-->
<!--      If Element Plus is successfully added to this project, you'll see an-->
<!--      <code v-text="'<el-button>'"></code>-->
<!--      below-->
<!--    </p>-->
<!--    <el-button type="primary">el-button</el-button>-->
<!--  </div>-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";
export default {
  name: 'App',
  computed: {
    zhCn() {
      return zhCn
    }
  },
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
body{
  margin: 0;
  padding: 0;
}
</style>
