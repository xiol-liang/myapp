<template>
    <div id="login">
        <div id="login-container">
            <span></span>
            <span></span>
            <span></span>
<!--            <form id="signinForm">-->
<!--                <h2>Login</h2>-->
<!--                <div class="inputBox">-->
<!--                    <input type="text" placeholder="Username">-->
<!--                </div>-->
<!--                <div class="inputBox">-->
<!--                    <input type="password" placeholder="Password">-->
<!--                </div>-->
<!--                <div class="inputBox group">-->
<!--                    <a href="#">Forgot Password</a>-->
<!--                    <a href="#" id="signup">Signup</a>-->
<!--                </div>-->
<!--                <div class="inputBox">-->
<!--                    <input type="submit" value="Sign in">-->
<!--                </div>-->
<!--            </form>-->
            <el-form id="signinForm" ref="signinForm" :label-position="labelPosition" label-width="80px" :model="formData">
                <h2>Login</h2>
                <el-form-item class="inputBox" label="" prop="username">
                    <el-input type="text" v-model="formData.username" placeholder="Username" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox" label=""  prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="Password" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox group">
                    <el-button id="forgot">Forgot Password</el-button>
                    <el-button id="signup" @click="handleSignup" style="text-decoration: underline">Sign up</el-button>
                </el-form-item>
                <el-form-item class="inputBox" label="">
                    <el-button id="signin" @click="checkSignin">Sign in</el-button>
                </el-form-item>
            </el-form>
            <el-form id="signupForm" ref="signupForm" :label-position="labelPosition" label-width="80px" :model="formData">
                <h2>Registration</h2>
                <el-form-item class="inputBox" label="">
                    <el-input type="text" v-model="formData.username" placeholder="Username" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox" label="">
                    <el-input type="text" v-model="formData.email" placeholder="Email Address" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox" label="">
                    <el-input type="password" v-model="formData.password" placeholder="Create Password" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox" label="">
                    <el-input type="password" v-model="formData.confirmpassword" placeholder="Confirm Password" clearable></el-input>
                </el-form-item>
                <el-form-item class="inputBox" label="">
                    <el-button id="Register">Register Account</el-button>
                </el-form-item>
                <el-form-item class="inputBox group">
                    <el-button id="already">Already Have an Account ?</el-button>
                    <el-button id="sign-in" @click="handleSignin" style="text-decoration: underline">Sign in</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login",
        components: {

        },
        data() {
            return {
                labelPosition: 'top',
                formData: {
                    username: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                }
            };
        },
        mounted() {
            document.addEventListener('keydown', this.handleKeyDown);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.handleKeyDown);
        },
        methods: {
            handleKeyDown(event) {
                // 处理键盘按下事件
                console.log('Key pressed:', event.key);
                if(event.key == "Enter"){
                    this.checkSignin();
                }
            },
            handleSignup() {
                const body = document.querySelector('body');
                body.classList.add('signup');
            },
            handleSignin() {
                const body = document.querySelector('body');
                body.classList.remove('signup');
            },
            checkSignin() {
                if (this.formData.username == '') {
                    this.$message({
                        message: '请输入用户名！',
                        type: 'error'
                    });
                    this.$refs.signinForm.resetFields();
                    return;
                }
                if (this.formData.password == '') {
                    this.$message({
                        message: '请输入密码！',
                        type: 'error'
                    });
                    this.formData.password = '';
                    return;
                }
                // 从 esplug.json 文件中获取登录信息
                const loginInfo = require('../../platform/esplug.json').loginInfo;
                // 检查输入的用户名和密码是否匹配
                const isValidLogin = loginInfo.some(info => {
                    return info.username === this.formData.username && info.password === this.formData.password;
                });

                if (isValidLogin) {
                    this.$store.dispatch('login');
                    // 登录成功，导航到主页面
                    this.$router.push({ name: 'home' });
                } else {
                    // 登录失败
                    this.$message({
                        message: '用户名或密码输入错误！',
                        type: 'error'
                    });
                    this.$refs.signinForm.resetFields();
                }
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../assets/css/login.css";
    #login-container{
        position: relative;
        width: 450px;
        height: 440px;
        border-radius: 15px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        transition: 0.5s;
        overflow: hidden;
        span {
            position: absolute;
            inset: 5px;
            overflow: hidden;
            border-radius: 15px;
        }
    }
    #login-container::before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        /*background: repeating-conic-gradient(from var(--a),#45f3ff 0%,#45f3ff 10%,transparent 10%,transparent 80%,#45f3ff 100%);*/
        background: repeating-conic-gradient(from var(--a), #59bcff 0%,#59bcff 10%,transparent 10%,transparent 80%,#59bcff 100%);
        border-radius: 20px;
        animation: animate 2.5s linear infinite;
    }
    body.signup #login-container::before {
        filter: hue-rotate(320deg);
    }
    @property --a {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
    }
    @keyframes animate {
        0% {
            --a: 0deg;
        }
        100% {
            --a: 360deg;
        }
    }
    #login-container span::before {
        content: '';
        position: absolute;
        inset: 5px;
        background: url("../../assets/images/bg1.png");
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        filter: blur(10px);
    }
    #login-container span::after {
        content: '';
        position: absolute;
        inset: 5px;
        background: url("../../assets/images/bg1.png");
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        filter: blur(15px);
    }
    ::v-deep .el-form-item {
        margin: unset;
    }
    ::v-deep .el-form-item .group {
        width: 60%;
        display: flex;
        justify-content: space-between;
    }
    #signinForm::before {
        clear: both;
    }
    form {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        width: 100%;
        gap: 15px;
        transition: 0.5s;
    }
    form#signupForm {
        left: 100%;
    }
    body.signup form#signinForm {
        left: -100%;
    }
    body.signup form#signupForm {
        left: 0;
    }
    form h2 {
        /*position: relative;*/
        text-align: center;
        color: #fff;
        font-size: 1.8em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 20px;
    }
    form .inputBox {
        position: relative;
        width: 60%;
        /*display: flex;*/
        /*justify-content: space-between;*/
    }
    /*::v-deep .el-form-item__content {*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*}*/
    form .inputBox a {
        color: #fff;
        text-decoration: none;
        font-size: 0.85em;
    }
    form .inputBox a:nth-child(2) {
        text-decoration: underline;
    }
    form .inputBox input {
        width: 100%;
        outline: none;
        border: 1px solid rgba(255,255,255,0.25);
        background: rgba(0,0,0,0.15);
        padding: 6px 15px;
        border-radius: 4px;
        font-size: 0.85em;
        color: #fff;
    }
    form .inputBox input::placeholder {
        color: rgba(255,255,255,0.5);
    }
    form .inputBox input[type="submit"] {
        background: #2196f3;
        font-weight: 500;
        cursor: pointer;
    }
    ::v-deep .el-button {
        background: transparent;
        border: none;
        color: #fff;
        font-weight: unset;
        padding: 0;
    }
    ::v-deep .el-button:hover {
        background: transparent;
        border: none;
        color: #fff;
        font-weight: unset;
        padding: 0;
    }
    ::v-deep .el-button:focus {
        background: transparent;
        border: none;
        color: #fff;
        font-weight: unset;
        padding: 0;
    }
    .group {
        #forgot {
            float: left;
        }
        #signup {
            float: right;
        }
        #already {
            float: left;
            cursor: unset;
        }
        #sign-in {
            float: right;
        }
        ::v-deep .el-form-item__content{
            display: unset;
        }
    }
    #signin {
        background: #2196f3;
        font-weight: 500;
        width: 100%;
        padding: 8px 0px;
    }
    #Register {
        background: #45f3ff;
        font-weight: 500;
        width: 100%;
        padding: 8px 0px;
    }
    ::v-deep .el-input--suffix .el-input__inner {
        width: 100%;
        outline: none;
        border: 1px solid rgba(255,255,255,0.25);
        background: rgba(0,0,0,0.25);
        border-radius: 4px;
        font-size: 1em;
        color: #fff;
        height: 2.5em;
    }
    ::v-deep .el-input__inner:focus {
        border: 1px solid rgba(255,255,255,0.25);
    }
    ::v-deep .el-input__inner:hover {
        border: 1px solid rgba(255,255,255,0.25);
    }
</style>