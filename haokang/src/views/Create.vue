<template>
    <Layout id="layout">
        <NavBar :is-login="isLogin"></NavBar>
        <Content id="content">
            <Row>
                <Col span="3">
                    <Menu  :active-name="$route.name" style="width: 100%">
                        <MenuGroup title="创作中心" style="text-align: left">
                            <MenuItem name="submit" to="/create">
                                <Icon type="md-document"/>
                               投稿
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
    import NavBar from "../components/NavBar";

    export default {
        name: "CreateCenter",
        data() {
            return {
                isLogin: false
            }
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
            document.title = '创作中心';
        },
        components: {NavBar}
    }
</script>

<style scoped>
    #content {
        background-color: white;
        padding:0 160px
    }
    #layout{
        min-width: 1200px;
    }
</style>