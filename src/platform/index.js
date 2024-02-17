import Vue from 'vue';

function setup(options) {
    const { bootstrap, components } = options;
    // 全局注册组件
    if (components.length > 0) {
        console.log("开始注册全局组件...")
        components.forEach(it => {
            Vue.component(it.name, it.component);
            console.log(`我是组件${it.name},我已注册`, window.xlapp, window.xlapp.Vue);

        });
        console.log("组件注册完毕！")
    }

    // 执行 bootstrap 函数
    // if (typeof bootstrap === 'function') {
    //     bootstrap();
    // }
}

export { setup };
