// xiol.js
// import VueDraggableResizable from 'vue-draggable-resizable';
import popupWidget from "../../components/plugs/popupWidget";
import Vue from "vue";

let zIndexCounter = 200; // 全局计数器，初始值为200
let zIndexs = [];

const manuallyMountedComponents = [];
Vue.prototype.$EventBus = new Vue();

export default {
    install(Vue) {
        // Vue.component('vue-draggable-resizable', VueDraggableResizable);
        Vue.component('popup-Widget',popupWidget);

        Vue.prototype.$xiol = { 
            openComponents(components = []) {
                components.forEach(({ component, extra }) => {
                    const popup = document.querySelector(`.${component}`);
                    if (popup) {
                        if (popup.style.display == 'none') {//如果弹窗已经存在，且被最小化，显示弹窗并置顶
                            popup.style.display = 'unset';
                            Vue.prototype.$EventBus.$emit('bring-to-front',component)
                        }
                        return;      //如果弹窗已经存在，且没有最小化，直接返回
                    }
                    console.log(`准备打开${component}组件`);

                    // 引入 esplug.json 文件，假设是相对路径
                    const esplugConfig = require('../esplug.json');

                    // 在 esplug.json 中查找对应组件配置
                    const componentConfig = esplugConfig.components.find(item => item.component === component);

                    if (componentConfig) {
                        if (componentConfig.type === 'PopupWidget' || componentConfig.type === 'PopupTool') {
                            // 弹窗逻辑
                            const { left, top, width, height, name } = componentConfig;

                            // 创建弹窗组件
                            const PopupComponent = Vue.extend({
                                data() {
                                    return {
                                        zIndex: zIndexCounter,
                                        isVisible: true,
                                        isMaximized: false,
                                        isMinimized: false,
                                    };
                                },
                                mounted() {
                                    this.$nextTick(() => {
                                        this.bringToFront();
                                    });
                                },
                                methods: {
                                    bringToFront() {
                                        if (zIndexCounter < zIndexs[zIndexs.length-1]) {
                                            this.zIndex = zIndexs[zIndexs.length-1] + 1;
                                        } else {
                                            this.zIndex = zIndexCounter++;
                                        }
                                        console.log(this.zIndex, 'test-zIndex');
                                        zIndexs.push(this.zIndex);
                                    },
                                    minimize() {
                                        if (this.isVisible) {
                                            this.isVisible = false;
                                            // const el = this.$el;
                                            const el = this.$refs.component;
                                            console.log(this.$refs,'test-refs');
                                            el.style.display = 'none';
                                        } else {
                                            this.isVisible = true;
                                            const el = this.$refs.component;
                                            console.log(el,'test-ref')
                                            el.style.display = 'unset';
                                        }
                                    },
                                    maximize() {
                                        this.isMaximized = !this.isMaximized;
                                        console.log(this.$el, 'test-el');
                                        console.log(this.$refs,'test-refs');
                                    },
                                    close() {
                                        const container = this.$el.parentElement;
                                        container.removeChild(this.$el);
                                        this.$destroy();
                                    },
                                },
                                render(h) {
                                    const popupRef = `${component}`; // 以组件名命名ref
                                    const componentClassName = `${component}`; // 动态生成类名
                                    return h('popup-Widget', {
                                        ref: popupRef, // 添加ref属性
                                        props: {
                                            resizable: true,
                                            draggable: true,
                                            extra: extra,
                                            name: name,
                                            dynamicComponent: component,
                                            top: top,
                                            left: left,
                                            width: width,
                                            height: height,
                                            zIndex: zIndexCounter
                                        },
                                        class: {
                                            'popup-widget': true,
                                            [componentClassName]: true,
                                            'maximized': this.isMaximized,
                                            'minimized': !this.isVisible,
                                        },
                                        style: {
                                            left: this.isMaximized ? 0 : left + 'px',
                                            top: this.isMaximized ? '90px' : top + 'px',
                                            width: this.isMaximized ? '100%' : width + 'px',
                                            height: this.isMaximized ? `calc(100vh - 140px)` : height + 60 + 'px',
                                            zIndex: this.zIndex,
                                            position: 'absolute',
                                        },
                                    }, [
                                        // h('popup-Widget',{ props: { extra } }),
                                        // h('div', { class: 'popu-title-bar' }, [
                                        //     h('span', { class: 'title' }, name),
                                        //     h('button', { on: { click: this.close } }, '×'),
                                        //     h('button', { on: { click: this.maximize } }, this.isMaximized ? '□' : '口'),
                                        //     h('button', { on: { click: this.minimize } }, '—'),
                                        // ]),
                                        // h(component, { props: { extra } }),
                                    ]);
                                },
                            });


                            // console.log(Vue.prototype,'test-root');
                            // 实例化并挂载PopupComponent
                            const popupComponentInstance = new PopupComponent({
                                parent: Vue.prototype.$root
                            });
                            // console.log(Vue.prototype.$root,'test-root');

                            // 将传入的组件挂载到弹窗组件中
                            popupComponentInstance.dynamicComponent = component;
                            popupComponentInstance.name = name;
                            const container = document.querySelector('#app');
                            container.appendChild(popupComponentInstance.$mount().$el);
                            manuallyMountedComponents.push(popupComponentInstance);
                            Vue.prototype.$xiol.manuallyMountedComponents = manuallyMountedComponents;
                        } else {
                            console.log(`Component type is not supported for: ${component}`);
                        }
                    } else {
                        console.log(`Component not found in esplug.json: ${component}`);
                    }
                });

            },
            bringToFront(el,components,zIndexs) {
                console.log("监听到组件点击事件！")
                // 获取所有已挂载的弹窗组件
                if (components.length > 0 ){
                    // const allPopups = components;
                    // const maxZindex = Math.max(...allPopups.map(popup => popup.zIndex))
                    const maxZindex = Math.max(...zIndexs)
                    // console.log(maxZindex,'test-max');
                    // console.log(el.style.zIndex,'test-el-zindex');
                    if (el.style.zIndex == maxZindex) {
                        console.log("已经是顶层!")
                        return
                    } else {
                        // 将当前弹窗置于最顶层
                        const zIndex = maxZindex + 1;
                        el.style.zIndex = zIndex;
                        if (!zIndexs.includes(zIndex)) {
                            console.log("放进zIndexs数组了！+1")
                            zIndexs.push(zIndex);
                        }
                        if (zIndexs.length > 1) {
                            zIndexs.shift();
                        }
                        if (zIndexs.length > 2) {
                            zIndexs.shift();
                            zIndexs.shift();
                        }
                        console.log(zIndexs[zIndexs.length - 1],'test-last');
                        Vue.prototype.$xiol.zIndexs = zIndexs;
                    }
                }
            },
            closeComponent(components = []) {
                components.forEach(( component ) => {
                    const popup = document.querySelector(`.${component}`);
                    if (popup) {
                        console.log(`准备关闭${component}组件`);
                        const container = popup.parentElement;
                        container.removeChild(popup);
                        if (popup.__vue__) {
                            popup.__vue__.$destroy();
                            const allPopups = Vue.prototype.$xiol.manuallyMountedComponents;
                            Vue.prototype.$xiol.manuallyMountedComponents = allPopups.filter(item => item.$root != this.$root);
                        }
                    }
                })
            }
        };
        // 在插件内部保存手动挂载的组件
        Vue.prototype.$xiol.manuallyMountedComponents = manuallyMountedComponents;
        Vue.prototype.$xiol.zIndexs = zIndexs;
    }
};
