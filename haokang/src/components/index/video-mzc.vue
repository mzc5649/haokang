<template>
    <div class="animate">
        <Row :gutter="10">
            <Col span="16">
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px">
                    <slot>视频</slot>
                </div>
                <Row :gutter="10">
                    <template v-for="(item,index) in videoData">
                        <Col span="6" :key="index">
                            <VideoCard :key="index"  :videoData="item">{{item}}</VideoCard>
                        </Col>
                    </template>
                </Row>
            </Col>
            <Col span="8">
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px">
                    排行榜
                </div>
                <RankMzc :data="rankData"></RankMzc>
            </Col>
        </Row>

    </div>
</template>

<script>
    import VideoCard from "@/components/index/videoCard-mzc"
    import RankMzc from "@/components/index/rank-mzc";

    export default {
        name: "animate-mzc",
        data() {
            return {
                rankData: [{
                    title: 'mmmmmm'
                }
                ],
                videoData: [

                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    },
                    {
                        title: '123123',
                        author: 'mzc',
                        playNum: 100
                    }

                ]
            }
        },
        components: {RankMzc, VideoCard}
    }
</script>

<style scoped>

</style>