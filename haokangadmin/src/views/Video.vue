<template>
    <Layout>
            <Sider style="max-width: 110px;min-width: 110px">
                    <VideoSide></VideoSide>
            </Sider>
            <Content>
                    <router-view :key="$route.path+$route.query.classifyId"></router-view>
            </Content>
    </Layout>
</template>

<script>
    import VideoSide from "@/components/video/VideoSide";
    export default {
        name: "Video",
        components: {VideoSide},
        data() {
            return {
            }
        },
        methods:{

        },


    }
</script>

<style scoped>

</style>