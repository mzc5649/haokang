<template>
    <div class="card">
        <Row :gutter="20">
            <Col span="10">
                <div style="width: 100%;height: 100px">
                    <img :src="videoInfo.viewCoverUrl" style="width: 100%;height: 100%;border-radius: 4px">
                </div>
            </Col>
            <Col span="14">
                <div style="width: 100%;height: 100px;text-align: left">
                    <div style="height: 20px;line-height: 20px;overflow: hidden;font-size: 12px;">
                        <a href="javascript:void(0)" style="color: black">
                            {{videoInfo.title}}
                        </a>
                    </div>
                    <div style="height: 60px;padding: 10px 0;line-height: 20px;overflow: hidden;font-size: 12px;color: rgb(153, 162, 170);">
                        {{videoInfo.videoDescribe}}
                    </div>
                    <div style="height: 20px;line-height: 20px;font-size: 12px;color: rgb(153, 162, 170);display: flex;justify-content: space-between">
                        <span style="">
                            {{member.nickname}}
                        </span>
                        <span style="">
                           <Icon type="logo-youtube"/>
                        {{videoInfo.viewCount}}
                        </span>
                        <span style="">
                           <Icon type="ios-time" />
                        <Time :time="videoInfo.createTime" :interval="1" />
                        </span>

                    </div>
                </div>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: "videoCardRank",
        data(){
            return{
                member:{},
            }
        },
        props: {
            videoInfo: Object
        },
        created() {
            let that=this;
            let m_id=that.videoInfo.member_id;
            //获取用户信息
            that.axios.get("/member/m/" + m_id)
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.member=res.data.data;
                    }
                })


        }
    }
</script>

<style scoped>
    .card {
        width: 300px;
        padding: 10px;
        background-color: white;
    }
</style>