// 静态变量
export const staticVars = {
  //定义属性
  title: "this is global title",
  LEFTMENU_FOLDONW: "200px", //菜单栏-展开-宽度
  LEFTMENU_FOLDOFFW: "64px", //菜单栏-收起-宽度
  BASE_URL: "http://vue.wclimb.site/images/",
  SOCKET_DOMAIN: "https://xx.xx.com/filesystem/upload/",
  BACKGROUNBD_COLOR: "#282832", //菜单栏-背景颜色  #545c64、#3c3c46、
  LEFTMENU_FONTSIZE: "18px", //菜单栏-字体大小
  //导航栏配置
  NAVGATION_HEIGHT: "70px", //导航栏 - 高度
    NAVGATION_BGCOLOR: "#353739", //导航栏 - 背景色  #24291e
  NAVGATION_TITLEFONTSIZE: "24px", //导航栏字体 - 大小
  NAVGATION_TITLECOLOR: "#FFFFFF", //导航栏字 - 颜色
  NAVGATION_LISTFONTSIZE: "16px", //导航栏 - 列表字体 - 大小
  run() {
    console.log("Are you ok? I'm fine,thank you.");
    console.log("run打印this--", this);
  },
  readFile(file) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsBinaryString(file.raw);
      reader.onload = (ev) => {
        resolve(ev.target.result);
      };
    });
  },
};

//全局变量
export const globalObj = {
  loginState: false,
  userName: "",
  token: "",
};
// export default { staticVars, globalObj };
