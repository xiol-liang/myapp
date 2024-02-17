<template>
    <div>
        <div class="popu-title-bar">
            <div class="title-bgimg"></div>
            <span style="margin-left: 50px">{{name}}</span>
            <div class="title-btns">
                <el-button @click="close" icon="el-icon-close" circle></el-button>
                <el-button @click="maximize" icon="el-icon-full-screen" circle></el-button>
                <el-button @click="minimize" icon="el-icon-minus" circle></el-button>
            </div>
        </div>
        <component :is="dynamicComponent" :extra="extra"></component>
    </div>
</template>

<script>
    export default {
        name: "popupWidget",
        props: ['extra', 'dynamicComponent','name','top','left','width','height'],
        data (){
            return {
                isMaximized: false,
                // zIndex: this.zIndex,
                // computedZIndex: this.zIndex
            }
        },
        watch: {
            // 监听props的变化，更新新的属性
            // zIndex(newVal) {
            //     this.computedZIndex = newVal;
            // }
        },
        methods: {
            close() {
                const container = this.$el.parentElement;
                container.removeChild(this.$el);
                this.$destroy();
                const allPopups = this.$xiol.manuallyMountedComponents;
                this.$xiol.manuallyMountedComponents = allPopups.filter(item => item.$root != this.$root);
            },
            maximize() {
                if (!this.isMaximized) {
                    this.isMaximized = true;
                    const el = this.$el;
                    el.style.width = '100%';
                    el.style.height = `calc(100vh - 110px)`;
                    el.style.top = '60px';
                    el.style.left = 0;
                } else {
                    // debugger
                    this.isMaximized = false;
                    const el = this.$el;
                    el.style.width = this.width + 'px';
                    el.style.height = this.height + 60 + 'px';
                    el.style.top = this.top + 'px';
                    el.style.left = this.left + 'px';
                }
            },
            minimize() {
                const el = this.$el;
                el.style.display = 'none';
            },
            startDrag(e) {
                // 将当前弹窗置于顶层
                this.bringToFront();
                if (this.isMaximized) { //如果是最大化状态下，先恢复原来大小再移动
                    return;
                    // this.isMaximized = false;
                    // const el = this.$el;
                    // el.style.width = this.width + 'px';
                    // el.style.height = this.height + 60 + 'px';
                    // el.style.top = this.top + 'px';
                    // el.style.left = this.left + 'px';
                }
                // 记录鼠标按下时的初始位置和弹窗位置
                this.dragData = {
                    startX: e.clientX,
                    startY: e.clientY,
                    initialLeft: this.$el.offsetLeft,
                    initialTop: this.$el.offsetTop
                };

                // 设置监听器，实时更新弹窗位置
                document.addEventListener('mousemove', this.dragMove);
                document.addEventListener('mouseup', this.endDrag);
            },
            dragMove(e) {
                // 计算移动距离
                const offsetX = e.clientX - this.dragData.startX;
                const offsetY = e.clientY - this.dragData.startY;

                // 更新弹窗位置
                this.$el.style.left = this.dragData.initialLeft + offsetX + 'px';
                this.$el.style.top = this.dragData.initialTop + offsetY + 'px';

            },
            endDrag() {
                // 移除监听器
                document.removeEventListener('mousemove', this.dragMove);
                document.removeEventListener('mouseup', this.endDrag);
            },
            bringToFront() {
                // 获取所有已挂载的弹窗组件
                const allPopups = this.$xiol.manuallyMountedComponents;
                // const maxZindex = Math.max(...allPopups.map(popup => popup.zIndex))
                const maxZindex = Math.max(...this.$xiol.zIndexs)
                // 将当前弹窗置于最顶层
                const zIndex = maxZindex + 1;
                allPopups.forEach(item => {
                    if (item.dynamicComponent == this.dynamicComponent) {
                        if (this.$el.style.zIndex == maxZindex) {
                            console.log("已经是顶层!")
                            return
                        } else {
                            item.zIndex = zIndex;
                            // console.log(this.zIndex,'test-max');
                            this.$el.style.zIndex = zIndex;
                            if (!this.$xiol.zIndexs.includes(zIndex)) {
                                this.$xiol.zIndexs.push(zIndex);
                            }
                            if (this.$xiol.zIndexs.length > 1) {    //优化性能，让全局数组长度保持在2
                                this.$xiol.zIndexs.shift();
                            }
                            if (this.$xiol.zIndexs.length > 2) {
                                this.$xiol.zIndexs.shift();
                                this.$xiol.zIndexs.shift();
                            }
                            console.log(this.$xiol.zIndexs[this.$xiol.zIndexs.length - 1],'test-last');
                        }
                    }
                })
            }
        },
        created() {
            // 在topbar组件中监听事件
            this.$EventBus.$on('bring-to-front',(component) => {
                if (this.dynamicComponent == component) {   //将要置顶的组件与点击的顶部组件菜单项对应起来
                    console.log('需要置顶的组件是',component);
                    this.bringToFront();
                }
            })
        },
        mounted() {
            // console.log(this.extra,'test-extra');
            // console.log(this,'test-this')
            this.$el.addEventListener('mousedown', this.startDrag);
        },
        beforeDestroy() {
            this.$EventBus.$off('bring-to-front');
        }
    }
</script>

<style scoped>

</style>