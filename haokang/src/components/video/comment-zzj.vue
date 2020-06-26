<template>
    <div class="comment-main">
        <div class="comment-list">
            <div class="comment-list-reply-area">
                <img :src="videoComment.member.icon"
                     style="border-radius: 50%;width: 48px; height: 48px;margin-top: 24px;"/>
                <div class="reply-area-total">
                    <div class="user-name">
                        <Poptip trigger="hover" placement="top-start" @on-popper-show="onPopperShow">
                            <a class="preview" href="#" id="username">
                                {{videoComment.member.nickname}}
                            </a>
                            <template slot="content">
                                <MemberCard :member-info="videoComment.member"></MemberCard>
                            </template>
                        </Poptip>
                    </div>
                    <div v-text="videoComment.content" style="display: flex;white-space: pre-wrap;text-align: left">

                    </div>
                    <div class="user-name-info">
                            <span class="phone-type-time">
                                {{videoComment.createTime}}
                            </span>
                        <span style="font-size: 12px;cursor: pointer" @click="replyShowBtn">
                                回复
                            </span>
                    </div>
                    <div v-show="isReplyShow">
                        <Form style="display: flex;width: 100%;align-items: center;position: relative" :disabled="!isLogin">
                            <Avatar icon="ios-person" :src="$store.state.memberInfo.icon"
                                    style="min-width: 48px; min-height: 48px;border-radius: 50%;font-size: 24px;line-height: 48px"/>
                            <Input v-model="inputReplyComment" type="textarea"
                                   style="margin-left: 32px;margin-right: 10px"
                                   placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                                   show-word-limit
                                   maxlength="200"
                            ></Input>
                            <Button type="primary" @click="sendReplyComment">发表评论</Button>
                            <span v-show="!isLogin" class="sendRplyCommentShadow">请先<router-link to="/login"
                                    target="_blank">登录</router-link>或<router-link
                                    to="/register" target="_blank">注册</router-link></span>
                        </Form>
                    </div>
                    <!--回复列表展示-->
                    <div style="position: relative">
                        <Spin size="large" fix v-if="commentSpin"></Spin>
                        <template v-for="item in videoCommentReplyData" v-cloak>
                            <CommentReplyZzj :key="item.id" :video-comment-reply-data="item">
                            </CommentReplyZzj>
                        </template>
                    </div>
                    <div style="font-size: 12px;text-align: left;color: #6d757a" v-show="videoCommentReplyPage.total>3">
                        共<b>{{videoCommentReplyPage.total}}</b>条
                        <a v-show="isMoreReplyShow" @click="moreReply">点击查看</a>
                    </div>
                    <!--分页-->
                    <div v-show="!isMoreReplyShow">
                        <Page @on-change="onChangeReplyPage" :page-size="videoCommentReplyPage.pageNum"
                              :current="videoCommentReplyPage.currentPage" :total="videoCommentReplyPage.total" simple/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentReplyZzj from "./comment-reply-zzj";

    export default {
        name: "comment-zzj",
        components: {
            CommentReplyZzj,
            MemberCard: resolve => require(['./member-card'], resolve),
        },
        data() {
            return {
                commentSpin: true,
                isMoreReplyShow: true,
                isReplyShow: false,
                inputReplyComment: '',
                videoCommentReplyData: [],
                videoCommentReplyPage: {
                    total: 0,
                    currentPage: 1,
                    pageNum: 3
                },
            }

        },
        props: {
            videoComment: Object,
            isLogin:Boolean
        },
        created() {
            let that = this;
            /*获取该评论下的所有回复*/
            that.getVideoCommentReplyData();
            /*获取该评论下的数量*/
            that.getVideoCommentReplyTotal();
        },
        mounted() {

        },
        methods: {
            onPopperShow() {

            },
            replyShowBtn() {
                this.isReplyShow = !this.isReplyShow
            },
            //发送回复评论按钮
            sendReplyComment() {
                let that = this;
                let str = that.inputReplyComment;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (str == '' || str.length == 0) {
                    that.$Message.info("评论不能为空");
                    return;
                }
                let data = {
                    commentId: that.videoComment.id,
                    memberId: that.$store.state.m_id,
                    content: that.inputReplyComment
                }
                //添加评论的回复
                that.axios.post('/video/vcomrp/',
                    data
                ).then(function (res) {
                    if (res.data.code == 0) {
                        that.$Message.success("评论成功");
                        that.inputReplyComment = ''
                        /*获取该评论下的所有回复*/
                        that.getVideoCommentReplyData();
                        /*获取该评论下的数量*/
                        that.getVideoCommentReplyTotal();
                    } else {
                        that.$Message.error("评论失败");
                    }
                }).catch(function () {
                    that.$Message.error("评论失败");
                })
            },
            /*更多回复信息按钮*/
            moreReply() {
                let that = this;
                that.commentSpin = true;
                that.isMoreReplyShow = false;
                that.videoCommentReplyPage.pageNum = 10;
                that.getVideoCommentReplyData();
            },
            //切换页数时
            onChangeReplyPage(pageIndex) {
                let that = this;
                that.commentSpin = true;
                that.videoCommentReplyPage.currentPage = pageIndex;
                this.getVideoCommentReplyData();
            },
            //获取回复数据
            getVideoCommentReplyData() {
                let that = this;
                /*获取该评论下的所有回复*/
                that.axios.get("/video/vcomrp/cid/" + that.videoComment.id,
                    {
                        params: {
                            currentPage: that.videoCommentReplyPage.currentPage,
                            pageNum: that.videoCommentReplyPage.pageNum
                        }
                    }).then(function (res) {
                    that.videoCommentReplyData = res.data.data;
                    that.commentSpin = false;
                })
            },
            //获取回复数据数量
            getVideoCommentReplyTotal() {
                let that = this;
                /*获取该评论下的数量*/
                that.axios.get("/video/vcomrp/count/cid/" + that.videoComment.id)
                    .then(function (res) {
                        that.videoCommentReplyPage.total = res.data.data;
                    })
            }

        }
    }

