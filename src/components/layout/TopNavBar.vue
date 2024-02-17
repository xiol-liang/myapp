<template>
    <div class="topbar" :style="{zIndex}">
        <div class="bgimg">
        </div>
        <div class="topbar-left">
            <div class="topbar-time">
                <div>天文 {{currentTime}}</div>
                <div>系统 {{currentTime}}</div>
            </div>
        </div>
        <div class="topbar-title" :class="{ contracted: !isExpanded }" @click="hanndleContract"></div>
        <div class="topbar-right">
            <div class="topbar-btns">
                <div v-for="(button, index) in buttons" :key="index" class="topleft-btn" :style="button.style">
                    <div class="button-content" @click="handleMenuClick(button.click)" :style="{ backgroundImage: 'url(' + button.image + ')' , ...button.style }"></div>
                </div>
                <div class="themeBox" :class="{ themeBoxExpanded: isShowThemeBox }">
                    <div class="themeContent">
                        <el-radio-group v-model="theme" @input="changeTheme">
                            <el-radio :label="1">标准</el-radio>
                            <el-radio :label="0">草色青</el-radio>
                            <el-radio :label="2">幻影黑</el-radio>
                            <el-radio :label="3">月光银</el-radio>
                            <el-radio :label="4">远山黛</el-radio>
                            <el-radio :label="5">雅土灰</el-radio>
                            <el-radio :label="6">马卡龙</el-radio>
                            <el-radio :label="7">靛青蓝</el-radio>
                            <el-radio :label="8">极夜蓝</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TopNavBar",
        data() {
            return {
                theme: 1,
                zIndex: 103,
                isExpanded: true,
                isShowThemeBox: false,
                isTanchu:false,
                currentTime: this.getCurrentDateTime(),
                //*****顶部菜单*****//
                buttons: [
                    { image: require('../../assets/images/theme-blue/btns/topbtn3.png'), style: { backgroundSize: '100% 100%'}, click: 'test' },
                    { image: require('../../assets/images/theme-blue/btns/xinfeng.png'), style: { backgroundSize: '100% 60%' }, click: 'msg' },
                    { image: require('../../assets/images/theme-blue/btns/zhutibtn.png'), style: { backgroundSize: '100% 100%' }, click: 'theme' },
                    { image: require('../../assets/images/theme-blue/btns/shezhibtn.png'), style: { backgroundSize: '100% 100%' }, click: 'set'},
                    { image: require('../../assets/images/theme-blue/btns/guanbi.png'), style: { backgroundSize: '100% 100%' }, click: 'exit'},
                    // { image: require('../../assets/images/theme-blue/btns/topbtn3.png') },
                    // { image: require('../../assets/images/theme-blue/btns/xinfeng.png') },
                    // { image: require('../../assets/images/theme-blue/btns/zhutibtn.png') },
                    // { image: require('../../assets/images/theme-blue/btns/shezhibtn.png') },
                    // { image: require('../../assets/images/theme-blue/btns/guanbi.png') },
                    // Add more buttons with images and styles as needed
                ],
                containerWidth: 0,
                containerLeft: 0,
                isDragging: false,
                startX: 0
            }
        },
        created() {
            // 在topbar组件中监听事件
            this.$EventBus.$on('hide-themebox',() => {
                // console.log('收到隐藏主题box消息!');
                if (this.isShowThemeBox) {
                    this.isShowThemeBox = false;
                }
            })
        },
        mounted() {
            // 使用定时器每秒更新一次时钟
            this.clockInterval = setInterval(this.updateClock, 1000);
            this.$el.addEventListener('mousedown',()=> {
                this.$xiol.bringToFront(this.$el,this.$xiol.manuallyMountedComponents,this.$xiol.zIndexs)
            });
        },
        methods: {
            hanndleContract() {
                this.isExpanded = !this.isExpanded;
                // if (this.isExpanded) {
                //     const btn = document.querySelector('.bottomBox .el-icon-caret-bottom');
                //     console.log(btn,'test1')
                //     btn.classList.replace('el-icon-caret-bottom','el-icon-caret-top');
                //     this.isExpanded = false;
                // } else {
                //     const btn = document.querySelector('.bottomBox .el-icon-caret-top');
                //     console.log(btn,'test2')
                //     btn.classList.replace('el-icon-caret-top','el-icon-caret-bottom');
                //     this.isExpanded = true;
                // }
            },
            getCurrentDateTime() {
                const now = new Date();
                const year = now.getFullYear();
                const month = this.formatTimeUnit(now.getMonth() + 1); // 月份从0开始，所以需要+1
                const day = this.formatTimeUnit(now.getDate());
                const hours = this.formatTimeUnit(now.getHours());
                const minutes = this.formatTimeUnit(now.getMinutes());
                const seconds = this.formatTimeUnit(now.getSeconds());
                return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
            },
            formatTimeUnit(unit) {
                return unit < 10 ? `0${unit}` : unit;
            },
            updateClock() {
                this.currentTime = this.getCurrentDateTime();
            },
            handleMenuClick(e) {
                if (this.isShowThemeBox == true && e != 'theme') {
                    this.isShowThemeBox = false;
                }
              switch (e) {
                  case 'test':
                      this.testClick();
                      break;
                  case 'msg':
                      this.msgClick();
                      break;
                  case 'theme':
                      this.themeChange();
                      break;
                  case 'set':
                      this.setClick();
                      break;
                  default:
                      this.exitClick();
                      break;
              }
            },
            testClick() {
                console.log('click test');
                this.$xiol.openComponents([
                    {
                        component:"platformSetting",
                        extra: {that: this,btns: this.buttons}
                    }
                ])
            },
            msgClick() {
                console.log('click msg');
                this.$xiol.openComponents([
                    {
                        component:"addressBook",
                        extra: {that: this,btns: this.buttons}
                    }
                ])
            },
            themeChange() {
                console.log('click theme');
                this.isShowThemeBox = !this.isShowThemeBox;
            },
            setClick() {
                console.log('click set');
            },
            exitClick() {
                console.log('click exit');
            },
            changeTheme(val) {
                console.log(val);
                this.$EventBus.$emit('change-theme',val);
            },


        },
        beforeDestroy() {
            // 清除定时器以防止内存泄漏
            clearInterval(this.clockInterval);
            // document.removeEventListener('click',this.handleDocumentClick)
        }
    }

