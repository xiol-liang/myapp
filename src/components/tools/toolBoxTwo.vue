<template>
    <div class="tool-title">业务工具二</div>
</template>

<script>
    export default {
        name: "toolBoxTwo",
        beforeDestroy() {
            console.log("准备销毁业务工具二！");
        }
    }
</script>

<style lang="scss" scoped>
    .tool-title {
        color: salmon;
        font-size: 20px;
        width: 100%;
        height: 100%;
    }
</style>