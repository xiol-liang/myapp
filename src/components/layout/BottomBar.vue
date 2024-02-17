<template>
    <div class="bottomBox" :class="{ contracted: !isExpanded }" style="z-index: 102">
        <div class="btn" ><i class="el-icon-caret-bottom" style="font-size: 50px;color: #45f3ff" @click="hanndleContract"></i></div>
        <div class="bottombar">
            <div class="main-content">
                <component :is="currentComponent"></component>
            </div>
<!--            <div class="img"></div>-->
        </div>
        <div class="footer">
            <i class="el-icon-menu" @click="hanndleContract" style="font-size: 45px;margin-top: 3px;z-index: 105; color: #45f3ff"></i>
            <div class="footer-content">
                <div class="footer-menus">
                    <div v-for="(footBtn, index) in footBtns" :key="index" @click="handleMenuClick(footBtn.component, index)" class="footer-btn" :class="{ 'is-active': index === activeButtonIndex }">
                        {{footBtn.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "BottomBar",
        data() {
            return {
                isExpanded: true,
                zIndex:102,
                footBtns: [],
                currentComponent: '',
                activeButtonIndex: 0, // 默认为第一个按钮
            }
        },
        mounted() {
            this.$el.addEventListener('mousedown',()=> {
                this.$xiol.bringToFront(this.$el,this.$xiol.manuallyMountedComponents,this.$xiol.zIndexs)
            });
            // 引入 esplug.json 文件
            const esplugConfig = require('../../platform/esplug.json');
            this.footBtns = esplugConfig.components.filter(item => item.type === 'BottomWidget')
            console.log(this.footBtns,'test-footBtns');
            this.currentComponent = this.footBtns[0].component;
        },
        methods: {
            hanndleContract() {
                if (this.isExpanded) {
                    const btn = document.querySelector('.bottomBox .el-icon-caret-bottom');
                    console.log(btn,'test1')
                    btn.classList.replace('el-icon-caret-bottom','el-icon-caret-top');
                    this.isExpanded = false;
                } else {
                    const btn = document.querySelector('.bottomBox .el-icon-caret-top');
                    console.log(btn,'test2')
                    btn.classList.replace('el-icon-caret-top','el-icon-caret-bottom');
                    this.isExpanded = true;
                }
            },
            handleMenuClick(component, index) {
                this.currentComponent = component;
                this.activeButtonIndex = index;
            },
        }
    }

</script>
<style lang="scss" scoped>
    .bottomBox {
        position: absolute;
        bottom: 0px;
        /*z-index: 102;*/
        width: 100%;
        height: 250px;
        transition: bottom 0.8s, top 5s; /* 添加 left 1s 到过渡样式中 */
    }
    .bottombar {
        position: absolute;
        /*display: none;*/
        bottom: 15px;
        /*z-index: 101;*/
        width: 100%;
        height: 300px;
        background-image: url('../../assets/images/theme-blue/layout/bottombar.png');
        background-size: 105% 112%; /* 或者使用 contain，根据需求选择 */
        background-repeat: no-repeat;
        background-position: center bottom;
        .main-content {
            padding: 2px;
            width: calc(100vw - 2px);
            height: 263px;
            border: #45f3ff 1px solid;
        }
        .img {
            margin: 5px;
            width: 50px;
            height: 50px;
            background-image: url('../../assets/images/logo.png');
            background-size: cover; /* 或者使用 contain，根据需求选择 */
            background-repeat: no-repeat;
            background-position: center center;
        }
    }
    .btn {
        position: absolute;
        left: 50%;
        top: -104px;
        height: 50px;
        z-index: 103;
    }

    .contracted {
        bottom: -300px;
        .btn {
            top:-140px;
        }
    }
    .footer{
        width: 100%;
        height: 50px;
        background: rgba(11, 52, 64, 0.9);
        position: fixed;
        bottom: 0;
        z-index: 104;
        .footer-content {
            position: fixed;
            height: 50px;
            bottom: 0;
            right: 3px;
            width: calc(100vw - 50px);
            /*border: 1px solid #45f3ff;*/
            background: rgba(22, 47, 90, 0.9);
        }
        .footer-menus {
            width: 700px;
            height: 100%;
            /*border: #45f3ff 1px solid;*/
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .footer-btn {
                text-align: center;
                vertical-align: center;
                font-size: 14px;
                color: #45f3ff;
                width: 120px;
                height: 48px;
                border: #59bcff 2px dashed;
                /*border: #60cbec 1px dashed;*/
                margin: 0 3px 15px;
                transition: 0.3s;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .footer-btn:hover {
                transform: scale(1.1);
                border: #45f3ff 2px solid;
                background: #1e4f52;
                cursor: pointer;
            }
            .is-active {
                transform: scale(1.1);
                border: #45f3ff 2px solid;
                background: #1e4f52;
                box-shadow: 0 0 10px #45f3ff inset;
            }
        }
    }
</style>