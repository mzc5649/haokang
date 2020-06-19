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
                                <Input v-model="username"
                                       placeholder="请输入用户名"
                                       style="width: 440px"
                                       prefix="ios-contact-outline"
                                       size="large"
                                       @on-change="checkRegUsername"
                                />
                                <div style="height: 20px;width: 440px;text-align: left;line-height: 20px;font-size: 12px;color: #2db7f5;margin: 6px 0">
                                    <span v-show="registerTipUnamShow" v-text="registerTipUnam"></span>
                                </div>
                                <Input v-model="password"
                                       type="password"
                                       placeholder="请输入密码(2-16字符组成，区分大小写)"
                                       style="width: 440px"
                                       password
                                       prefix="ios-lock-outline"
                                       size="large"
                                       @on-change="checkRegPwd"
                                />
                                <div style="height: 20px;width: 440px;text-align: left;line-height: 20px;font-size: 12px;color: #2db7f5;margin: 6px 0">
                                    <span v-show="registerTipPwdShow" v-text="registerTipPwd"></span>
                                </div>
                                <div style=" width: 440px; display: flex; align-items: center; justify-content: flex-end;">
                                    <div style="display: flex; justify-content: flex-end; font-size: 10px;">
                                        <span style="">已有<span style="color: #00a0d8;"><router-link
                                                to="/index">《好康网》</router-link></span>账号？</span>
                                        <a href="javascript:void(0)" style="text-decoration: none;color: #00a0d8;">
                                            <router-link to="/login">去登陆</router-link>
                                        </a>
                                    </div>
                                </div>
                                <Button v-if="(usernameFlag&&passwordFlag)" type="primary" class="button"
                                        @click="register" shape="circle">注册
                                </Button>
                                <Button v-else type="primary" class="button" @click="register" shape="circle" disabled>
                                    注册
                                </Button>

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
            return {
                username: '',
                usernameFlag: false,
                password: '',
                passwordFlag: false,
                registerTipUnamShow: false,
                registerTipUnam: '',
                registerTipPwdShow: false,
                registerTipPwd: '',
            }
        },
        methods: {
            register() {
                let that=this;
                that.axios.post('/member/m/register',{
                    username:that.username,
                    password:that.password
                }).then(function (res) {
                   if(res.data.code==0){
                       that.$Notice.open({
                           title: '注册通知',
                           desc: '恭喜你,注册成功'
                       });
                       that.usernameFlag=false;
                       that.passwordFlag=false;
                       that.username='';
                       that.password='';
                   }else{
                       that.$Notice.open({
                           title: '注册通知',
                           desc: '注册失败'
                       });
                   }
                }).catch(function () {
                    that.$Notice.open({
                        title: '注册通知',
                        desc: '注册失败'
                    });
                })

            },
            checkRegPwd() {
                let that = this;
                that.passwordFlag = false;
                if (that.password.length < 6) {
                    that.registerTipPwd = '密码不能小于6个字符';
                    that.registerTipPwdShow = true;
                    that.passwordFlag = false;
                    return;
                } else if (that.password.length > 16) {
                    that.registerTipPwd = '密码不能大于16个字符';
                    that.registerTipPwdShow = true;
                    that.passwordFlag = false;
                    return;
                } else {
                    that.registerTipPwdShow = false;
                    that.passwordFlag = true;
                }

            },
            checkRegUsername() {
                let that = this;
                that.usernameFlag = false;
                let str = that.username;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str == '' || str.length == 0) {
                    that.registerTipUnam = '请告诉我你的用户名';
                    that.registerTipUnamShow = true;
                    that.usernameFlag = false;
                    return;
                }
                if (that.username.indexOf(' ') != -1) {
                    that.registerTipUnam = '用户名不可包含除-和_以外的特殊字符';
                    that.registerTipUnamShow = true;
                    that.usernameFlag = false;
                    return;
                }
                if (that.username.length < 2) {
                    that.registerTipUnam = '用户名过短';
                    that.registerTipUnamShow = true;
                    that.usernameFlag = false;
                    return;
                } else if (that.username.length > 16) {
                    that.registerTipUnam = '用户名过长';
                    that.registerTipUnamShow = true;
                    that.usernameFlag = false;
                    return;
                } else {
                    that.registerTipUnamShow = false;
                    that.usernameFlag = false;
                }
                //判断用户名是否可用
                that.axios.post('/member/m/repeat', {
                    username: that.username
                }).then(function (res) {
                    if (res.data.code == 0) {
                        that.registerTipUnam = '恭喜你，该用户名可用';
                        that.usernameFlag = true;
                        that.registerTipUnamShow = true;
                    } else {
                        that.registerTipUnam = '该用户名已被使用';
                        that.usernameFlag = false;
                        that.registerTipUnamShow = true;
                    }
                }).catch(function () {
                    that.registerTipUnam = '服务器繁忙，请稍后再试';
                    that.registerTipUnamShow = true;
                    that.usernameFlag = false;
                })
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
        width: 980px;
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