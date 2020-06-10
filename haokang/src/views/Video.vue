<template>
    <div>
        <div class="app">
            <vue-baberrage class="baberrage" :loop="barrageLoop" :is-show="barrageIsShow" :barrage-list="barrageList">
            </vue-baberrage>
        </div>
        <button @click="addToList">123</button>
    </div>

</template>

<script>
    import {MESSAGE_TYPE} from "vue-baberrage";
    export default {
        name: "Video",
        data() {
            return {
                options: {
                    lang: 'zh-cn',
                    logo: 'haokang',
                    video: {
                        pic: '/img/1.jpg',
                        url: '/video/1.mp4'
                    },
                },
                msg: 'Hello vue-baberrage',
                barrageIsShow: true,
                currentId: 0,
                barrageLoop: false,
                barrageList: this.$store.barrageList
            }
        },
        components: {

        },
        methods: {
            play() {

            },
            addToList() {
                let info={
                    id: ++this.currentId,
                    avatar: "/img/1.jpg",
                    msg: this.msg,
                    time: 5,
                    type: MESSAGE_TYPE.NORMAL,
                }
               this.$store.commit('addToList',info);
            }
        }
    }
</script>

<style scoped>
    .app{
        position: relative;;
        width: 500px;
        height: 400px;
        margin: 0 auto;
        background-color: black;
    }
    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        height: 400px;
        z-index: 1;
    }
    .baberrage{
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        height: 400px;
        z-index: 2;

    }
</style>
<style>

</style>