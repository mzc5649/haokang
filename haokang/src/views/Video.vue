<template>
    <div class="index">
        <Layout>
            <Header id="header">
            </Header>
            <Content id="content">
                <Row style="display: flex;justify-content: space-between">
                    <Col span="15" style="border: 1px blue solid">
                        <div class="video" ref="videoPlayer">
                            <video-player :options="playerOptions"
                                          @play="onPlayerPlay($event)"
                                          @pause="onPlayerPause($event)"
                                          @ended="onPlayerEnded($event)"
                            ></video-player>
                            <v-barrage
                                    :arr="this.$store.state.danMuList"
                                    :isPause="dm.isPause"
                                    :percent="100"
                                    style="pointer-events: none;z-index: 10;"
                                    v-bind:class="{dmNotShowActive:!dm.isShow}"
                            ></v-barrage>

                        </div>
                        <transition name="custom-classes-transition"
                                    enter-active-class="animate__animated animate__zoomIn"
                                    leave-active-class="animate__animated animate__zoomOut"

                        >
                            <SendDMLzr v-if="dm.isControlShow" @sendDanMu="sendDM" @switchDmShow="switchDmShow"></SendDMLzr>
                        </transition>




                    </Col>
                    <Col span="8" style="border: 1px blue solid">

                    </Col>

                </Row>
                <Row>

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

    export default {
        name: "Video",
        data() {
            return {
                dm:{
                    isControlShow:false,
                    isShow:true,
                    isPause:true,
                    data:[]
                },
                firstPlay:true,
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
                        src: "/video/2.mp4"
                    }],
                    poster: "/img/1.jpg",
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
        components: {SendDMLzr, FooterZzj, videoPlayer, VBarrage},
        methods: {
            //播放视频
            onPlayerPlay() {
                //开启弹幕
                this.dmOpen();
                this.dm.isControlShow=true;
            },
            //暂停视频
            onPlayerPause() {
                this.dmStop();
            },
            //视频播放完毕
            onPlayerEnded(){
                this.dmStop();
                this.dm.isControlShow=false;
                this.firstPlay=false;
            },
            //发送弹幕
            sendDM(data,color){
                let that=this;
                if(data==''||data==null){
                    that.$Message.info({
                        content: '弹幕不能为空哦',
                        duration: 2
                    });
                    return;
                }
                let info={
                        content: data,
                        direction: this.direction,
                        isSelf: true,
                        style: {
                            color: color
                        },
                        isJs: this.isJs,
                };
                this.$store.commit('sendToDanMuList', info);
                let info1={
                    content: data,
                    color: color,
                    m_id:that.$store.state.m_id,
                    v_id:1
                };
                this.axios.post('/dm/v/add',
                info1
                ).then(function () {

                    })
            },
            //弹幕停止
            dmStop(){
                this.dm.isPause=true;
            },
            //弹幕开启
            dmOpen(){
                this.dm.isPause=false;
                if(this.firstPlay){
                    this.firstPlay=false;
                    this.$store.commit("addToDanMuList",this.dm.data)
                }

            },
            //弹幕显示按钮
            switchDmShow(data){
               this.dm.isShow=data;
            }

        },
        created() {
            let that=this;
            this.axios.get('/dm/v/1')
            .then(function (resp ) {
                that.dm.data=resp.data.data;

            })
        },
        mounted() {

        },
        computed:{


        }
    }

</script>

<style scoped>
    .video {
        position: relative;;
        width: 100%;
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
    .dmNotShowActive{
        opacity: 0;
    }
</style>
<style>

</style>