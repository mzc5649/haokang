<template>
    <div class="index">
        <Layout id="layout">
                <NavBar></NavBar>
            <Content id="content">
                <Row style="display: flex;justify-content: space-between">
                    <Col span="15">
                        <div style="margin-bottom: 12px">
                            <p style="text-align: left;font-size: 18px">{{videoData.title}}</p>
                            <div style="margin-top: 12px;font-size: 12px;color: #999999">
                                <div style="display: flex;margin-top: 12px;">
                                    {{videoData.videoClassify.classifyName}}
                                    {{videoData.createTime}}
                                </div>
                                <div style="display: flex;margin-top: 12px;">
                                    {{videoData.viewCount}}播放
                                </div>
                            </div>
                        </div>
                        <div style="position: relative">
                            <Spin size="large" fix v-if="spinShow1" style="background-color: white">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                视频加载中
                            </Spin>
                            <div class="video" ref="videoPlayer">
                                <Spin size="large" fix v-if="spinShow">
                                    <template>
                                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>弹幕加载中</div>
                                    </template>
                                </Spin>
                                <video-player
                                        :options="playerOptions"
                                        @play="onPlayerPlay($event)"
                                        @pause="onPlayerPause($event)"
                                        @ended="onPlayerEnded($event)"
                                        ref="videoVue"
                                        class="video-player"
                                ></video-player>
                                <v-barrage
                                        :arr="this.$store.state.danMuList"
                                        :isPause="dm.isPause"
                                        :percent="100"
                                        style="pointer-events: none;z-index: 10;"
                                        v-bind:class="{dmNotShowActive:!dm.isShow}"
                                ></v-barrage>

                            </div>
                            <div class="sendDanMuArea">
                                <transition name="custom-classes-transition"
                                            enter-active-class="animate__animated animate__zoomIn"
                                            leave-active-class="animate__animated animate__zoomOut"

                                >
                                    <SendDMLzr v-if="dm.isControlShow" @sendDanMu="sendDM"
                                               @switchDmShow="switchDmShow"></SendDMLzr>
                                </transition>
                            </div>
                        </div>

                        <div class="videoDesc">
                            {{videoData.videoDescribe}}
                        </div>
                        <!--评论发布-->
                        <div class="comment-area">
                            <div class="input-chat">
                                <div class="input-chat-inside">
                                    <img src="/img/userhead.png" style="width: 48px; height: 48px;border-radius: 50%;"/>
                                    <Input v-model="inputVideoComment" type="textarea"
                                           style="margin-left: 32px;margin-right: 10px"
                                           placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                                           show-word-limit
                                           maxlength="200"
                                    ></Input>
                                    <Button type="primary" @click="sendVideoComment">发表评论</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <!--评论列表-->
                            <template v-for="(item) in videoCommentData">
                                <CommentZzj :key="item.id" :video-comment="item"></CommentZzj>
                            </template>
                            <!-- 分页导航-->
                            <Page :total="videoCommentPage.total"
                                  :page-size="videoCommentPage.pageNum"
                                  :current="videoCommentCurrentPage.currentPage"
                                  @on-change="pageChange"
                                  show-total
                                  show-elevator/>
                        </div>

                    </Col>
                    <Col span="8" style="border: 1px blue solid">

                    </Col>

                </Row>

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
    import FooterZzj from "../components/index/footer-zzj";
    import {videoPlayer} from 'vue-video-player'
    import 'video.js/dist/video-js.css'
    import VBarrage from '@/components/VBarrage/index.vue'
    import SendDMLzr from "../components/video/sendDM-lzr";
    import CommentZzj from "../components/video/comment-zzj";
    import NavBar from "../components/NavBar";

    export default {
        name: "Video",
        data() {
            return {
                id: '',
                videoData: {
                    videoClassify:{}
                },
                videoCommentData: [],
                videoCommentPage: {
                    total: 0,
                    currentPage: 1,
                    pageNum: 10
                },
                videoCommentCurrentPage: 0,
                inputVideoComment: '',
                dm: {
                    isControlShow: true,
                    isShow: true,
                    isPause: true,
                    data: []
                },
                spinShow: false,
                spinShow1:true,
                firstPlay: true,
                isJs: false,
                direction: 'default',
                playerOptions: {
                    muted: true,
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: ""
                    }],
                    poster: "",
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
            }
        },
        components: {NavBar, CommentZzj, SendDMLzr, FooterZzj, videoPlayer, VBarrage},
        methods: {
            //播放视频
            onPlayerPlay: function () {
                let that = this;
                if (that.firstPlay) {
                    that.axios.post("/video/v/viewCount/"+that.videoData.id)
                }
                //开启弹幕
                that.dmOpen();
            },
            //暂停视频
            onPlayerPause() {
                this.dmStop();
            },
            //视频播放完毕
            onPlayerEnded() {
                this.dmStop();
                this.dm.isControlShow = false;
                this.dm.isShow = false;
                this.firstPlay = true;
            },
            //发送弹幕
            sendDM(data, color, direction) {
                let that = this;
                let str = data;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str == '' || str.length == 0) {
                    that.$Message.info("弹幕不能为空");
                    return;
                }
                if (!that.firstPlay) {
                    let info = {
                        content: data,
                        direction: direction,
                        isSelf: true,
                        style: {
                            color: color
                        },
                        isJs: this.isJs,
                    };
                    that.$store.commit('sendToDanMuList', info);
                }

                let info1 = {
                    content: data,
                    color: color,
                    direction: direction,
                    m_id: that.$store.state.m_id,
                    v_id: that.videoData.id
                };
                //添加弹幕
                this.axios.post('/video/dm/',
                    info1
                ).then(function (res) {
                    if (res.data.code == 0) {
                        that.$Message.success("发送弹幕成功");
                    }

                })
            },
            //弹幕停止
            dmStop() {
                this.dm.isPause = true;
            },
            //弹幕开启
            dmOpen() {
                let that = this;
                let videoPlayer = that.$refs.videoPlayer;
                that.dm.isPause = false;
                if (that.firstPlay) {
                    videoPlayer.getElementsByTagName('video')[0].pause();
                    that.spinShow = true;
                    //获取弹幕
                    that.axios.get('/video/dm/v/' + that.videoData.id)
                        .then(function (resp) {
                            that.dm.data = resp.data.data;
                            that.spinShow = false;
                            that.$store.commit("addToDanMuList", that.dm.data)
                            videoPlayer.getElementsByTagName('video')[0].play();
                            that.dm.isControlShow = true;
                            that.firstPlay = false;
                            // that.dm.isShow = true;
                        });


                }

            },
            //弹幕显示按钮
            switchDmShow(data) {
                this.dm.isShow = data;
                console.log(this.dm.isShow)
            },
            //发送评论
            sendVideoComment() {
                let that = this;
                let str = that.inputVideoComment;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str == '' || str.length == 0) {
                    that.$Message.info("评论不能为空");
                    return;
                }
                let videoComment = {
                    vId: that.videoData.id,
                    memberId: that.$store.state.m_id,
                    content: that.inputVideoComment
                }
                that.axios.post('/video/vcom/', videoComment)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.$Message.success("评论成功");
                            that.inputVideoComment = '';
                        } else {
                            that.$Message.error("评论成功");
                        }
                    }).catch(function () {
                    that.$Message.error("评论失败");
                })
            },
            //切换页码时出发
            pageChange(currentPage) {
                let that = this;
                that.videoCommentPage.currentPage = currentPage;
                that.getVideoCommentData()
            },
            getVideoCommentData() {
                let that = this;
                //获取评论总数
                that.axios.get('/video/vcom/count/vid/' + that.id)
                    .then(function (res) {
                        that.videoCommentPage.total = res.data.data;
                    });
                //根据分页获取该视频评论信息
                that.axios.get('/video/vcom/page/vid/' + that.id,
                    {
                        params: {
                            currentPage: that.videoCommentPage.currentPage,
                            pageNum: that.videoCommentPage.pageNum
                        }
                    },)
                    .then(function (res) {
                        that.videoCommentData = res.data.data;
                    });
            }

        },
        created() {
            let that = this;
            that.id = that.$route.query.videoId;
            //获取视频信息
            that.axios.get('/video/v/' + that.id,)
                .then(function (res) {
                    that.videoData = res.data.data;
                    that.playerOptions.poster = that.videoData.viewCoverUrl;
                    that.playerOptions.sources[0].src = that.videoData.videoContent.videoUrl;
                    that.spinShow1=false;
                    document.title=that.videoData.title
                });
            //获取评论总数
            that.axios.get('/video/vcom/count/vid/' + that.id)
                .then(function (res) {
                    that.videoCommentPage.total = res.data.data;
                });
            //根据分页获取该视频评论信息
            that.axios.get('/video/vcom/page/vid/' + that.id,
                {
                    params: {
                        currentPage: that.videoCommentPage.currentPage,
                        pageNum: that.videoCommentPage.pageNum
                    }
                },)
                .then(function (res) {
                    that.videoCommentData = res.data.data;
                });
        },
        mounted() {
            window.scrollTo(0,0);

        },
        computed: {}
    }

</script>

<style scoped>
    .video {
        position: relative;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #header {
        background: none;
    }

    .index {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        min-width: 1200px;
    }

    #content {
        padding: 0 100px;
    }

    .top {
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

    /*弹幕显示透明度*/
    .dmNotShowActive {
        opacity: 0;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    .input-chat {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
    }

    .input-chat-inside {
        width: 100%;
        height: 65px;
        display: flex;
        align-items: center;
        border-radius: 4px;
    }

    .sendDanMuArea {
        height: 36px;
        position: relative;
        z-index: 1;
        background-color: white;
        border-bottom-left-radius: 5px;
        background-color: white;
        border-bottom-right-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .videoDesc {
        padding: 10px 0;
        white-space: pre-line;
        overflow: hidden;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0;
        text-align: left;
        border-bottom: 1px solid #e5e9ef;
    }
</style>
<style>
    .video-js .vjs-big-play-button {
        height: 2em;
        width: 2em;
        line-height: 2em;
        border-radius: 1em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #layout{
        background-color: white;
    }

</style>