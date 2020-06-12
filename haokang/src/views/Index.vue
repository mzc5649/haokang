<template>
    <div class="index">
        <Layout>
            <Header id="header">
            </Header>
            <Content id="content" >
                <ClassifyMzc :data="classifyData" ></ClassifyMzc>
                <RecommendMzc></RecommendMzc>
                <SortMzc>
                    <template v-slot:sort>
                       动画
                    </template>
                    <template v-slot:video>
                        <VideoMzc></VideoMzc>
                    </template>
                    <template v-slot:article>
                        <ArticleMzc></ArticleMzc>
                    </template>
                </SortMzc>
                <SortMzc>
                    <template v-slot:sort>
                        搞笑
                    </template>
                    <template v-slot:video>
                        <VideoMzc></VideoMzc>
                    </template>
                    <template v-slot:article>
                        <ArticleMzc></ArticleMzc>
                    </template>
                </SortMzc>

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
    import ClassifyMzc from "../components/index/classify-mzc";
    import RecommendMzc from "../components/index/recommend-mzc";
    import VideoMzc from "../components/index/video-mzc";
    import FooterZzj from "../components/index/footer-zzj";
    import SortMzc from "../components/index/sort-mzc";
    import ArticleMzc from "../components/index/article-mzc";
    export default {
        name: "Index",
        components: { SortMzc, FooterZzj, VideoMzc, RecommendMzc, ClassifyMzc,ArticleMzc},
        data(){
            return{
                classifyData:["动画","电影","舞蹈","知识","科技","动画","电影","舞蹈","知识","科技","动画","电影","舞蹈","知识","科技","动画"],
                value1:0,


            }
        },
        comments:{
            ClassifyMzc
        }

    }

</script>
<style >

</style>
<style scoped>
    #header {
        background: none;
    }
    .index{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    #content{
        padding: 0 100px;
    }
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>