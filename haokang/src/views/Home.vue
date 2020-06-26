<template>
    <Layout id="layout">
        <NavBar :is-login="isLogin"></NavBar>
        <Content id="content">
            <Row>
                <Col span="3">
                    <Menu :theme="theme" :active-name="$route.name" style="width: 100%">
                        <MenuGroup title="个人中心" style="text-align: left">
                            <MenuItem name="homeIndex" to="/home/">
                                <Icon type="md-home" />
                                首页
                            </MenuItem>
                            <MenuItem name="homeMyInfo" to="/home/homeMyInfo">
                              <Icon type="ios-paper" />
                                我的信息
                            </MenuItem>
                            <MenuItem name="homeMyHead" to="/home/homeMyHead">
                                <Icon type="md-person" />
                                我的头像
                            </MenuItem>
                            <MenuItem name="homeMyVideo" to="/home/homeMyVideo">
                                <Icon type="logo-youtube" />
                                我的视频
                            </MenuItem>
                            <MenuItem name="homeMyArticle" to="/home/homeMyArticle">
                                <Icon type="md-book" />
                                我的文章
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Col>
                <Col span="21" style="padding: 20px">
                    <router-view></router-view>
                </Col>
            </Row>

        </Content>
    </Layout>
</template>

<script>
    // @ is an alias to /src
    import NavBar from "../components/NavBar";

    export default {
        name: "Home",
        data() {
            return {
                isLogin: false,
                theme: 'light'
            }
        },
        components: {
            NavBar
        },
        created() {
            let that = this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    //已登录
                    if (res.data.code == 0) {
                        //用户id
                        that.$store.state.m_id = res.data.data;
                        window.sessionStorage.setItem("m_id",res.data.data),
                        that.isLogin = true;
                        that.axios.get("/member/m/" + that.$store.state.m_id)
                            .then(function (res) {
                                if (res.data.code == 0) {
                                    that.$store.state.memberInfo = res.data.data;
                                    that.$store.state.memberIconSrc = res.data.data.icon;
                                }
                            })
                        //未登录
                    } else {
                        that.isLogin = false;
                        that.$router.push("/login");
                    }
                }).catch(function () {
                //服务器异常
                alert("服务器繁忙");
                that.isLogin = false;
                that.$router.push("/login");
            })
        },
        mounted() {
            document.title = '个人中心'
        },
        computed: {
            memberInfo: function () {
                let that = this;
                return that.$store.state.memberInfo;
            }
        }
    }
    ;
</script>
<style scoped>
    #content {
        padding: 0 160px;
        background-color: white;
    }
</style>
<style>
</style>
