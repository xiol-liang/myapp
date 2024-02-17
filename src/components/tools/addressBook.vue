<template>
    <div class="test">
        test-通讯录
        <el-button @click="openSettingTest">button</el-button>
    </div>
</template>

<script>
    export default {
        name: "addressBook",
        props: ['extra'],
        data (){
            return {

            }
        },
        mounted() {
            console.log(this.extra,'test-extra');
        },
        methods: {
            openSettingTest() {
                this.$xiol.openComponents([
                    {
                        component: "platformSetting",
                        extra: {
                            that: this
                        }
                    }
                ])
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