</script>

<style scoped>


    .comment-main {
        width: 100%;
        height: auto;
    }

    .header-paging-box a {
        font-size: 12px;
        text-decoration: none;
        color: #212121;
        font-weight: 500;
    }

    .header-paging-box a:hover {
        color: rgb(0, 161, 214);
    }

    .comment-list {
        width: 100%;
    }

    .comment-list-reply-area {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
    }

    .reply-area-total {
        width: 100%;
        height: auto;
        margin-left: 32px;
        padding: 22px 0px 14px;
        border-top: rgb(239, 233, 239) solid 1px;
        display: flex;
        flex-direction: column;
    }

    .user-name {
        display: flex;
        justify-content: flex-start;
        position: relative;
    }

    #username {
        font-size: 12px;
        text-decoration: none;
        color: rgb(109, 117, 122);
        font-weight: 900;
    }

    #username:hover {
        color: rgb(0, 181, 229);
    }

    .p-text {
        display: flex;
        word-break: normal;
        flex-wrap: wrap;
        font-size: 14px;
        color: #222222;
        margin-top: 0px;
        margin-bottom: 0px;
        padding-top: 2px;
        padding-bottom: 2px;
        text-align: left;
    }

    .user-name-info {
        height: 26px;
        display: flex;
        align-items: center;
        color: rgb(153, 162, 170);
    }

    .phone-type-time {
        font-size: 12px;
        margin-right: 20px;
    }
    .sendRplyCommentShadow{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 18px;
        color: gray;
    }

</style>
<style>
    .ivu-poptip-arrow {
        display: none;
    }

    .ivu-poptip-body {
        padding: 0;
    }

    .ivu-poptip-body-content {
        overflow: hidden;
    }

    [v-cloak] {
        display: none
    }
</style>