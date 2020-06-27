<template>
    <div data-aos="fade-up" style="height: 416px;border: 1px solid #dcdee2;border-radius: 6px;padding: 8px 16px;">
        <template v-for="(item,index) in rankData">
            <div v-if="(index+1)==1" :key="index+1">
                <div :key="index+1" style="display: flex;margin-bottom: 18px" data-aos="fade-left">
                    <div class="rank-first">
                        <span class="number on">{{index+1}}</span>
                        <Poptip trigger="hover" placement="top-start"
                                @on-popper-show="onPopperShow(item.member_id)" :transfer="true" offset="20">
                            <div class="preview">
                                <img :src="item.viewCoverUrl" style="width:112px;cursor: pointer;height: 58px"
                                     @click="toVideo(item.id)"/>
                                <div class="txt1">
                                    <!--弹窗-->
                                    <p :title="item.title">
                                        <a @click="toVideo(item.id)" href="javascript:void(0)">
                                            {{item.title}}
                                        </a>
                                    </p>
                                    <span class="zonghe">
                                播放量:{{item.viewCount}}
                                </span>
                                </div>
                            </div>
                            <template slot="content">
                                <VideoCardRank :video-info="item"></VideoCardRank>
                            </template>
                        </Poptip>
                    </div>
                </div>
            </div>
            <div v-else-if="(index+1)<4" :key="index+1">
                <div :key="index+1"
                     style="height: 20px;margin-bottom:18px;display: flex;align-items: center;position:relative;z-index: 2"
                     data-aos="fade-left">
                    <div class="number on">{{index+1}}</div>
                    <div class="otherTitle" @click="toVideo(item.id)">
                        <!--弹窗-->
                        <Poptip trigger="hover" placement="top-start" @on-popper-show="onPopperShow(item.member_id)"
                                :transfer="true">
                            {{item.title}}
                            <template slot="content">
                                <VideoCardRank :video-info="item"></VideoCardRank>
                            </template>
                        </Poptip>
                    </div>
                </div>
            </div>
            <div v-else-if="(index+1)<10" :key="index+1">
                <div :key="index+1"
                     style="height: 20px;margin-bottom:18px;display: flex;align-items: center;position:relative;z-index: 2"
                     data-aos="fade-left">
                    <div class="number">{{index+1}}</div>
                    <div class="otherTitle" @click="toVideo(item.id)">
                        <!--弹窗-->
                        <Poptip trigger="hover" placement="top-start" @on-popper-show="onPopperShow(item.member_id)"
                                :transfer="true">
                            {{item.title}}
                            <template slot="content">
                                <VideoCardRank :video-info="item"></VideoCardRank>
                            </template>
                        </Poptip>
                    </div>
                </div>
            </div>
            <div v-else :key="index+1">
                <div :key="index+1" style="height: 20px;display: flex;align-items: center;position:relative;z-index: 2"
                     data-aos="fade-left">
                    <div class="number">{{index+1}}</div>
                    <div class="otherTitle" @click="toVideo(item.id)">
                        <!--弹窗-->
                        <Poptip trigger="hover" placement="top-start" @on-popper-show="onPopperShow(item.member_id) "
                                :transfer="true">
                            {{item.title}}
                            <template slot="content">
                                <VideoCardRank :video-info="item"></VideoCardRank>
                            </template>
                        </Poptip>
                    </div>
                </div>
            </div>


        </template>
    </div>
</template>

<script>
    import VideoCardRank from "../rank/videoCardRank";

    export default {
        name: "rank-mzc",
        components: {VideoCardRank},
        props: ['rankData'],
        methods: {
            //跳转到对应视频
            toVideo(id) {
                let that = this;
                let obj = that.$router.resolve(
                    {
                        path: '/v',
                        query: {
                            videoId: id
                        }
                    }
                )
                window.open(obj.href, "_blank")
            },
            onPopperShow(id) {
                console.log(id)
            }
        }
    }
</script>

<style scoped>
    .otherTitle {
        margin-left: 20px;
        width: 100%;
        text-align: left;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        line-height: 20px;
        height: 20px;
        white-space: nowrap;

    }

    .otherTitle:hover {
        color: rgb(0, 161, 214);;
    }

    .rank-first {
        width: 100%;
        height: 58px;
        display: flex;

    }

    .rank-header a {
        text-decoration: none;
        border: silver solid 1px;
        width: 58px;
        height: 22px;
        padding: 0 0 0 12px;
        font-size: 14px;
        color: #212121;
        margin-left: 180px;
    }

    .number.on {
        color: #fff;
        background-color: #00a1d6;
        width: 18px;
        min-width: 18px;
        height: 18px;
        text-align: center;
        border-radius: 2px;
        display: inline-block;
        line-height: 18px;
    }

    .preview {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        align-items: center;
        overflow: hidden;
    }

    .txt1 {
        width: 100%;
        height: 64px;
        margin-left: 12px;
        display: flex;
        flex-direction: column;

    }

    .txt1 a {
        width: 100%;
        height: 45px;
        padding: 0;
        margin-top: 0;
        font-size: 14px;
        text-decoration: none;
        color: #212121;
    }

    .txt1 p {
        text-align: left;
        width: 100%;
        height: 40px;
        padding: 0 !important;
        margin-top: 0px;
        margin-bottom: 5px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .zonghe {
        font-size: 12px;
        color: #999999;
        text-align: left;
    }

    .rank-second a {
        width: 290px;
        height: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #212121;
    }

    #second-p {
        width: 290px;
        height: 20px;
        margin-top: 0px;
        margin-bottom: 0px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .rank-third a {
        width: 290px;
        height: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #212121;
    }

    .rank-first a:hover {
        color: rgb(0, 161, 214);
    }

    .rank-header a:hover {
        color: rgb(0, 161, 214);
    }

    .rank-second a:hover {
        color: rgb(0, 161, 214);
    }

    .rank-third a:hover {
        color: rgb(0, 161, 214);
    }

    .rank-third p {
        width: 290px;
        height: 20px;
        margin-top: 0px;
        margin-bottom: 0px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .rank-normal a {
        width: 290px;
        height: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #212121;
    }

    .rank-normal a:hover {
        color: rgb(0, 161, 214);
    }

    .rank-normal p {
        width: 290px;
        height: 20px;
        margin-top: 0px;
        margin-bottom: 0px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .number {
        color: #999999;
        background-color: #FFFFFF;
        width: 18px;
        height: 18px;
        min-width: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 2px;
        display: inline-block;
        line-height: 18px;
        font-size: 14PX;
    }

    .ivu-poptip {
        width: 100%;
    }

    .ivu-poptip-rel {
        width: 100%;
    }
</style>
<style>
    .ivu-poptip-arrow {
        display: none;
    }

    .ivu-poptip-body {
        padding: 0;
    }

    .ivu-poptip-body-content {
        overflow: hidden;
    }

    .ivu-poptip-rel {
        width: 100%;
    }

</style>