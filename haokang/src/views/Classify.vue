<template>
    <div style="min-width: 1200px;">
        <NavBar :is-login="isLogin"></NavBar>
        <div id="content">
        <ClassifyMzc :data="classifyData" :check-id="classifyId"></ClassifyMzc>
            <Row :gutter="20">
                <Col span="16">
                    <div style="height: 30px;line-height: 30px;display: flex;align-items: center;font-size: 18px">
                        <Icon type="logo-youtube" size="30" style="margin-right: 10px"/>视频
                    </div>
                    <Row style="overflow: hidden" :gutter="10">
                            <Spin fix v-show="videoLoading">
                                <Icon type="ios-loading" size=18 style="animation: ani-demo-spin 1s linear infinite;"></Icon>
                                <div>Loading</div>
                            </Spin>
                        <template v-for="item in videoData">
                            <Col span="12" :key="item.id">
                                <VideoCardRow :key="item.id" :video-data="item"></VideoCardRow>
                            </Col>
                        </template>
                    </Row>
                    <!-- 分页导航-->
                    <Page :total="videoPage.total"
                          :page-size="videoPage.pageNum"
                          :current="videoPage.currentPage"
                          @on-change="videoPageChange"
                          show-total
                          show-elevator/>
                </Col>
                <Col span="8" style="text-align: left">
                    <div style="display: flex;height: 30px;align-items: center;font-size: 18px"><Icon type="ios-book" size="30" style="margin-right: 10px" />文章</div>
                    <List item-layout="vertical" :border="true" size="small">
                        <Spin fix v-show="articleLoading">
                            <Icon type="ios-loading" size=18 style="animation: ani-demo-spin 1s linear infinite;"></Icon>
                            <div>Loading</div>
                        </Spin>
                        <ListItem v-for="item in articleData" :key="item.id" class="articleCard"
                                  @click.native="toArticle(item.id)" style="cursor: pointer">
                            <ListItemMeta v-if="item.member" :avatar="item.member.icon"
                                          :title="item.title"
                                          style="overflow: hidden;text-overflow: ellipsis;"/>
                            <div class="summary"
                                 style="height: 50px;line-height: 25px;overflow: hidden;text-overflow: ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; "
                            >
                                {{item.summary}}
                            </div>
                            <template slot="action">
                                <li>
                                    <Icon type="md-eye"/>
                                    {{item.traffic}}
                                </li>
                                <li >
                                <Icon type="ios-time"/>
                                <Time :time="item.createTime" :interval="1"/>
                                </li>
                            </template>
                        </ListItem>
                    </List>
                    <div class="loadMoreArticle" v-if="(articlePage.currentPage*articlePage.pageNum)<articlePage.total" @click="loadMoreArticle">点击加载更多</div>
                    <div class="noMoreArticle" v-else>没有更多了</div>
                </Col>
            </Row>
        </div>
        <Footer>
            <FooterZzj></FooterZzj>
        </Footer>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import ClassifyMzc from "../components/index/classify-mzc";
    import VideoCardRow from "../components/classify/videoCardRow";
    import FooterZzj from "../components/index/footer-zzj";

    export default {
        name: "Classify",
        data() {
            return {
                isLogin: true,
                classifyData: [],
                videoPage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                videoLoading:true,
                articlePage: {
                    total: 0,
                    pageNum: 5,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                articleLoading:true,
                videoData: [],
                articleData: [],
                classifyId: ''
            }
        },
        created() {
            let that = this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.$store.state.m_id = res.data.data;
                        window.sessionStorage.setItem("m_id",res.data.data),
                        that.isLogin = true;
                        //查询用户
                        that.axios.get("/member/m/" + that.$store.state.m_id)
                            .then(function (res) {
                                if (res.data.code == 0) {
                                    that.$store.state.memberInfo = res.data.data;
                                    that.$store.state.memberIconSrc = res.data.data.icon;
                                }
                            })
                    } else {
                        //未登录
                        that.isLogin = false;
                    }
                }).catch(function () {
                    //未登录
                that.isLogin = false;
            })
            //获取分类id
            that.classifyId = that.$route.query.classifyId;
            //视频分类
            that.axios.get("/video/vc/")
                .then(function (res) {
                    that.classifyData = res.data.data;
                    for (let i = 0; i < that.classifyData.length; i++) {
                        if (that.classifyId == that.classifyData[i].id) {
                            document.title = that.classifyData[i].classifyName;
                        }
                    }
                });

            that.getVideoData();
            that.getArticleData();
        },
        components: {FooterZzj, VideoCardRow, ClassifyMzc, NavBar},
        methods: {
            //获取视频数据
            getVideoData() {
                //总数
                let that = this;
                that.axios.get('/video/v/count/classify/' + that.classifyId)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.videoPage.total = res.data.data;
                        } else {
                            that.$Message.error("获取数据失败")
                        }
                    }).catch(function () {
                    that.$Message.error("获取数据失败")
                })
                //根据分类id 获取视频分页数据 根据时间降序
                that.axios.get('/video/v/page/custom/classify/' + that.classifyId,
                    {
                        params: {
                            pageIndex: that.videoPage.currentPage,
                            pageNum: that.videoPage.pageNum,
                            orderField: that.videoPage.orderField,
                            orderType: that.videoPage.orderType
                        }
                    }
                ).then(function (res) {
                    if (res.data.code == 0) {
                        that.videoData = res.data.data
                        that.videoLoading=false;
                    } else {
                        that.$Message.error("获取数据失败")
                    }
                }).catch(function () {
                    that.$Message.error("获取数据失败")
                })
            },
            //视频分页切换
            videoPageChange(index) {
                let that = this;
                that.videoLoading=true;
                that.videoPage.currentPage = index;
                that.getVideoData();
            },
            //获取文章数据
            getArticleData() {
                //总数
                let that = this;
                let id = that.classifyId
                that.axios.get('/article/i/getClassify/' + that.classifyId)
                    .then(function (res) {
                        that.articlePage.total = res.data;
                    }).catch(function () {
                    that.$Message.error("获取数据失败")
                })
                //根据分类id 获取文章分页数据 根据时间降序
                that.axios.get('/article/i/classification',
                    {
                        params: {
                            id: id,
                            page: that.articlePage.currentPage,
                            num: that.articlePage.pageNum,
                            orderField: that.articlePage.orderField,
                            orderType: that.articlePage.orderType
                        }
                    }
                ).then(function (res) {
                    that.articleLoading=false;
                    that.articleData =that.articleData.concat(res.data)
                }).catch(function () {
                    that.$Message.error("获取数据失败")
                })
            },
            //跳转到文章
            toArticle(id) {
                let that = this;
                let obj = that.$router.resolve(
                    {
                        path: '/art',
                        query: {
                            articleId: id
                        }
                    }
                );
                window.open(obj.href, "_blank")
            },
            //加载更多文章
            loadMoreArticle(){
                let that=this;
                that.articleLoading=true;
                that.articlePage.currentPage+=1;
                that.getArticleData()
            }
        }
    }
</script>

<style scoped>
    #content {
        padding: 0 160px
    }

    .loadMoreArticle {
        text-align: center;
        color: #999999;
        cursor: pointer
    }
    .noMoreArticle {
        text-align: center;
        cursor: not-allowed;
    }
    .loadMoreArticle:hover{
        color: #2db7f5;
    }
    .articleCard:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

    }
</style>
<style>
    .ivu-list-item-meta-title{
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>