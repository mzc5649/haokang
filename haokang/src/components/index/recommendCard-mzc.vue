<template>

    <div class="info-box" :style="info.style">
        <div class="info-box1">
            <div style="width: 90%;text-align: left;margin:0 auto">
                <p style="margin-top: 8px;">{{info.title}}</p>
                <p style="line-height: 23px; color: #F0F8FF; font-size: 10px; margin-top: 10px;">{{info.author}}
                <p>
                <p style="font-size: 10px;">{{info.playNum}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: ['info']
    }
</script>

<style scoped>
    .info-box {
        height: 120px;
        border: solid 1px rgba(0, 0, 0, 0);
        overflow: hidden;
        margin-bottom: 10px;

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