</script>
<style lang="scss" scoped>
    /* 定义Logo旋转动画 */
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg); /* 两圈是360度*2 */
        }
    }

    .topbar {
        position: absolute;
        top: 0px;
        /*z-index: 103;*/
        width: 100%;
        height: 60px;
        /*overflow: visible;*/
        background-image: url('../../assets/images/theme-blue/layout/topbar.png');
        background-size: 100% 127%; /* 或者使用 contain，根据需求选择 */
        background-repeat: no-repeat;
        background-position: center top;
        transition: left 0.8s, right 5s; /* 添加 left 1s 到过渡样式中 */
        .bgimg {
            position: absolute;
            animation: rotate 2s linear infinite;//一直旋转
            /*animation: rotate 2s linear forwards;//停在最后状态*/
            background: url("../../assets/images/theme-blue/title/title-logo.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            /*margin: 5px 0 5px 50px;*/
            margin: 2px 0 0 42px;
            width: 40px;
            height: 40px;
        }
    }
    /*.topbar::after {*/
    /*    position: relative;*/
    /*    content: '';*/
    /*    height: 60px;*/
    /*    width: 100%;*/
    /*}*/
    .topbar-title{
        position: absolute;
        top: -160px;
        left: calc((100vw - 400px)/2);
        width: 400px;
        height: 266px;
        background-image: url('../../assets/images/theme-blue/layout/toptitle.png');
        background-size: 100% 100%; /* 或者使用 contain，根据需求选择 */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: 102;
        transition: 0.5s;
    }
    .contracted {
        top: 0px;
    }
    .themeBox {
        position: absolute;
        top: -240px;
        opacity: 0;
        right: calc((100% - 180px)/2);
        width: 180px;
        height: 240px;
        background-image: url('../../assets/images/theme-blue/layout/chouti.png');
        background-size: 100% 100%; /* 或者使用 contain，根据需求选择 */
        background-repeat: no-repeat;
        background-position: center center;
        transition: 0.4s;
        .themeContent {
            width: 95%;
            height: 100%;
            margin: 5px auto;
            ::v-deep .el-radio-group {
                width: 80%;
                height: 90%;
                margin: 10px 0 0 50px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .el-radio {
                    color: white;
                }
                .el-radio__input.is-checked+.el-radio__label {
                    color: #45f3ff;
                }
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #45f3ff;
                    background: #45f3ff;
                }
            }
        }
    }
    .themeBoxExpanded {
        top: 50px;
        opacity: 1;
        z-index: 200;
    }
    .topbar-left {
        position: absolute;
        top: 2px;
        left: calc((100vw - 400px)/2 - 570px);
        width: 570px;
        height: 40px;
        font-size: 20px;
        z-index: 102;
        color: #45f3ff;
        /*border: #45f3ff 1px solid;*/
        transition: 0.5s;
        .topbar-time {
            user-select: none;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
    }
    .topbar-right {
        position: absolute;
        top: 2px;
        right: calc((100vw - 400px)/2 - 580px);
        width: 580px;
        height: 40px;
        font-size: 20px;
        z-index: 100;
        color: #45f3ff;
        /*border: #45f3ff 1px solid;*/
        /*transition: 0.5s;*/
        /*.topbar-btns {*/
        /*    position: relative;*/
        /*    z-index: 103;*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*    !*border: #45f3ff 1px solid;*!*/
        /*    overflow: hidden;*/
        /*    !*align-items: center;*!*/
        /*    .topleft-btn:last-child {*/
        /*        margin-right: 0;*/
        /*    }*/
        /*    .topleft-btn {*/
        /*        float: left;*/
        /*        width: 40px;*/
        /*        height: 40px;*/
        /*        margin-right: 20px;*/
        /*        !*border: #45f3ff 1px solid;*!*/
        /*        overflow: hidden;*/
        /*        .button-content {*/
        /*            width: 40px;*/
        /*            height: 40px;*/
        /*            background-repeat: no-repeat;*/
        /*            background-position: center center;*/
        /*        }*/
        /*    }*/
        /*}*/
    }
    .topbar-btns {
        /*position: relative;*/
        z-index: 103;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        /*overflow: hidden;*/
    }

    .scrollable-wrapper {
        overflow: hidden;
        white-space: nowrap;
    }

    .buttons-container {
        display: flex;
    }

    /*.topleft-btn {*/
    /*    !*display: inline-block; !* 替代 float: left; *!*!*/
    /*    padding: 5px;*/
    /*    width: 40px;*/
    /*    height: 40px;*/
    /*    border: #45f3ff 1px dashed;*/
    /*    border-radius: 20px;*/
    /*    transition: border 0.3s ease, transform 0.3s ease;*/
    /*    &:hover {*/
    /*        border: #45f3ff 2px dashed; !* 放大边框 *!*/
    /*        transform: rotate(15deg); !* 顺时针旋转 *!*/
    /*    }*/

    /*    .button-content {*/
    /*        width: 30px;*/
    /*        height: 30px;*/
    /*        !*background-size: contain;*!*/
    /*        background-repeat: no-repeat;*/
    /*        background-position: center center;*/
    /*    }*/
    /*}*/

    //鼠标悬停使，按钮边框虚线旋转放大效果
    @keyframes scale {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.15);
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .topleft-btn {
        padding: 5px;
        width: 40px;
        height: 40px;
        position: relative;
        /*overflow: hidden;*/
    }

    .topleft-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: #45f3ff 1px dashed;
        border-radius: 50%;
        box-sizing: border-box;
        transform-origin: center center;
        /*transition: border 0.3s ease;*/ //去掉边框过渡效果
    }

    .topleft-btn:hover::before {
        top: -3px;
        left: -3px;
        width: 115%;
        height: 115%;
        border: #45f3ff 2px dashed;
        animation: rotate 3s linear infinite; /* 一直旋转 */
    }

    .button-content {
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        background-position: center center;
        transition: transform 0.3s ease;
    }

    /*.topleft-btn:hover::before,*/
    .topleft-btn:hover .button-content {
        cursor: pointer;
        animation: scale 0.3s ease forwards; /* 悬停时放大 */
    }
</style>