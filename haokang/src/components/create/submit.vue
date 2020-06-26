<template>
        <Tabs value="video" :animated="false">
            <TabPane label="视频投稿" name="video">
                <VideoSubmit></VideoSubmit>
            </TabPane>
            <TabPane label="文章投稿" name="article">
                <ArticleSubmit></ArticleSubmit>
            </TabPane>
        </Tabs>
</template>

<script>
    import VideoSubmit from "./videoSubmit";
    import ArticleSubmit from "./articleSubmit";
    export default {
        name: "submit",
        components: {ArticleSubmit, VideoSubmit}
    }
</script>

<style scoped>

</style>