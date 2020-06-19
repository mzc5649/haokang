<template>
    <div>
        <div id="preview" class="hoverwindow-test">
            <div class="hoverwindow-down">
                <img :src="memberInfo.icon" style="border-radius: 50%;width: 48px; height: 48px;position: absolute;margin-left: 24px;margin-top: -18px;"/>
                <div class="hoverdetail">
                    <div class="hover-username">{{memberInfo.nickname}}</div>
                    <div class="hover-username-fans">
                        <span class="hover-username-fans-span">性别：{{memberInfo.gender}}</span>
                        <span class="hover-username-fans-span">金币：{{memberInfo.account}}</span>
                    </div>
                    <div class="hover-introduce">
                        <span class="hover-introduce-span">{{memberInfo.sign}}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "member-card",
        props:{
            memberInfo:Object,
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .hoverwindow-test{
        width: 379px;
        border-top: rgba(0,0,0,0.15) solid 0.5px;
        border-left: rgba(0,0,0,0.15) solid 0.5px;
        border-bottom: rgba(0,0,0,0.15) solid 3px;
        border-right: rgba(0,0,0,0.15) solid 2px;
        background-color: rgb(255,255,255);
    }

    .hoverwindow-down{
        width: 379px;
        height: 155px;
        display: flex;
        flex-direction: row;
    }
    .hoverdetail{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 13px;
    }
    .hover-username{
        font-size: 14px;
        font-weight: 900;
        color: #212121;
    }
    .hover-username-fans{
        margin-top: 10px;
    }
    .hover-username-fans-span{
        font-size: 12px;
        margin-top: 10px;
        margin-right: 10px;
    }
    .hover-introduce{
        margin-top: 10px;
    }
    .hover-introduce-span{
        font-size: 12px;
        color: #99A2AA;
    }


</style>