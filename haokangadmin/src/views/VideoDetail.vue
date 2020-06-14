<template>
    <div style="width: 600px;margin: 0 auto;background-color: white;padding: 5px;border-radius: 5px">
        <Form :model="videoData" label-position="left" :label-width="80" label-colon >
            <FormItem label="标题" >
                <Input v-model="videoData.title" :disabled="!isUpdate"></Input>
            </FormItem>
            <FormItem label="类别">
                <Select v-model="videoData.videoClassify.id" style="width:200px" :disabled="!isUpdate">
                    <Option v-for="item in classifyData" :value="item.id" :key="item.id">{{ item.classifyName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="阅读量" >
                <span v-text="videoData.viewCount"></span>
            </FormItem>
            <FormItem label="封面图片" >
                 <span class="image">
                    <img :src="videoData.viewCoverUrl" style="width: 100%;height: 100%">
                    <div class="image-cover">
                        <Icon type="ios-eye-outline" @click="handleView()"></Icon>
                    </div>
                </span>
            </FormItem>
            <FormItem label="创建时间">
                <span  v-text="videoData.createTime"></span>
            </FormItem>
            <FormItem label="修改时间">
                <span  v-text="videoData.modifiedTime" ></span>
            </FormItem>
            <FormItem label="视频">
                <video :src="videoData.videoContent.videoUrl" :poster="videoData.viewCoverUrl"
                       width="480px" height="270px"
                       controls style="object-fit:fill;"></video>
            </FormItem>
            <FormItem>
                <span v-if="!isUpdate">
                    <Button type="primary" @click="isUpdate=!isUpdate">修改</Button>
                </span>
                <span v-else>
                     <Button type="success" @click="isUpdate=!isUpdate">提交</Button>
                     <Button type="warning" style="margin-left: 5px" @click="isUpdate=!isUpdate">取消</Button>
                </span>

            </FormItem>
        </Form>
        <Modal title="查看图片" v-model="imageVisible">
            <img :src="videoData.viewCoverUrl" v-if="imageVisible" style="width: 100%">
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "VideoDetail",
        data() {
            return {
                imageVisible:false,
                isUpdate:false,
                videoData: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    classify_id: '',
                    createTime: '',
                    id: '',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    member_id: '',
                    modifiedTime: '',
                    title: '',
                    videoClassify:
                        {
                            id: '',
                            classifyName: '',
                            classifyNum: ''
                        },
                    videoContent: {
                        videoUrl:''
                    },
                    videoDescribe: '',
                    viewCount: '',
                    viewCoverUrl: '',
                },
                classifyData:[]

            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            that.axios.get('/video/v/' + that.$route.query.id)
                .then(function (res) {
                    that.videoData = res.data.data;
                });
            that.axios.get("/video/vc/")
                .then(function (data) {
                    that.classifyData = data.data.data;
                });
        },
        methods:{
            //查看封面大图
            handleView(){
                this.imageVisible=true;
            },
        }
    }
</script>

<style scoped>
    .image {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        left: 4px;
        z-index: 1;
    }

    .image-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .image:hover .image-cover{
        display: block;
    }
    .image-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>