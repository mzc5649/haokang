<template>
    <div id="main">
        <Form :model="form" :label-width="80" :disabled="formDisabled">
            <FormItem label="标题">
                <Input v-model="form.title" placeholder="输入文章标题"></Input>
            </FormItem>
            <FormItem label="分类" >
                <RadioGroup v-model="form.classifyId">
                    <template v-for="item in classifyData">
                        <Radio :key="item.id" :label="item.id">
                            <span>{{ item.classifyName}}</span>
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem label="封面" >
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
            <FormItem label="内容">
                <mavon-editor v-model="form.content" @change="getContentHtml"></mavon-editor>
            </FormItem>
            <FormItem >
                <Button type="primary" @click="articleSubmit">提交</Button>
                <Button style="margin-left: 8px" @click="clearAll">清空</Button>
            </FormItem>
        </Form>
        <Modal :title="image.name" v-model="imageVisible" style="position: relative;z-index: 1900">
            <img :src="image.src" v-if="imageVisible" style="width: 100%;position: relative;z-index: 1900">
            <div slot="footer">
            </div>
        </Modal>
    </div>

</template>

<script>

    export default {
        name: "articleSubmit",
        data(){
            return{
                formDisabled:false,
                form:{
                    title:'',
                    classifyId:'',
                    content:''
                },
                contentHtml:'',
                classifyData:[],
                imageVisible: false,
                imageExist: false,
                image: '',
            }
        },
        created() {
            let that=this;
            that.axios.get('/article/class/')
            .then(function (res) {
                that.classifyData=res.data;
            })
        },
        methods:{
            //文章上传
            articleSubmit(){
                let that=this;
                let str = that.form.title;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ","");
                }
                if(that.form.title==''){
                    that.$Message.warning('标题不能为空');
                    return;
                }else if(str==''){
                    that.$Message.warning('标题不能为空');
                    return;
                }else if(that.form.classifyId==''){
                    that.$Message.warning('请选择分类');
                    return;
                }else if(that.image==''){
                    that.$Message.warning('封面不能为空');
                    return;
                } else if(that.contentHtml==''){
                    that.$Message.warning('内容不能为空');
                    return;
                }
                that.formDisabled=true;
                //上传封面
                let formData = new FormData();
                formData.append('oldImageSrc', null);
                formData.append('imageFile', that.image);
                let config = {
                    //添加请求头
                    headers: {"Content-Type": "multipart/form-data"}
                }
                that.axios.post('/video/upload/img', formData, config)
                    .then(function (res) {
                        //获取封面
                        let coverUrl=res.data.data;
                        //上传文章 与封面
                            that.axios.post("/article/i/",{
                                    classify_id:that.form.classifyId,
                                    title:that.form.title,
                                    content:that.contentHtml,
                                    m_id:that.$store.state.m_id,
                                    coverUrl:coverUrl
                                }).then(function () {
                                that.formDisabled=false;
                                that.$Message.success("发布文章成功")
                                }).catch(function () {
                                that.$Message.error("发布文章失败")
                                    that.formDisabled=false;
                                })
                    }).catch(function () {
                    that.$Message.error("发布文章失败")
                    that.formDisabled=false;
                })

            },
            //获取html
            getContentHtml(value,render){
                this.contentHtml=render;//html
            },
            //上传图片前
            beforeImageUpload(file) {
                let that = this;
                if (file.size > 5242880) {
                    that.$Message.error('超出图片大小限制5MB');
                    return false;
                }
                file.src = this.convertSrc(file);
                that.imageExist = true;
                that.image = file;
                return false;
            } ,
            //转换成src
            convertSrc(file) {
                return window.URL.createObjectURL(file);
            },
            //查看封面大图
            handleView() {
                this.imageVisible = true;
            },
            //清空
            clearAll(){
                let that = this;
                that.form.title = '';
                that.classifyId = '';
                that.form.content= '';
                that.image = '';
                that.imageExist=false;
                that.formDisabled = false;
            },
        },
        components:{

        }
    }

</script>

<style scoped>
    #main{
        text-align: left;
        position: relative;

    }
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
<style>
    .v-note-wrapper{
         z-index: 1
    }
</style>