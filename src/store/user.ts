import { defineStore } from "pinia";

// defineStore函数，就两个参数：
//  参数一：唯一标识，也就是ID
//  参数二：配置
const linkonStore = defineStore("myStore",{
    state: () => {
        return {
            name: '张三',
            age:22,
            themeColor: "#563493",
        };
    },
    getters: {
        getThemeColor(state) {
            return state.themeColor;
        },
    },
    actions: {
        updateName(name: string) {
            this.name = name;
        },
        updateAge(age: number) {
            this.age = age;
        },
        updateThemeColor(color: string) {
            this.themeColor = color;
        },
    },
    persist: true //是否自动保存数据，true：是
});
export default linkonStore;