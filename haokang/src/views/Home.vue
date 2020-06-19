<template>
    <Layout id="layout">
        <NavBar :member-info="memberInfo" :is-login="isLogin"></NavBar>
        <Content id="content">
            <Row>
                <Col span="3">
                    <Menu :theme="theme" active-name="homeIndex" style="width: 100%">
                        <MenuGroup title="个人中心" style="text-align: left">
                            <MenuItem name="homeIndex" to="/home/homeIndex">
                                <Icon type="md-document" />
                                首页
                            </MenuItem>
                            <MenuItem name="homeMyInfo" to="/home/homeMyInfo">
                                <Icon type="md-chatbubbles" />
                                我的信息
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="md-chatbubbles" />
                                我的视频
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="md-chatbubbles" />
                                我的文章
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Col>
                <Col span="21" style="padding: 20px">
                    <router-view ></router-view>
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
                memberInfo: {},
                isLogin:false,
                theme:'light'
            }
        },
        components: {

            NavBar
        },
        created() {
            let that = this;
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.$store.state.m_id = res.data.data;
                        that.isLogin = true;
                        that.showLogin = false;
                        that.axios.get("/member/m/" + that.$store.state.m_id)
                            .then(function (res) {
                                if (res.data.code == 0) {
                                    that.memberInfo = res.data.data;
                                    that.$store.state.memberInfo= that.memberInfo
                                    that.isLogin=true;
                                }

                            })
                    } else {
                        that.isLogin = false;
                        that.showLogin = true;
                    }
                })
        },
        mounted() {
            document.title='个人中心'
        }
    }
    ;
</script>
<style scoped>
    #content{
        padding: 0 200px;
        background-color: white;
    }
</style>
<style>
</style>
