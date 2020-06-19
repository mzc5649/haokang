<template>
    <div class="comment-reply">
        <div class="reply-detail">
            <a class="reply-detail-head" href="#">
                <img :src="videoCommentReplyData.member.icon" style="border-radius: 50%; width: 24px;height: 24px;margin-right: 10px;" />
            </a>
            <div class="reply-detail-head-right">
                <div class="reply-detail-right">
                    <Poptip trigger="hover" placement="top-start" @on-popper-show="onPopperShow">
                        <a class="username"  id="username">
                            {{videoCommentReplyData.member.nickname}}
                        </a>
                        <template slot="content">
                            <MemberCard :member-info="videoCommentReplyData.member"></MemberCard>
                        </template>
                    </Poptip>
                    <div class="many-txt">
                        <p style="display: flex;text-align: left">
                            {{videoCommentReplyData.content}}
                        </p>
                    </div>
                </div>
                <div class="reply-detail-right-down">
                    <span class="reply-time">
                        {{videoCommentReplyData.createTime}}
                    </span>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import MemberCard from "./member-card";
    export default {
        name: "comment-reply-zzj",
        components: {MemberCard},
        data(){
            return{
                memberInfo:''
            }
        },
        props:{
            videoCommentReplyData:Object
        },
        methods:{
            onPopperShow() {

            },
        },
        mounted() {

        }
    }

</script>

<style scoped>
    .comment-reply{
        width: 100%;
        height: auto;
    }
    .reply-detail{
        min-height: 51.77px;
        padding: 10px 0px;
        display: flex;
        flex-direction: row;
    }
    .reply-detail-head{
        height: 24px;
    }
    .reply-detail-right{
        width: auto;
        display: flex;
    }
    .username{
        display: block;
        font-size: 12px;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        color: #6d757a;
        text-decoration: none;
        font-weight: 900;
        margin-right: 10px;
    }
    .username:hover{
        color: rgb(0,181,229);
    }
    .reply-detail-head-right{

        display: flex;
        flex-direction: column;
    }
    .many-txt{
        width: 550px;
        height: auto;
        overflow:hidden;
        word-wrap: break-word;
        font-size: 14px;
        color: #222222;
        margin-left: 10px;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    .all-txt{
        width: 550px;
        height: auto;
        overflow:hidden;
        word-wrap: break-word;
        font-size: 14px;
        color: #222222;
        margin-left: 10px;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 100;
    }
    .reply-detail-right-down{
        height: 26px;
        align-items: center;
        display: flex;
        flex-direction: row;
    }
    .reply-time{
        height: 16px;
        color: #99a2aa;
        font-size: 12px;
        margin-right: 20px;
    }
    .reply-time-a2{
        text-decoration: none;
        color: #99A2AA;
    }
    .reply-time-a2:hover{
        color: rgb(0,181,229);
    }
    .txt-botton{
        border-radius: 4px;
        text-align: center;
        vertical-align: top;
        cursor: pointer;
        background-color: #00A1D6;
        border: #00A1D6 solid 1px;
        transition: .1s;
        color: #fff;
        user-select: none;
        outline:none
    }
</style>