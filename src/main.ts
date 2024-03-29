import {createApp, ref} from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import installElementPlus from './plugins/element'
import ElementPlus from "element-plus"; //引入element-plus
import "element-plus/dist/index.css"; //引入element-plus样式
import zhCn from "element-plus/es/locale/lang/zh-cn";//引入element-plus中文样式(针对日历)
import axios from "axios";

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);//pinia数据持久化

let acount = ref(0);

// 测试代码
console.log("这是main.ts")

const app = createApp(App)
// installElementPlus(app)

// 加载ElementPlus,国际化配置
app.use(ElementPlus, {
    locale: zhCn,
});

//全局挂载axios
axios.defaults.baseURL = "/api";
app.config.globalProperties.$http = axios;

app.use(router).mount('#app')
app.use(pinia);

export default acount;