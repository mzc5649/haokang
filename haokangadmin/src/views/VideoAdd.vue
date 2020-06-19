<template>
    <div>
        <Form :model="form" :label-width="80" :disabled="formDisabled">
            <FormItem label="标题">
                <Input v-model="form.title" placeholder="输入标题" maxlength="20" show-word-limit></Input>
            </FormItem>
            <FormItem label="类别">
                <Select v-model="classifyId" style="width:200px">
                    <Option v-for="item in classifyData" :value="item.id" :key="item.id">{{ item.classifyName }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="简介">
                <Input type="textarea" v-model="form.desc" placeholder="输入简介" maxlength="100" show-word-limit></Input>
            </FormItem>
            <FormItem label="封面">
                <Upload
                        action=""
                        ref="uploadImage"
                        type="drag"
                        name="imageFile"
                        accept="image/jpeg,image/png,image/jpg"
                        :before-upload="beforeImageUpload"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        style="width: 60px;height: 60px;display: inline-block"

                >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <span class="image" v-show="imageExist">
                    <img :src="image.src" style="width: 100%;height: 100%">
                    <div class="image-cover">
                        <Icon type="ios-eye-outline" @click="handleView()"></Icon>
                    </div>
                </span>
            </FormItem>
            <FormItem label="视频">
                <Upload
                        ref="uploadVideo"
                        action=""
                        type="drag"
                        name="videoFile"
                        accept="video/mp4"
                        :show-upload-list="false"
                        :before-upload="beforeVideoUpload"
                        :format="['mp4']"
                        style="width: 500px;"
                >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或拖拽MP4文件上传</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem v-show="videoExist">
                <div v-text="video.name"></div>
                <video :src="video.src" :poster="image.src" width="480px" height="270px" controls
                       style="object-fit:fill;"></video>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="upload">Submit</Button>
                <Button style="margin-left: 8px" @click="clearAll">清空</Button>
            </FormItem>
        </Form>
        <Modal :title="image.name" v-model="imageVisible">
            <img :src="image.src" v-if="imageVisible" style="width: 100%">
            <div slot="footer">
            </div>
        </Modal>
        <Modal title="上传中......" v-model="uploadVisible" :mask-closable=false :closable=false>
            <Progress :percent="progress" :stroke-width="20" status="active" text-inside/>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "VideoAdd",
        data() {
            return {
                form: {
                    title: '',
                    desc: '',
                },
                classifyData: '',
                classifyId: '',
                formDisabled: false,
                imageVisible: false,
                uploadVisible: false,
                imageExist: false,
                videoExist: false,
                image: '',
                video: '',
                progress: 0
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let that = this;
            that.axios.get("/video/vc/")
                .then(function (data) {
                    that.classifyData = data.data.data;
                });
        },
        methods: {
            //上传图片前
            beforeImageUpload(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (file.size > 5242880) {
                    that.$Message.error('超出图片大小限制5MB');
                    return false;
                }
                file.src = this.convertSrc(file);
                this.imageExist = true;
                this.image = file;
                return false;
            },
            //上传视频前
            beforeVideoUpload(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (file.size > 104857600) {
                    that.$Message.error('超出视频大小限制100MB');
                    return false;
                }
                file.src = this.convertSrc(file);
                this.videoExist = true;
                this.video = file;
                return false;
            },
            //转换成src
            convertSrc(file) {
                return window.URL.createObjectURL(file);
            },
            //查看封面大图
            handleView() {
                this.imageVisible = true;
            },
            clearAll(){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                that.form.title = '';
                that.classifyId = '';
                that.form.desc = '';
                that.image = '';
                that.video = '';
                that.imageExist=false;
                that.videoExist=false;
                that.formDisabled = false;
            },
            upload() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (that.form.title == '') {
                    that.$Message.warning('请添加标题');
                    return;
                }
                if (that.classifyId == '') {
                    that.$Message.warning('请选择分类');
                    return;
                }
                if (that.form.desc == '') {
                    that.$Message.warning('请添加简介');
                    return;
                }
                if (that.image == '') {
                    that.$Message.warning('请添加封面图片');
                    return;
                }
                if (that.video == '') {
                    that.$Message.warning('请添加视频');
                    return;
                }
                that.formDisabled = true;
                let formData = new FormData();
                formData.append('title', that.form.title);
                formData.append('classifyId', that.classifyId);
                formData.append('desc', that.form.desc);
                formData.append('imageFile', that.image);
                formData.append('videoFile', that.video);
                let config = {
                    //添加请求头
                    headers: {"Content-Type": "multipart/form-data"},
                    onUploadProgress: e => {
                        let completeProgress = ((e.loaded / e.total * 100) | 0);
                        that.progress = completeProgress;
                    }
                }
                that.uploadVisible = true;
                that.axios.post('/video/upload/', formData, config)
                    .then(function (res) {
                        that.uploadVisible = false;
                        that.$Message.success('上传成功');
                        that.form.title = '';
                        that.classifyId = '';
                        that.form.desc = '';
                        that.image = '';
                        that.video = '';
                        that.imageExist=false;
                        that.videoExist=false;
                        that.formDisabled = false;
                    })
                    .catch(function () {
                        that.$Message.error('上传失败');
                    });
            }
        },


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
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
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
        background: rgba(0, 0, 0, .6);
    }

    .image:hover .image-cover {
        display: block;
    }

    .image-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>