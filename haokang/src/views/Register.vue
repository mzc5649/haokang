<template>
    <Layout id="layout">
        <Content>

            <div class="box">
                <div class="title">
                    <img style="height: 106px;" src="/img/login/title.png"/>
                </div>
                <div class="model">
                    <div>
                        <span style="color: #000000;font-size: 38px;">用户注册</span>
                        <div>
                            <div class="m2">
                                <Form ref="form" :model="form" :rules="rule" style="width: 100%">
                                    <FormItem prop="username">
                                        <Input size="large"
                                               prefix="ios-contact-outline"
                                               v-model="form.username"
                                               placeholder="请输入用户名">
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password">
                                        <Input size="large"
                                               type="password"
                                               prefix="ios-lock-outline"
                                               v-model="form.password"
                                               placeholder="请输入密码(6-16字符组成，区分大小写)"
                                               password
                                        >
                                        </Input>
                                    </FormItem>

                                    <div style=" width: 440px; display: flex; align-items: center; justify-content: flex-end;">
                                        <div style="display: flex; justify-content: flex-end; font-size: 10px;">
                                        <span style="">已有<span style="color: #00a0d8;"><router-link
                                                to="/index">《好康网》</router-link></span>账号？</span>
                                            <a href="javascript:void(0)" style="text-decoration: none;color: #00a0d8;">
                                                <router-link to="/login">去登陆</router-link>
                                            </a>
                                        </div>
                                    </div>
                                    <FormItem>
                                        <Button type="primary" class="button" @click="register('form')" shape="circle" :loading="registering">
                                            注册
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
        name: "Register",
        data() {
            const that = this;
            const validateUsername = (rule, value, callback) => {
                let regStr = /^[_a-zA-Z0-9-]+$/;
                let str = value;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str === '') {
                    callback(new Error('请告诉我你的用户名'));
                } else if (!regStr.test(value)) {
                    callback(new Error('用户名不可包含除-和_以外的特殊字符'));
                } else if (value.length < 2) {
                    callback(new Error('用户名过短'));
                } else if (value.length > 16) {
                    callback(new Error('用户名过长'));
                } else {
                    that.axios.post('/member/m/repeat', {
                        username: value
                    }).then(function (res) {
                        if (res.data.code == 0) {
                            callback();
                        } else {
                            callback(new Error('该用户名已被使用'));
                        }
                    }).catch(function () {
                        callback(new Error('服务器繁忙，请稍后再试'));
                    })

                }

            };
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else if (value.length > 16) {
                    callback(new Error('密码不能大于16位'));
                } else {
                    callback();
                }

            };
            return {
                registering:false,
                form: {
                    username: '',
                    password: ''
                },
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
        methods: {
            register(name) {
                let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        that.registering=true;
                        that.axios.post('/member/m/register', {
                            username: that.form.username,
                            password: that.form.password
                        }).then(function (res) {
                            if (res.data.code == 0) {
                                that.$Notice.open({
                                    title: '注册通知',
                                    desc: '恭喜你,注册成功'
                                });
                                that.usernameFlag = false;
                                that.passwordFlag = false;
                                that.username = '';
                                that.password = '';
                                that.registering=false;
                            } else {
                                that.registering=false;
                                that.$Notice.open({
                                    title: '注册通知',
                                    desc: '注册失败'
                                });
                            }
                        }).catch(function () {
                            that.registering=false;
                            that.$Notice.open({
                                title: '注册通知',
                                desc: '注册失败'
                            });
                        })
                    }
                })

            },


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