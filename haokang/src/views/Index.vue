<template>
    <div class="index">
        <Layout>
            <Header id="header">
            </Header>
            <Content id="content" >
                <ClassifyMzc :data="classifyData" ></ClassifyMzc>
                <RecommendMzc></RecommendMzc>
                <AnimateMzc ></AnimateMzc>
<!--                <AnimateMzc></AnimateMzc>-->
<!--                <AnimateMzc></AnimateMzc>-->
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
    import AnimateMzc from "../components/index/animate-mzc";
    import FooterZzj from "../components/index/footer-zzj";
    export default {
        name: "Index",
        components: {FooterZzj, AnimateMzc, RecommendMzc, ClassifyMzc},
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