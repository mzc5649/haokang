<template>
    <div class="index">
        <Layout id="layout">
            <NavBar :is-login="isLogin"></NavBar>
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
                                    {{videoData.viewCount}}播放·{{dmNum}}弹幕
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
                                    <SendDMLzr v-if="dm.isControlShow" :is-login="isLogin" @sendDanMu="sendDM"
                                               @switchDmShow="switchDmShow"></SendDMLzr>
                                </transition>
                            </div>
                            <!--点赞-->
                            <div style="height: 30px;line-height:30px;text-align: left;margin: 10px 0">
                                支持作者
                                <span class="star" v-if="!isStar" @click="starVideo">
                                    <Tooltip content="点赞该视频">
                                        <Icon type="ios-thumbs-up" style="font-size: 30px;"/>
                                    {{starNum}}
                                    </Tooltip>

                                </span>
                                <span v-else style="cursor: pointer" @click="unStarVideo">
                                     <Tooltip content="取消点赞">
                                      <Icon type="ios-thumbs-up" color="#1890ff" style="font-size: 30px;"/>
                                    {{starNum}}
                                     </Tooltip>
                                </span>

                            </div>
                        </div>

                        <div class="videoDesc">
                            {{videoData.videoDescribe}}
                        </div>
                        <!--瞄点-->
                        <a name="comment"></a>
                        <!--评论发布-->
                        <Form style="position: relative" :disabled="!isLogin">
                            <div class="comment-area">
                                <div class="input-chat">
                                    <div class="input-chat-inside">
                                        <Avatar :src="$store.state.memberInfo.icon" icon="ios-person"
                                                style="min-width: 48px; min-height: 48px;border-radius: 50%;font-size: 24px;line-height: 48px"/>
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
                            <span v-show="!isLogin" class="sendCommentShadow">请先<router-link to="/login"
                                                                                             target="_blank">登录</router-link>或<router-link
                                    to="/register" target="_blank">注册</router-link></span>
                        </Form>
                        <div>
                            <!--评论列表-->
                            <div style="position: relative">
                                <Spin size="large" fix v-if="commentSpin"></Spin>
                                <template v-for="(item) in videoCommentData" v-cloak>
                                    <CommentZzj :is-login="isLogin" :key="item.id" :video-comment="item"></CommentZzj>
                                </template>
                            </div>
                            <!-- 分页导航-->
                            <Page :total="videoCommentPage.total"
                                  :page-size="videoCommentPage.pageNum"
                                  :current="videoCommentCurrentPage.currentPage"
                                  @on-change="pageChange"
                                  show-total
                                  show-elevator/>
                        </div>

                    </Col>
                    <Col span="8">
                        <AuthorCard :author="author"></AuthorCard>
                    </Col>

                </Row>

            </Content>
            <Footer id="footer">
                <FooterZzj></FooterZzj>
            </Footer>
        </Layout>

        <BackTop :height="100" :bottom="10">
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
    import AuthorCard from "../components/AuthorCard";

    export default {
        name: "Video",
        data() {
            return {
                isStar: false,
                starNum: 0,
                dmNum:0,
                commentSpin: true,
                id: '',
                videoData: {
                    videoClassify: {}
                },
                author: {},
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
                spinShow1: true,
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
                isLogin: false
            }
        },
        components: {AuthorCard, NavBar, CommentZzj, SendDMLzr, FooterZzj, videoPlayer, VBarrage},
        methods: {
            //播放视频
            onPlayerPlay: function () {
                let that = this;
                if (that.firstPlay) {
                    that.axios.post("/video/v/viewCount/" + that.videoData.id)
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
                //暂停弹幕
                that.dm.isPause = false;
                //第一次播放
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
                             that.dm.isShow = true;
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
                            //刷新评论区
                            that.getVideoCommentData();
                        } else {
                            that.$Message.error("评论失败");
                        }
                    }).catch(function () {
                    that.$Message.error("评论失败");
                })
            },
            //切换页码时出发
            pageChange(currentPage) {
                let that = this;
                that.commentSpin = true;
                that.videoCommentPage.currentPage = currentPage;
                that.getVideoCommentData()
                window.location.href = "#comment";
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
                        that.commentSpin = false;
                    });
            },
            //点赞视频
            starVideo() {
                let that = this;
                //是否登录
                if (that.isLogin == true) {
                    let vid = that.videoData.id;
                    let mid = that.$store.state.m_id;
                    //点赞
                    that.axios.post("/video/v/star", null, {
                        params: {
                            vid: vid,
                            mid: mid
                        }
                    }).then(function (res) {
                        if (res.data.code == 0) {
                            if (res.data.data == 0) {
                                that.isStar = true;
                                that.$Message.success("点赞成功，感谢您的支持")
                                that.starNum = that.starNum + 1;
                            } else {
                                that.isStar = false;
                                that.$Message.success("成功取消点赞")
                                that.starNum = that.starNum - 1;
                            }
                        }
                    })
                } else {
                    alert("请先登录")
                }

            },
            //取消点赞视频
            unStarVideo() {
                let that = this;
                //是否登录
                if (that.isLogin == true) {
                    let vid = that.videoData.id;
                    let mid = that.$store.state.m_id;
                    //点赞
                    that.axios.post("/video/v/star", null, {
                        params: {
                            vid: vid,
                            mid: mid
                        }
                    }).then(function (res) {
                        if (res.data.code == 0) {
                            if (res.data.data == 0) {
                                that.isStar = true;
                                that.$Message.success("点赞成功，感谢您的支持")
                                that.starNum = that.starNum + 1;

                            } else {
                                that.isStar = false;
                                that.$Message.success("成功取消点赞")
                                that.starNum = that.starNum - 1;
                            }
                        }
                    })
                } else {
                    alert("请先登录")
                }
            }

        },
        created() {
            let that = this;
            //视频id
            that.id = that.$route.query.videoId;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.$store.state.m_id = res.data.data;
                        window.sessionStorage.setItem("m_id", res.data.data);
                        that.isLogin = true;
                        that.showLogin = false;
                        //获取该视频 用户是否点赞
                        that.axios.get("/video/v/isStar", {
                            params: {
                                vid: that.id,
                                mid: res.data.data
                            }
                        }).then(function (res) {
                            if (res.data.code == 0) {
                                that.isStar = res.data.data;
                            }
                        })
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
            //获取该视频点赞数量
            that.axios.get("/video/v/star/vid/" + that.id)
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.starNum = res.data.data;
                    }
                })
            //获取该视频弹幕数量
            that.axios.get("/video/dm/count/vid/" + that.id)
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.dmNum=res.data.data;
                    }
                })
            //获取视频信息
            that.axios.get('/video/v/' + that.id,)
                .then(function (res) {
                    that.videoData = res.data.data;
                    let m_id = res.data.data.member_id;
                    //获取该用户信息
                    that.axios.get("/member/m/" + m_id)
                        .then(function (res) {
                            if (res.data.code == 0) {
                                that.author = res.data.data;
                            }
                        })


                    that.playerOptions.poster = that.videoData.viewCoverUrl;
                    that.playerOptions.sources[0].src = that.videoData.videoContent.videoUrl;
                    that.spinShow1 = false;
                    document.title = that.videoData.title
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
                    that.commentSpin = false;
                });

        },
        mounted() {
            window.scrollTo(0, 0);

        },
        computed: {
            memberInfo: function () {
                let that = this;
                return that.$store.state.memberInfo;
            }
        }
    }

</script>

<style scoped>
    .video {
        position: relative;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    }

    #header {
        background: none;
    }

    .index {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        min-width: 1200px;
    }

    #content {
        padding: 0 160px;
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
        display: flex;
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

    .sendCommentShadow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: gray;
    }

    .star {
        cursor: pointer;
        color: #757575;
        height: 30px;
    }

    .star:hover {
        color: #1890ff;
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

    #layout {
        background-color: white;
    }

    [v-cloak] {
        display: none
    }
</style>