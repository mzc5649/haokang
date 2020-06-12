<template>
    <div class="animate">
        <Row :gutter="10">
            <Col span="16">
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px">
                    <slot>文章</slot>
                </div>
                <Row :gutter="10">
                    <ArticleCardLzr></ArticleCardLzr>
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

    import RankMzc from "@/components/index/rank-mzc";
    import ArticleCardLzr from "@/components/index/articleCard-lzr";

    export default {
        name: "video-mzc",
        data() {
            return {}
        },
        components:{RankMzc,ArticleCardLzr}
    }
</script>

<style scoped>

</style>