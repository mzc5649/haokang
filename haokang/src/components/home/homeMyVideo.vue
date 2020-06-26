<template>
    <div>
        <div v-if="!isHaveVideo">
            暂无视频去
            <router-link to="/create/">投稿</router-link>
        </div>
        <div v-else>
            <Row :gutter="10">
                <template v-for="item in videoData">
                    <Col span="12" :key="item.id">
                        <VideoCardRow :key="item.id" :video-data="item"></VideoCardRow>
                    </col>
                </template>
            </Row>
            <!-- 分页导航-->
            <Page :total="videoPage.total"
                  :page-size="videoPage.pageNum"
                  :current="videoPage.currentPage"
                  @on-change="videoPageChange"
                  show-total
                  show-elevator/>
        </div>

    </div>
</template>

<script>
    import VideoCardRow from "../classify/videoCardRow";

    export default {
        name: "homeMyVideo",
        components: {VideoCardRow},
        data() {
            return {
                m_id: '',
                videoPage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                videoData: [],
                isHaveVideo: false
            }
        },
        created() {
            let that = this;
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.m_id = res.data.data;
                        that.getVideoData();
                    }
                })

        },
        methods: {
            //获取视频数据
            getVideoData() {
                //总数
                let that = this;
                let id = that.m_id;
                that.axios.get('/video/v/count/mid/' + id)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.videoPage.total = res.data.data;
                            if (that.videoPage.total > 0) {
                                that.isHaveVideo = true
                                //分页获取数据 根据时间降序
                                that.axios.get('/video/v/page/custom/mid/' + id,
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
                                    } else {
                                        that.$Message.error("获取数据失败")
                                    }
                                }).catch(function () {
                                    that.$Message.error("获取数据失败")
                                })
                            }
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
                that.videoPage.currentPage = index;
                that.getVideoData();
            }
        },
        computed: {
            member: function () {
                let that = this;
                return that.$store.state.memberInfo;
            },
        }
    }
</script>

<style scoped>

</style>