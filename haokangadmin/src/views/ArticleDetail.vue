<template>
    <div id="main" style="margin: 0 auto;background-color: white;padding: 5px 10px;border-radius: 5px">
        <Form :model="form" :label-width="80">

            <FormItem label="标题">
                <Input v-model="form.title" placeholder="输入文章标题"></Input>
            </FormItem>
            <FormItem label="分类">
                <RadioGroup v-model="form.classify_id">
                    <template v-for="item in classifyData">
                        <Radio :key="item.id" :label="item.id">
                            <span>{{ item.classifyName}}</span>
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem label="封面">
                <span class="image">
                    <img :src="form.coverUrl" style="width: 100%;height: 100%">
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
                        style="width: 60px;height: 60px;display: inline-block">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem label="阅读量">
                <span>{{form.traffic}}</span>
            </FormItem>
            <FormItem label="发表时间">
                <span>{{form.createTime}}</span>
            </FormItem>
            <FormItem label="修改时间">
                <span>{{form.modifiedTime}}</span>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="articleSubmit">提交修改</Button>
                <Button style="margin-left: 8px" @click="clearAll">清空</Button>
            </FormItem>
            <FormItem label="内容">
                <mavon-editor v-model="contentMd" @change="getContentHtml"></mavon-editor>
            </FormItem>

        </Form>
        <Modal title="查看封面" v-model="imageVisible" style="position: relative;z-index: 1900">
            <img :src="form.coverUrl" v-if="imageVisible" style="width: 100%;position: relative;z-index: 1900">
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TurndownService = require('turndown').default()

    export default {
        name: "ArticleDetail",
        data() {
            return {
                form: {
                    title: '',
                    articleContent: {},
                    coverUrl: '',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    classify_id: '',
                    traffic: '',
                    createTime: '',
                    modifiedTime: ''
                },
                contentMd: '',
                contentHtml: '',
                classifyData: [],
                imageVisible: false,
                imageExist: false,
                image: '',
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let that = this;
            //文章id
            let id = that.$route.query.id;
            //获取所有文章分类
            that.axios.get('/admin/class/')
                .then(function (res) {
                    that.classifyData = res.data;
                })
            //获取文章数据
            that.axios.get('/admin/i/ic/' + id)
                .then(function (res) {
                    that.form = res.data;
                    that.contentMd = TurndownService.turndown(that.form.articleContent.content)
                })
        },
        methods: {
            //获取html
            getContentHtml(value, render) {
                this.contentHtml = render;//html
            },
            //上传图片前
            beforeImageUpload(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (file.size > 2097152) {
                    that.$Message.error('超出图片大小限制2MB');
                    return false;
                }
                file.src = this.convertSrc(file);
                that.form.coverUrl = file.src
                that.image = file;
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
            //清空
            clearAll() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                that.form.title = '';
                that.classifyId = '';
                that.form.content = '';
                that.image = '';
            },
            articleSubmit() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                let str = that.form.title;
                while (str.lastIndexOf(" ") >= 0) {
                    str = str.replace(" ", "");
                }
                if (that.form.title == '') {
                    that.$Message.warning('标题不能为空');
                    return;
                } else if (str == '') {
                    that.$Message.warning('标题不能为空');
                    return;
                } else if (that.form.classifyId == '') {
                    that.$Message.warning('请选择分类');
                    return;
                } else if (that.contentHtml == '') {
                    that.$Message.warning('内容不能为空');
                    return;
                }
                that.$Modal.confirm({
                    title: '修改',
                    content: '<p>确认修改吗</p>',
                    loading: true,
                    onOk: () => {

                        let formData = new FormData();
                        formData.append('title', that.form.title);
                        formData.append('id', that.form.id);
                        formData.append('classify_id', that.form.classify_id);
                        formData.append('content', that.contentHtml);
                        if (that.image != '') {
                            formData.append('imageFile', that.image);
                        }
                        let config = {
                            //添加请求头
                            headers: {"Content-Type": "multipart/form-data"}
                        }
                        that.axios.put("/admin/i/upt", formData, config)
                            .then(function (res) {
                                that.$Modal.remove();
                                if (res.data.code == 0) {
                                    that.$Message.success("修改成功")
                                } else {
                                    that.$Message.error("修改失败")
                                }
                            }).catch(function () {
                            that.$Modal.remove();
                            that.$Message.error("修改失败")
                        })
                    }
                });


            }
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
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        left: 4px;
        z-index: 1;
        margin-right: 10px;
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
    .v-note-wrapper {
        z-index: 1
    }
</style>