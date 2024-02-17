<template>
    <div class="rightBox" :class="{ contracted: !isExpanded }" style="z-index: 100">
        <div class="btn" ><i class="el-icon-d-arrow-right" style="font-size: 50px;color: #45f3ff" @click="hanndleContract"></i></div>
        <div class="rightBar" ref="rightbar">
        </div>
    </div>
</template>

<script>
    export default {
        name: "RightBar",
        data() {
            return {
                isExpanded: true,
                zIndex: 100,
            };
        },
        mounted() {
            this.$el.addEventListener('mousedown',()=> {
                this.$xiol.bringToFront(this.$el,this.$xiol.manuallyMountedComponents,this.$xiol.zIndexs)
            });
        },
        methods: {
            hanndleContract() {
                if (this.isExpanded) {
                    const btn = document.querySelector('.rightBox .el-icon-d-arrow-right');
                    console.log(btn,'test1')
                    btn.classList.replace('el-icon-d-arrow-right','el-icon-d-arrow-left');
                    this.isExpanded = false;
                } else {
                    const btn = document.querySelector('.rightBox .el-icon-d-arrow-left');
                    console.log(btn,'test2')
                    btn.classList.replace('el-icon-d-arrow-left','el-icon-d-arrow-right');
                    this.isExpanded = true;
                }

            },
        },
    };
</script>

<style lang="scss" scoped>
    .rightBox {
        position: absolute;
        top: calc((100vh - 580px) / 2);
        right: 0px;
        /*z-index: 100;*/
        width: 350px;
        height: 500px;
        transition: right 0.8s, left 5s; /* 添加 left 1s 到过渡样式中 */
    }

    .rightBar {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 350px;
        height: 500px;
        background-image: url('../../assets/images/theme-blue/layout/rightbar.png');
        background-size: 107% 103%;
        background-repeat: no-repeat;
        background-position: top right;
        /*z-index: 100;*/
        transition: right 1s;
    }

    .btn {
        position: absolute;
        width: 50px;
        height: 50px;
        z-index: 101;
    }

    .contracted {
        right: -350px;
        .btn {
            left: -50px;
        }
    }
</style>
