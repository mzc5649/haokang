<template>
    <Layout id="layout" >
        <NavBar :is-login="isLogin"></NavBar>
        <Content id="content">
            <Row style="display: flex;justify-content: space-between">
                <Col span="15">
                    <div class="box" style="padding-bottom: 10px">
                        <div class="title">
                            <h1>{{articleInfo.title}}</h1>
                        </div>
                        <div class="title_v">
                            <span>{{articleInfo.articleClassify.classifyName}}</span>
                            <span>{{articleInfo.createTime}}</span>
                            <span>{{articleInfo.traffic}}阅读</span>
                        </div>
                        <div>
                            <img style="width:480px;height: 290px" :src="articleInfo.coverUrl">
                        </div>
                        <div class="markdown-body articleContent" v-html="articleInfo.articleContent.content" style="text-align: left;padding: 20px 20px;">
                        </div>
                        <Divider orientation="center"><span style="color: #999999">本文禁止转载或摘编</span></Divider>
                    </div>
                </Col>
                <Col span="8">
                    <Affix>
                        <AuthorCard :author="author"></AuthorCard>
                    </Affix>

                </Col>
            </Row>
        </Content>
        <BackTop :height="100" :bottom="10">
            <div class="top">返回顶端</div>
        </BackTop>
        <Footer id="footer">
            <FooterZzj></FooterZzj>
        </Footer>
    </Layout>
</template>

<script>
    import NavBar from "../components/NavBar";
    import AuthorCard from "../components/AuthorCard";
    import FooterZzj from "../components/index/footer-zzj";


    export default {
        name: "Article",
        data() {
            return {
                isLogin: false,
                articleInfo: {
                    articleContent: {},
                    articleClassify: {}
                },
                author: {}
            }
        },
        created: function () {
            var element = document.createElement("link");
            element.src = "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css";
            element.rel = "stylesheet";
            document.body.appendChild(element);
            let that = this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.$store.state.m_id = res.data.data;
                        window.sessionStorage.setItem("m_id",res.data.data),
                        that.isLogin = true;
                        that.showLogin = false;
                        //获取该用户信息
                        that.axios.get("/member/m/" + that.$store.state.m_id)
                            .then(function (res) {
                                if (res.data.code == 0) {
                                    that.$store.state.memberInfo = res.data.data;
                                    that.$store.state.memberIconSrc = res.data.data.icon;
                                }
                            })
                    } else {
                        that.isLogin = false;
                        that.showLogin = true;
                    }
                })
             //获取文章id
             that.id = that.$route.query.articleId;
            that.axios.get('/article/i/ic/'+that.id)
                .then(function (res) {
                    that.articleInfo = res.data;
                    document.title = that.articleInfo.title ;
                    //获取用户信息
                    let m_id = res.data.m_id;
                    that.axios.get("/member/m/" + m_id)
                        .then(function (res) {
                            if (res.data.code == 0) {
                                that.author=res.data.data;
                            }
                        })
                })
        },
        mounted() {


        },
        components: {FooterZzj, AuthorCard, NavBar}
    }
</script>

<style scoped>
    #content {
        padding: 0 160px;
    }

    #layout {
        background-color: white;
    }

    .box {
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .title {
        width: 100%;
    }

    .title_v {
        width: 100%;
        padding: 10px 0;
    }

    .title_v span {
        margin-left: 10px;
        color: #9b9b9b;
        font-size: 12px;
    }

    .article span {
        color: #9b9b9b;
        font-size: 12px;
    }

    .bottom {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .bottom img {
        width: 24px;
        height: 22px;
    }

    .bottom span {
        font-size: 14px;
        color: #505050;
        margin-left: 10px;
    }

    .bottom span:hover {
        cursor: hand;
        color: #00a1d6;
    }
    .top {
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

</style>
<style>
    code{
        white-space: normal;
        word-break: break-all;
    }
</style>