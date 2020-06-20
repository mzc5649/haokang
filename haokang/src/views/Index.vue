<template>
    <div class="index">
        <Layout>
            <NavBar :member-info="memberInfo" :is-login="isLogin"></NavBar>
            <Content id="content">
                <ClassifyMzc :data="classifyData"></ClassifyMzc>
                <RecommendMzc :video-data="videoHotData"></RecommendMzc>
                <!--根据种类 显示-->
                <template v-for="(item,index) in classifyData">
                    <SortMzc :key="index">
                        <template v-slot:sort>
                            {{item.classifyName}}
                        </template>
                        <!--视频-->
                        <template v-slot:video>
                            <VideoMzc :video-classify="item"></VideoMzc>
                        </template>
                        <!--文章-->
                        <template v-slot:article>
                            <ArticleMzc></ArticleMzc>
                        </template>
                    </SortMzc>
                </template>
            </Content>
            <Footer id="footer">
                <FooterZzj></FooterZzj>
            </Footer>
        </Layout>
        <BackTop :height="100" :bottom="150">
            <div class="top">返回顶端</div>
        </BackTop>
    </div>
</template>

<script>
    import ClassifyMzc from "../components/index/classify-mzc";
    import RecommendMzc from "../components/index/recommend-mzc";
    import VideoMzc from "../components/index/video-mzc";
    import FooterZzj from "../components/index/footer-zzj";
    import SortMzc from "../components/index/sort-mzc";
    import ArticleMzc from "../components/index/article-mzc";
    import NavBar from "../components/NavBar";

    export default {
        name: "Index",
        components: {NavBar, SortMzc, FooterZzj, VideoMzc, RecommendMzc, ClassifyMzc, ArticleMzc},
        data() {
            return {
                classifyData: [],
                value1: 0,
                videoHotData: [],
                isLogin: false
            }
        },
        comments: {
            ClassifyMzc
        },
        created() {
            let that = this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.$store.state.m_id = res.data.data;
                        that.isLogin = true;
                        that.showLogin = false;
                        that.axios.get("/member/m/" + that.$store.state.m_id)
                            .then(function (res) {
                                if (res.data.code == 0) {
                                    console.log(res.data.data.birthday)
                                    that.$store.state.memberInfo = res.data.data;
                                    that.$store.state.memberIconSrc =res.data.data.icon;
                                }
                            })
                    } else {
                        that.isLogin = false;
                        that.showLogin = true;
                    }
                })
            //视频分类
            that.axios.get("/video/vc/")
                .then(function (res) {
                    that.classifyData = res.data.data;
                });
            //获取hot视频
            that.axios.get("/video/v/hot",
                {
                    params: {
                        pageIndex: 1,
                        pageNum: 6
                    }
                }).then(function (res) {
                if (res.data.code == 0) {
                    that.videoHotData = res.data.data
                }

            })

        },
        mounted() {
            document.title = '首页'
        },
        computed: {
            memberInfo: function () {
                let that = this;
                return that.$store.state.memberInfo;
            }
        }

    }

</script>
<style>

</style>
<style scoped>
    #header {
        background: none;
    }

    .index {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    #content {
        padding: 0 100px;
        background-color: white;
    }

    .top {
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>