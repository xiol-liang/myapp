<template>
    <div class="tool-title">
        业务工具一
        <el-button @click="closeTest">关闭业务工具二</el-button>
    </div>
</template>

<script>
    export default {
        name: "toolBoxOne",
        data() {
            return {

            }
        },
        methods: {
            closeTest() {
                this.$xiol.closeComponent(["toolBoxTwo"])
            }
        }
    }
</script>

<style lang="scss"  scoped>
    .tool-title {
        color: salmon;
        font-size: 20px;
        width: 100%;
        height: 100%;
    }
</style>