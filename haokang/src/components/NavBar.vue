<template>
    <div class="header">
        <div class="sea">
            <div class="nav-body" style=" position: absolute; z-index: 1; color: #000000;">
                <nav class="navbar navbar-fixed-top " style="color: black;">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"
                             style="margin: 0; display: flex;justify-content: space-between;">
                            <router-link to="/index">
                                <img src="/img/bar/logo-white.png"
                                     style="width: 200px; margin-left: 20px; margin-top: 10px;"/>
                            </router-link>
                            <ul class="nav-a"
                                v-show="!isLogin"
                                v-cloak
                                style="display: flex;list-style: none; padding: 15px;margin: 0;right: 0;align-items: center;width: 180px">
                                <li style="cursor: pointer;height: 40px;width: 40px;min-width: 40px;min-height: 40px">
                                    <Avatar icon="ios-person" size="large"
                                            style="cursor: pointer"/>
                                </li>
                                <li>
                                    <span style="color: white; float: left;">
                                        <router-link to="/login" target="_blank">
                                            登录
                                        </router-link>
                                    </span>
                                </li>
                                <li>
                                    <span style="color: white; float: left;">
                                        <router-link to="/register" target="_blank">
                                            注册
                                        </router-link>
                                    </span>
                                </li>
                            </ul>
                            <ul class="nav-a"
                                v-cloak
                                v-show="isLogin"
                                style="display: flex;list-style: none; padding: 15px;margin: 0;right: 0;align-items: center;width: 180px;justify-content: space-between">
                                <li style="margin-right: 10px">
                                    <Poptip trigger="hover" placement="bottom" @on-popper-show="onPopperShow"
                                            @on-popper-hide="onPopperHide">
                                        <Badge :count="dotCount" dot>
                                            <Avatar style="cursor: pointer" :src="memberInfo.icon" icon="ios-person"
                                                    size="large"/>
                                        </Badge>
                                        <template slot="content">
                                            <NavBarCard :member-info="memberInfo"></NavBarCard>
                                        </template>
                                    </Poptip>
                                </li>
                                <Button type="info" size="large" long @click="toCreate">投稿</Button>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <span class="wave"></span>
            <span class="wave"></span>
            <span class="wave"></span>
        </div>
        <!--Content before waves-->
        <div class="inner-header flex">

        </div>
        <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"/>
                </g>
            </svg>
        </div>

    </div>

</template>

<script>
    import NavBarCard from "./NavBarCard";

    export default {
        name: "NavBar",
        components: {NavBarCard},
        props: {
            isLogin: Boolean,
        },
        mounted() {
            let that=this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        let id=res.data.data;
                        if(id!=null){
                            that.axios.get("/video/m/sign/"+id)
                                .then(function (res) {
                                    if (res.data.code == 0) {
                                        that.$store.state.dotCount=1;
                                    }else{
                                        that.$store.state.dotCount=0;
                                    }
                                })
                        }

                    }
                })

        },
        created() {


        },
        data() {
            return {}
        },
        methods: {
            toHome() {
                let that = this;
                let obj = that.$router.resolve("/home");
                window.open(obj.href, "_blank");
            },
            toCreate() {
                let that = this;
                let obj = that.$router.resolve("/create");
                window.open(obj.href, "_blank");
            },
            onPopperShow() {

            },
            onPopperHide() {

            }
        },
        computed: {
            memberInfo: function () {
                let that = this;
                return that.$store.state.memberInfo;
            },
            dotCount: function () {
                let that = this;
                return that.$store.state.dotCount;
            }
        }
    }
</script>

<style scoped>

    body {
        margin: 0;
    }

    h1 {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 48px;
    }

    p {
        font-family: 'Lato', sans-serif;
        letter-spacing: 1px;
        font-size: 14px;
        color: #333333;
    }

    .header {
        position: relative;
        text-align: center;
        background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
        color: white;
    }

    .logo {
        width: 50px;
        fill: white;
        padding-right: 15px;
        display: inline-block;
        vertical-align: middle;
    }

    .inner-header {
        height: 5vh;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .flex { /*Flexbox for containers*/
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .waves {
        position: relative;
        width: 100%;
        height: 13vh;
        margin-bottom: -7px; /*Fix for safari gap*/
        min-height: 100px;
        max-height: 150px;
    }

    /* Animation */

    .parallax > use {
        animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }

    .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }

    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }

    .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }

    /*Shrinking for mobile*/
    @media (max-width: 768px) {
        .waves {
            height: 40px;
            min-height: 40px;
        }

        .content {
            height: 30vh;
        }

        h1 {
            font-size: 24px;
        }
    }

    .nav-body {
        width: 100%;
    }

    .nav-a {
        text-decoration: none;
    }

    .nav-a li a {
        color: white;
        margin-left: 15px;
        text-decoration: none;
    }

    .nav-a li a:hover {
        /*color: #31B0D5;*/
    }

    body {
        padding: 0;
        margin: 0
    }

    .logo {
        border: rgba(0, 0, 0, 0) solid 1px;
        width: 400px;
        position: absolute;
        top: 60px;
        left: 280px;
    }

    .logo img {
        width: 360px;

    }

    .navbar-collapse {
        position: relative;
    }

    [v-cloak] {

        display: none !important;

    }

    .ivu-poptip-arrow {
        display: none;
    }

    .ivu-poptip-body {
        padding: 0;
    }

    .ivu-poptip-body-content {
        overflow: hidden;
    }
</style>
<style>

</style>