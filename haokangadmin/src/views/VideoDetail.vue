<template>
    <div style="width: 600px;margin: 0 auto;background-color: white;padding: 5px;border-radius: 5px">
        <Form :model="videoData" label-position="left" :label-width="80" label-colon >
            <FormItem label="标题" >
                <Input v-model="videoData.title" :readonly="!isUpdate" maxlength="20" show-word-limit></Input>
            </FormItem>
            <FormItem label="类别">
                <Select v-model="videoData.videoClassify.id" style="width:200px" :disabled="!isUpdate">
                    <Option v-for="item in classifyData" :value="item.id" :key="item.id">{{ item.classifyName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="简介" >
                <Input type="textarea"  v-model="videoData.videoDescribe" :readonly="!isUpdate" maxlength="200" show-word-limit></Input>
            </FormItem>
            <FormItem label="阅读量" >
                <Input v-model="videoData.viewCount" :readonly="!isUpdate"></Input>
            </FormItem>
            <FormItem label="封面图片" >
                 <span class="image">
                    <img :src="videoData.viewCoverUrl" style="width: 100%;height: 100%">
                    <div class="image-cover">
                        <Icon type="ios-eye-outline" @click="handleView()"></Icon>
                    </div>
                </span>
                <Upload
                        action=""
                        ref="uploadImage"
                        type="drag"
                        name="imageFile"
                        accept="image/jpeg,image/png,image/jpg"
                        :before-upload="beforeImageUpload"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        style="width: 60px;height: 60px;display: inline-block;margin-left: 10px"
                        v-if="imageUploadShow"
                >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
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
                       controls style=""></video>
            </FormItem>
            <FormItem>
                <span v-if="!isUpdate">
                    <Button type="primary" @click="uptBtn">修改</Button>
                </span>
                <span v-else>
                     <Button type="success" @click="submitBtn">提交</Button>
                     <Button type="warning" style="margin-left: 5px" @click="cancelUptBtn">取消</Button>
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
                imageUploadShow:false,
                isUpdate:false,
                image:'',
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
            let id=that.$route.query.id;
            if(id==null){
                alert('数据不存在')
                return
            }
            that.axios.get('/admin/v/' + id)
                .then(function (res) {
                    that.videoData = res.data.data;
                }).catch(function () {
                that.$Message.error('获取数据失败');
            });
            that.axios.get("/admin/vc/")
                .then(function (data) {
                    that.classifyData = data.data.data;
                }).catch(function () {
                that.$Message.error('获取数据失败');
            });
        },
        methods:{
            //查看封面大图
            handleView(){
                this.imageVisible=true;
            },
            uptBtn(){
                this.$Message.info("开启修改");
                this.isUpdate=true;
                this.imageUploadShow=true;
            },
            cancelUptBtn(){
                this.$Message.info("关闭修改");
                this.isUpdate=false;
                this.imageUploadShow=false;
            },
            //执行修改提交
            submitBtn(){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                if (that.videoData.title == '') {
                    that.$Message.warning('标题不能为空');
                    return;
                }
                if (that.videoData.classify_id == '') {
                    that.$Message.warning('请选择分类');
                    return;
                }
                if (that.videoData.videoDescribe == '') {
                    that.$Message.warning('简介不能为空');
                    return;
                }
                that.$Modal.confirm({
                    title: '修改',
                    content: '<p>确认修改吗</p>',
                    loading: true,
                    onOk: () => {
                        let formData = new FormData();
                        formData.append('title', that.videoData.title);
                        formData.append('viewCount', that.videoData.viewCount);
                        formData.append('member_id', that.videoData.member_id);
                        formData.append('classifyId', that.videoData.videoClassify.id);
                        formData.append('desc', that.videoData.videoDescribe);
                        let config={};
                        if(that.image!=''){
                            formData.append('imageFile', that.image);
                            config={
                                headers: {"Content-Type": "multipart/form-data"}
                            }
                        }
                        that.axios.put('/admin/v/'+that.videoData.id, formData,config)
                            .then(function (res) {
                                that.$Modal.remove();
                                if(res.data.code==0){
                                    that.$Message.success('修改成功');
                                    that.isUpdate=false;
                                    that.imageUploadShow=false;
                                }else {
                                    that.$Message.error('修改失败');
                                }
                            }).catch(function () {
                            that.$Modal.remove();
                            that.$Message.error('修改失败');
                        });
                    }
                });
            },
            //上传图片前
            beforeImageUpload(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (file.size > 5242880) {
                    that.$Message.error('超出图片大小限制5MB');
                    return false;
                }
                file.src = that.convertSrc(file);
                that.image=file;
                that.videoData.viewCoverUrl = file.src;
                return false;
            },
            //转换成src
            convertSrc(file) {
                return window.URL.createObjectURL(file);
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