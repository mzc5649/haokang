<template>
    <div class="box-1" data-aos="fade-up">
        <div class="box-2">
            <p style="position: absolute;bottom: 0;color: white">{{videoData.playNum}}</p>
        </div>
        <a href="#" class="title">
            {{videoData.title}}
        </a>
        <div class="author">
            {{videoData.author}}
        </div>
    </div>

</template>

<script>
    export default {
        name: "videoCard-mzc",
        props:['videoData']
    }
</script>

<style scoped>
    .box-1 {
        height: 190px;
        overflow: hidden;
    }

    .box-2 {
        height: 120px;
        background-image: url(/img/1.jpg);
        background-size: 100%, 120px;
        position: relative;
    }

    .title{
        height: 32px;
        font-size: 12px;
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
    }

    .title:hover {
        color: blue;
    }
    .author{
        height: 20px;
        font-size: 12px;
        color: #999999;
        text-align: left;
    }
</style>