<template>
    <div class="test">
        test-平台配置
        <el-button @click="refTest">button</el-button>
    </div>
</template>

<script>
    export default {
        name: "platformSetting",
        props: ['extra'],
        data() {
            return {

            }
        },
        mounted() {
            console.log(this.extra,'test-extra');
        },
        methods: {
            refTest() {
                console.log(this,'test-this');
                console.log(this.$xiol.manuallyMountedComponents);
                console.log(this.$xiol.zIndexs);
            }
        }
    }
</script>

<style scoped>
    .test {
        color: salmon;
        font-size: 20px;
        width: 500px;
        height: 400px;
        background: #45f3ff;
        border: 1px solid #59bcff;
    }
</style>