<template>
    <div class="info-box" @click="toVideo" :style="{'background-image':'url('+info.viewCoverUrl+')','background-size':'100% 120px'}">
        <div class="info-box1">
            <div style="height: 100%;width: 90%;text-align: left;margin:0 auto;display: flex;flex-direction: column;justify-content: space-between">
                <p style="margin-top: 10px;font-size: 16px">{{info.title}}</p>
                <p style="color: #e0e0e0; font-size: 12px;">{{info.member.nickname}}
                <p style="font-size: 12px;color: #e0e0e0">{{info.viewCount}}播放</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: ['info'],
        methods:{
            toVideo(){
                let that=this;
                let obj=that.$router.resolve(
                    {
                        path: '/v',
                        query: {
                            videoId: that.info.id
                        }
                    }
                )
                window.open(obj.href,"_blank")
            }
        }
    }
</script>

<style scoped>
    .info-box {
        height: 120px;
        border: solid 1px rgba(0, 0, 0, 0);
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .info-box1 {
        height: 120px;
        background-color: rgba(0, 0, 0, 0);
        border: solid 1px rgba(0, 0, 0, 0);
        margin-top: 85px;
        transition: all 0.4s;
    }

    .info-box1:hover {
        cursor: pointer;
        transform: translate(0, -85px);
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);

    }

    .info-box:hover .info-box1 {
        cursor: pointer;
        transform: translate(0, -85px);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .info-box:hover p {
        color: aliceblue;
        word-wrap: normal;
        font-size: 14px;
        line-height: 25px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .info-box1 p {
        color: aliceblue;
        word-wrap: normal;
        font-size: 14px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

</style>