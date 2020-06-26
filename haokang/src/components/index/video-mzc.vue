<template>
    <div  >
        <Row :gutter="10">
            <Col span="16" >
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px;padding-left: 16px;align-items: center">
                    <slot><Icon type="logo-youtube" size="30" style="margin-right: 10px"/>视频</slot>
                </div>
                <Row :gutter="10" style="padding: 8px 16px;">
                    <template v-for="(item,index) in videoData">
                        <Col span="6" :key="index">
                            <VideoCard  :key="item.id" :videoData="item">{{item}}</VideoCard>
                        </Col>
                    </template>
                </Row>
            </Col>
            <Col span="8">
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px;align-items: center">
                    <Icon type="md-podium" size="30" style="margin-right: 10px" />排行榜
                </div>
                <RankMzc :rankData="rankData" style="overflow: hidden"></RankMzc>
            </Col>
        </Row>

    </div>
</template>

<script>
    import VideoCard from "@/components/index/videoCard-mzc"
    import RankMzc from "@/components/index/rank-mzc";

    export default {
        name: "video-mzc",
        props: {
            videoClassify: Object
        },
        data() {
            return {
                rankData: [],
                videoData: []
            }
        },
        created() {
            //根据类别获取
            let that = this;
            that.axios.get('/video/v/page/classify/' + that.videoClassify.id,
                {
                    params: {
                        pageIndex: 1,
                        pageNum: 8
                    }
                }
            ).then(function (res) {
                    that.videoData = res.data.data;
                });
            // 获取视频排行榜
            that.axios.get('/video/v/rank/' + that.videoClassify.id)
                .then(function (res) {
                    if(res.data.code==0){
                        that.rankData = res.data.data;
                    }

                })
        },
        components: {RankMzc, VideoCard}
    }
</script>

<style scoped>

</style>