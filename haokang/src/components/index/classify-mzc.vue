<template>
    <div >
        <Row class="classify">
            <Col span="4" >
                <img src="/img/bar/hao.png" style="width: 100%;">
            </Col>
            <Col span="16" style="padding: 8px 16px;">
                <div style="min-height: 60px;height: 60px;font-size: 18px;position: relative" v-cloak>
                    <div style="position: absolute;left: 0;top: 50%;transform: translateY(-50%);font-size: 15px;font-weight: 700">
                        一言：
                    </div>
                    <span style="position: absolute;right: 0;top: 0;font-size: 12px;font-weight: 700"><Time :time="time" :interval="1"/></span>
                    <div v-show="wordShow" class="animate__animated animate__bounce">
                       <div style="height: 30px;line-height: 30px;overflow: hidden;display: flex;align-items: center;justify-content: center">{{wordData.hitokoto}}</div>
                        <div style="height: 30px;line-height: 18px;display: flex;align-items: center;justify-content: flex-end">『{{wordData.from}}』</div>
                    </div>
                </div>
                <div class="classify-mid">
                    <template v-for="(item , index) in data">
                        <template v-if="checkId==item.id"  >
                                <a :key="index" class="classify-item" style="color: #00a1d6" @click="toClassify(item.id)">
                                    {{item.classifyName}}
                                </a>
                        </template>
                        <template v-else >
                                <a :key="index" class="classify-item" @click="toClassify(item.id)">
                                    {{item.classifyName}}
                                </a>
                        </template>
                    </template>
                </div>

            </Col>
            <Col span="4">
                <img src="/img/bar/kang.png" style="width: 100%;">
            </Col>
        </Row>

    </div>

</template>

<script>

    export default {

        name: "classify-mzc",
        time:'',
        components: {},
        props: {
            data: Array,
            checkId:String,

        },
        data(){
          return{
              wordData: {
                  from: "",
                  hitokoto: "",
              },
              wordShow:true
          }
        },
        created() {
          let that=this;
          that.getWord();
          setInterval(that.getWord,"10000")
        },
        methods:{
            toClassify(id){
                let that=this;
                let obj=that.$router.resolve(
                    {
                        path: '/classify',
                        query: {
                            classifyId: id
                        }
                    }
                );
                window.open(obj.href,"_self")
            },
            getWord(){
                let that=this;
                let curTime=new Date();
                curTime.setSeconds(curTime.getSeconds()+11)
                that.time=curTime;
                that.wordShow=false;
                that.axios.get('https://v1.hitokoto.cn/?c=a&c=b&c=c&c=j')
                .then(function (res) {
                    that.wordShow=true;
                    that.wordData=res.data;
                })
            }
        }
    }

</script>

<style scoped>
    .classify {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .classify-mid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border: 1px solid #dcdee2;border-radius: 6px;
    }

    .classify-item {
        display: flex;
        align-items: center;
        font-size: 15px;
        height: 30px;
        width: 70px;
        color: black;
        justify-content: center;
    }

    .classify-item:hover {
        color: #2d8cf0;
    }
    .ivu-poptip-body {
        padding: 0;
    }

    .ivu-poptip-body-content {
        overflow: hidden;
    }
</style>
<style>

    [v-cloak]{
        display: none;
    }
</style>