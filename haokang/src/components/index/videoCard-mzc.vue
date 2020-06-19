<template>
    <div class="box-1" data-aos="fade-up">
        <div class="box-2" :style="{'background-image':poster,'background-size':'cover'}" @click="toVideo">
            <p style="position: absolute;bottom: 0;left:5px;color: white">
                <Icon type="logo-youtube"/>
                <span style="margin-left: 5px">{{videoData.viewCount}}</span>
            </p>
        </div>
        <div class="title" @click="toVideo">
            {{videoData.title}}
        </div>
        <div class="author">
            {{videoData.member.nickname}}
        </div>
    </div>

</template>

<script>
    export default {
        name: "videoCard-mzc",
        props: {
            videoData: Object,

        },
        data() {
            return {
                poster: 'url(' + this.videoData.viewCoverUrl + ')',
            }
        },
        methods: {
            toVideo() {
                let that=this;
                let obj=that.$router.resolve(
                    {
                        path: '/video',
                        query: {
                            videoId: that.videoData.id
                        }
                    }
                );
                window.open(obj.href,"_blank")
            }
        }
    }
</script>

<style scoped>
    .box-1 {
        height: 190px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .box-2 {
        height: 120px;
        background-size: 100%, 120px;
        position: relative;
        cursor: pointer;
    }

    .title {
        height: 32px;
        font-size: 14px;
        color: black;
        text-decoration: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 10px;
        margin-bottom: 8px;
        padding-right: 12px;
        text-align: left;
        overflow: hidden;
        cursor: pointer;
    }

    .title:hover {
        color: blue;
    }

    .author {
        height: 20px;
        font-size: 12px;
        color: #999999;
        text-align: left;
    }
</style>