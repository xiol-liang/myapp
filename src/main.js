import {setup} from "./platform/index";
import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from "./platform/store/index"
import xiol from "./platform/plugins/xiol";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

function bootstrap(params) {
  //注册vuex store
  // params.add_path("",store.name||'',store.obj||'');
  console.log("资源加载完毕",params);
}
// import {setConfig} from "@/config";
// setConfig();//加载接口配置，不需要请删除相关文件
window.xlapp = {
  Vue:new Vue(),
}
Vue.use(ElementUI)
Vue.use(xiol)
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue();

setup({
  bootstrap,
  components:[
    {name: 'platformSetting',component: ()=> import("./components/tools/platformSetting")}, //平台配置
    {name: 'addressBook',component:()=> import("./components/tools/addressBook")},         //通讯录
    {name: 'userInfo',component:() => import("./components/account/userInfo")},            //用户信息
    {name: 'toolBoxOne',component:() => import("./components/tools/toolBoxOne")},           //业务工具一
    {name: 'toolBoxTwo',component:() => import("./components/tools/toolBoxTwo")},           //业务工具二
    {name: 'toolBoxThree',component:() => import("./components/tools/toolBoxThree")},       //业务工具三
    {name: 'TaskManage',component:()=> import("./components/bottoms/TaskManage")},         //任务管理
    {name: 'TaskMenu',component:() => import("./components/bottoms/TaskMenu")},            //任务清单
    {name: 'SystemManage',component:() => import("./components/bottoms/SystemManage")},    //系统管理
    {name: 'UserManage',component:() => import("./components/bottoms/UserManage")},        //用户管理
    {name: 'MessageManager',component:() => import("./components/bottoms/MessageManager")},        //消息管理
  ]
})

new Vue({
  router,
  store,
  el: '#app',
  created() {
    // 监听自定义事件
    this.$EventBus.$on('component-clicked', (clickedZIndex) => {
      console.log("接收到组件点击事件！")
      // console.log(this,'test-this')
      // console.log(this.$refs,'test-ref');
      // console.log(this.$refs.platformSetting,'test-ref');
      // 遍历所有组件，找到最大的 zIndex
      const childs = this.$children[0].$children;
      console.log(this.$root,'test-root')
      console.log(childs,'test-child')
      console.log(...this.$children,'test-child')
      const maxZIndex = Math.max(
          ...childs.map(c => (c.$data.zIndex || 0))
      );
      console.log(maxZIndex,'test-maxZindex');
      // 如果点击的组件的 zIndex 不是最大的，则更新它的 zIndex 为最大值+1
      if (clickedZIndex !== maxZIndex) {
        const clickedComponent = this.$children.find(c => c.$data.zIndex === clickedZIndex);
        if (clickedComponent) {
          clickedComponent.$data.zIndex = maxZIndex + 1;
          console.log('组件zIndex值更新为：',maxZIndex + 1);
        }
      }
    });
  },
  render: h => h(App),
}).$mount('#app')