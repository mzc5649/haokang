<template>
    <div  class="videoCardRow"
         style="display: flex;padding: 20px; border: 1px solid #dcdee2;border-radius: 6px;margin-bottom: 10px">
        <Row :gutter="20">
            <Col span="10">
                <div style="width: 100%;height: 100px;cursor: pointer" @click="toVideo(videoData.id)">
                    <img :src="videoData.viewCoverUrl" style="width: 100%;height: 100%;border-radius: 4px">
                </div>
            </Col>
            <Col span="14">
                <div style="width: 100%;height: 100px;text-align: left">
                    <div style="height: 20px;line-height: 20px;overflow: hidden;font-size: 12px;">
                        <a href="javascript:void(0)" class="videoA" @click="toVideo(videoData.id)">
                            {{videoData.title}}
                        </a>
                    </div>
                    <div style="height: 60px;padding: 10px 0;line-height: 20px;overflow: hidden;font-size: 12px;color: rgb(153, 162, 170);">
                        {{videoData.videoDescribe}}
                    </div>
                    <div style="height: 20px;line-height: 20px;font-size: 12px;color: rgb(153, 162, 170);">
                        <span style="float: left">
                            {{videoData.member.nickname}}
                        </span>
                        <span style="float: right">
                            <span style="margin-right: 10px">
                           <Icon type="logo-youtube"/>{{videoData.viewCount}}
                               </span>
                              <span>
                            <Icon type="ios-time"/><Time :time="videoData.createTime" :interval="1"/>
                              </span>
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "videoCardRow",
        props: {
            videoData: Object
        },
        methods: {
            toVideo(id) {
                let that = this;
                let obj = that.$router.resolve(
                    {
                        path: '/v',
                        query: {
                            videoId: id
                        }
                    }
                );
                window.open(obj.href, "_blank")
            }
        }
    }
</script>

<style scoped>
    .videoA {
        color: black;
    }

    .videoA:hover {
        color: #00a1d6;
        cursor: pointer;
    }

    .videoCardRow:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .videoCardRow:hover .videoA {
        color: #00a1d6;;
    }
</style>