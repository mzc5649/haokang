<template>
    <Layout id="layout">
        <Content>

            <div  class="box">
                <div class="title">
                    <img style="height: 106px;" src="/img/login/title.png"/>
                </div>
                <div class="model">
                    <div class="m1">
                        <span style="color: #000000;font-size: 38px;">用户登录</span>
                        <div>
                            <div class="m2">
                                <Input ref="unmInput"
                                        v-model="username"
                                       placeholder="请输入用户名/昵称"
                                       style="width: 440px"
                                       prefix="ios-contact-outline"
                                       @on-change="loginTipUnamShow=false"
                                       size="large"
                                       maxlength="16"
                                />
                                <div style="height: 20px;width: 440px;text-align: left;line-height: 20px;font-size: 12px;color: #2db7f5;margin: 6px 0">
                                    <span  v-show="loginTipUnamShow" v-text="loginTipUnam"></span>
                                </div>
                                <Input ref="pwdInput"
                                        v-model="password"
                                       type="password"
                                       placeholder="请输入密码"
                                       style="width: 440px;"
                                       password
                                       prefix="ios-lock-outline"
                                       @on-change="loginTipPwdShow=false"
                                       size="large"
                                       maxlength="16"
                                />
                                <div style="height: 20px;width: 440px;text-align: left;line-height: 20px;font-size: 12px; color: #2db7f5;margin: 6px 0">
                                    <span v-show="loginTipPwdShow" v-text="loginTipPwd"></span>
                                </div>
                                <div style=" width: 440px; display: flex; align-items: center; justify-content: space-between;">
                                    <span style="display: flex;align-items: center">
                                        <Checkbox v-model="remberMe" style="font-size: 12px">记住我</Checkbox>
                                        <span style="font-size: 12px;color: #BBBBBB">不是自己的电脑上不要勾选此项</span>
                                    </span>

                                    <div style="display: flex; justify-content: flex-end; font-size: 10px;">
                                        <span style="">还没有<span style="color: #00a0d8;"><router-link to="/index">《好康网》</router-link></span>账号？</span>
                                        <a href="javascript:void(0)" style="text-decoration: none;color: #00a0d8;"><router-link to="/register">点击注册</router-link></a>
                                    </div>
                                </div>
                                <Button type="primary" class="button" @click="login" shape="circle">登录</Button>
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
            return {
                username: '',
                password: '',
                loginTipUnamShow:false,
                loginTipUnam:'',
                loginTipPwdShow:false,
                loginTipPwd:'',
                remberMe:true,



            }
        },created() {
            let that=this;
            let obj=localStorage.getItem("userLoginInfo");
            if(obj!=null){
                let userLoginInfo=JSON.parse(obj)
                that.username=userLoginInfo.username;
                that.password=userLoginInfo.password;
            }
        },
        methods:{
            login(){
                let that=this;
                that.loginTipPwdShow=false;
                that.loginTipUnamShow=false;
                let str = that.username;
                let flag1=true;
                let flag2=true;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ","");
                }
                if (str == '' || str.length == 0) {
                    that.loginTipUnam='请输入注册时用的用户名或昵称';
                    that.loginTipUnamShow=true;
                    flag1=false;
                }
                 str = that.password;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str == '' || str.length == 0) {
                    that.loginTipPwd='喵，你没输入密码么？';
                    that.loginTipPwdShow=true;
                    flag2=false;
                }
                if(!flag1&&!flag2){
                    that.$refs.unmInput.focus();
                    return;
                }else if(!flag1){
                    that.$refs.unmInput.focus();
                    return;
                }else if(!flag2){
                    that.$refs.pwdInput.focus();
                    return;
                }else if(flag1&&flag2){
                    //验证
                    that.axios.post('/member/m/login',{
                        username:that.username,
                        password:that.password
                    }).then(function (res) {
                        if(res.data.code==0){
                            if(that.remberMe){
                                let data={username:that.username,password:that.password};
                                localStorage.setItem("userLoginInfo",JSON.stringify(data));
                            }else{
                                localStorage.removeItem("userLoginInfo");
                            }
                            that.$router.push('/index');
                        }else{
                            that.loginTipUnam='账号或密码错误';
                            that.loginTipPwd='账号或密码错误';
                            that.loginTipPwdShow=true;
                            that.loginTipUnamShow=true;
                        }
                    }).catch(function () {
                        that.loginTipUnam='服务器繁忙';
                        that.loginTipPwd='服务器繁忙';
                        that.loginTipPwdShow=true;
                        that.loginTipUnamShow=true;
                    })
                }
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