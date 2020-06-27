<template>
    <Layout id="layout">
        <Content>

            <div class="box">
                <div class="title">
                    <img style="height: 106px;" src="/img/login/title.png"/>
                </div>
                <div class="model">
                    <div class="m1">
                        <span style="color: #000000;font-size: 38px;">用户登录</span>
                        <div>
                            <div class="m2">
                                <Form  ref="form" :model="loginForm" :rules="rule">
                                    <FormItem prop="username">
                                        <Input size="large"
                                               prefix="ios-contact-outline"
                                               v-model="loginForm.username"
                                               placeholder="请输入用户名"
                                        >
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password">
                                        <Input size="large"
                                               type="password"
                                               prefix="ios-lock-outline"
                                               v-model="loginForm.password"
                                               placeholder="请输入密码"
                                               password
                                               @keyup.enter.native="login('form')"
                                        >
                                        </Input>
                                    </FormItem>
                                    <div style=" width: 440px; display: flex; align-items: center; justify-content: space-between;">
                                    <span style="display: flex;align-items: center">
                                        <Checkbox v-model="remberMe" style="font-size: 12px">记住我</Checkbox>
                                        <span style="font-size: 12px;color: #BBBBBB">不是自己的电脑上不要勾选此项</span>
                                    </span>
                                        <div style="display: flex; justify-content: flex-end; font-size: 10px;">
                                            <span style="">还没有<span style="color: #00a0d8;"><router-link to="/index">《好康网》</router-link></span>账号？</span>
                                            <a href="javascript:void(0)" style="text-decoration: none;color: #00a0d8;">
                                                <router-link to="/register">点击注册</router-link>
                                            </a>
                                        </div>
                                    </div>
                                    <FormItem>
                                        <Button type="primary" class="button" @click="login('form')" shape="circle" :loading="logining">
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Content>
    </Layout>

</template>

<script>

    export default {
        name: "Login",
        data() {
            const validateUsername = (rule, value, callback) => {
                let str = value;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ","");
                }
                if(str===''){
                    callback(new Error('请告诉我你的用户名'));
                }else if(value.indexOf(' ')!=-1){
                    callback(new Error('用户名不能含有空格'));
                }else {
                    callback();
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value ==='') {
                    callback(new Error('喵，你没输入密码么？'));
                }else {
                    callback();
                }
            }
            return {
                logining: false,
                loginForm:{
                    username: '',
                    password: ''
                },
                remberMe: true,
                rule: {
                    username: [
                        {validator: validateUsername, trigger: 'change'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'change'}
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
             let that = this;
            let obj = localStorage.getItem("userLoginInfo");
            if (obj != null) {
                let userLoginInfo = JSON.parse(obj)
                that.loginForm.username = userLoginInfo.username;
                that.loginForm.password = userLoginInfo.password;
            }
        },
        methods: {
            login(name) {
                let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        that.logining=true;
                        //验证
                        that.axios.post('/member/m/login', {
                            username: that.loginForm.username,
                            password: that.loginForm.password
                        }).then(function (res) {
                            that.logining=false;
                            if (res.data.code == 0) {
                                if (that.remberMe) {
                                    let data = {username: that.loginForm.username, password: that.loginForm.password};
                                    localStorage.setItem("userLoginInfo", JSON.stringify(data));
                                } else {
                                    localStorage.removeItem("userLoginInfo");
                                }
                                that.$router.push('/index');
                            }else{
                                that.$Message.error("登录失败，用户名或密码错误");
                            }
                        }).catch(function () {
                            that.$Message.error("系统繁忙");
                            that.logining=false;
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 180px;
    }

    #content {
        padding: 0 100px;
    }

    body {
        padding: 0;
        margin: 0;

    }

    .box {
        width: 100%;
    }

    .model {
        width: 100%;
        display: flex;
        justify-content: center;

    }

    .title {
        display: flex;
        justify-content: center;
        background-color: #00a0d8;
        width: 100%;
        height: 86px;
        margin-bottom: 20px;
    }

    .m1 {
        width: 440px;
        text-align: center;
    }

    .m2 {
        padding: 60px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    select {
        width: 442px;
        height: 40px;
        margin-top: 30px;
        border-radius: 5px;
        border: #dcdfe6 solid 1px;
        padding-left: 10px;
        padding-right: 10px;
        color: #606266;
    }

    .button {
        width: 440px;
        height: 60px;
        margin-top: 20px;
    }

    #layout {
        background-color: white;
    }
</style>