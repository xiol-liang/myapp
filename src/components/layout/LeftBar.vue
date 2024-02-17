<template>
    <div class="leftBox" :class="{ contracted: !isExpanded }" style="z-index: 103">
        <div class="btn" ><i class="el-icon-d-arrow-left" style="font-size: 50px;color: #45f3ff" @click="hanndleContract"></i></div>
        <div class="leftBar" ref="leftbar">
            <div class="title">
                <div class="bgimg"></div>
                <span>工具箱</span>
            </div>
            <div class="tools">
                <div v-for="(tool,index) in tools" :key="index" @click="handleToolClick(tool.component)" class="tool-btn">
                    {{tool.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeftBar",
        data() {
            return {
                isExpanded: true,
                zIndex: 103,
                tools: [],
            }
        },
        mounted() {
            this.$el.addEventListener('mousedown',()=> {
                this.$xiol.bringToFront(this.$el,this.$xiol.manuallyMountedComponents,this.$xiol.zIndexs)
            });
            // 引入 esplug.json 文件
            const esplugConfig = require('../../platform/esplug.json');
            this.tools = esplugConfig.components.filter(item => item.type === 'PopupTool')
            console.log(this.tools,'test-tools');
        },
        methods: {
            hanndleContract() {
                if (this.isExpanded) {
                    const btn = document.querySelector('.leftBox .el-icon-d-arrow-left');
                    console.log(btn,'test1')
                    btn.classList.replace('el-icon-d-arrow-left','el-icon-d-arrow-right');
                    this.isExpanded = false;
                } else {
                    const btn = document.querySelector('.leftBox .el-icon-d-arrow-right');
                    console.log(btn,'test2')
                    btn.classList.replace('el-icon-d-arrow-right','el-icon-d-arrow-left');
                    this.isExpanded = true;
                }
            },
            handleToolClick(component) {
                this.$xiol.openComponents([{
                    component: component
                }])
            }
        }
    }
</script>

<style lang="scss" scoped>
    .leftBox {
        position: absolute;
        top: calc((100vh - 350px)/2);
        left: 0px;
        /*z-index: 103;*/
        width: 350px;
        height: 250px;
        transition: left 0.8s, right 5s; /* 添加 left 1s 到过渡样式中 */
    }
    .leftBar {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 350px;
        height: 250px;
        background-image: url('../../assets/images/theme-blue/layout/leftbar.png');
        background-size: 100% 100%; /* 或者使用 contain，根据需求选择 */
        background-repeat: no-repeat;
        background-position: center center;
        /*z-index: 102;*/
        transition: 0.5s;
    }
    .title {
        float: left;
        span {
            position: relative;
            top: 32px;
            left: 60px;
            display: inline-block;
            color: #45f3ff;
            font-size: 24px;
        }
    }
    .btn {
        position: absolute;
        right: 0px;
        width: 50px;
        height: 50px;
        z-index: 103;
    }

    .contracted {
        left: -350px;
        background-color: transparent;
        .btn {
            right: -50px;
        }
    }
    /* 定义旋转动画 */
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg); /* 两圈是360度*2 */
        }
    }

    /* 定义光线延伸动画 */
    @keyframes extendLine {
        0% {
            width: 0;
        }
        100% {
            width: 150px;
        }
    }

    /* 定义发蓝光的渐变效果 */
    @keyframes glowing {
        0% {
            box-shadow: 0 0 10px #45f3ff, 0 0 20px #45f3ff, 0 0 30px #45f3ff;
        }
        100% {
            box-shadow: 0 0 20px #45f3ff, 0 0 30px #45f3ff, 0 0 40px #45f3ff;
        }
    }
    .bgimg {
        position: absolute;
        /*animation: rotate 2s linear infinite;//一直旋转*/
        animation: rotate 1.5s linear forwards;//停在最后状态
        background: url("../../assets/images/theme-blue/title/titleCircle.png");
        background-size: cover;
        background-repeat: no-repeat;
        /*margin: 5px 0 5px 50px;*/
        margin: 30px 0 0 10px;
        width: 40px;
        height: 40px;
    }
    /* 创建光线的伪元素 */
    .bgimg::after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 25px;
        width: 0;
        height: 2px; /* 光线的高度 */
        background: linear-gradient(0deg, #45f3ff, #45f3ff); /* 渐变颜色，这里使用了蓝色 */
        animation: extendLine 0.5s linear forwards, glowing 1s linear forwards; /* 光线的发光效果 */
        animation-delay: 1.5s; /* 延迟光线的出现，保持与旋转动画时长一致 */
    }
    .tools {
        width: 92%;
        height: 144px;
        /*border: #59bcff 2px dashed;*/
        position: relative;
        top: 41px;
        left: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        .tool-btn {
            font-size: 16px;
            color: #45f3ff;
            width: 60px;
            height: 60px;
            border: #59bcff 2px dashed;
            /*border: #60cbec 1px dashed;*/
            margin: 1px;
            transition: 0.3s;
        }
        .tool-btn:hover {
            transform: scale(1.1);
            border: #45f3ff 2px solid;
            background: #1e4f52;
            cursor: pointer;
        }
    }
</style>