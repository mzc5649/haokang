<template>
    <div style="border:3px red solid">
        <Row class="classify">
            <Col span="6">
                1
            </Col>
            <Col span="12">
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
            <Col span="6">
                3
            </Col>
        </Row>

    </div>

</template>

<script>

    export default {
        name: "classify-mzc",
        components: {},
        props: {
            data: Array,
            checkId:String
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


</style>