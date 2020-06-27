<template>

    <div>


        <Row style="width: 400px;margin: 0 auto">
            <Col span="12">
                <Upload
                        ref="upload"
                        action=""
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        accept="image/jpeg,image/png,image/jpg"
                        :max-size="2048"
                        type="drag"
                        :before-upload="beforeImageUpload"
                        style="display: inline-block;width:100px;height: 100px">
                    <div style="width: 100px;height:100px;line-height: 100px;font-size: 100px">
                        <Icon type="ios-camera" size="100"></Icon>
                    </div>
                </Upload>
            </Col>
            <Col span="12">
                <div>
                    <Avatar icon="ios-person" :src="memberIconSrc"
                            style="width:100px;height: 100px;width:100px;line-height: 100px;font-size:50px">
                    </Avatar>
                </div>
            </Col>
        </Row>
        <Row style="width: 400px;margin: 0 auto">
            <Col span="12">
                选择图片
            </Col>
            <Col span="12">
                当前头像
            </Col>
        </Row>
        <Row style="font-size: 12px;color: #999999;padding: 20px 0">
            请选择图片上传：支持JPG、PNG等格式，图片需小于2M
        </Row>
        <Row>
            <Button style="width: 200px" size="large" @click="uploadHead" :disabled="!uptBtnAvailable"
                    :loading="loading">更新
            </Button>
        </Row>

    </div>
</template>

<script>
    export default {
        name: "homeMyHead",
        data() {
            return {
                uptBtnAvailable: false,
                imageFile: '',
                progress: '',
                loading: false
            }
        },
        created() {
            let that=this;
            that.$store.state.memberIconSrc=that.$store.state.memberInfo.icon;
        },
        computed: {
            member: function () {
                let that = this;
                return that.$store.state.memberInfo;
            },
            memberIconSrc: function () {
                let that = this;
                return that.$store.state.memberIconSrc;
            }
        },
        methods: {
            //上传图片前
            beforeImageUpload(file) {
                let that = this;
                if (file.size > 2097152) {
                    that.$Message.error('超出图片大小限制2MB');
                    return false;
                }
                file.src = this.convertSrc(file);
                that.imageFile = file;
                that.$store.state.memberIconSrc = file.src;
                that.uptBtnAvailable = true;
                return false;
            },
            //转换成src
            convertSrc(file) {
                return window.URL.createObjectURL(file);
            },
            uploadHead() {
                let that = this;
                that.loading = true;
                let formData = new FormData();
                formData.append('oldImageSrc', that.member.icon);
                formData.append('imageFile', that.imageFile);
                let config = {
                    //添加请求头
                    headers: {"Content-Type": "multipart/form-data"},
                    onUploadProgress: e => {
                        let completeProgress = ((e.loaded / e.total * 100) | 0);
                        that.progress = completeProgress;
                    }
                }
                //上传图片
                that.axios.post('/video/upload/img', formData, config)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            let src = res.data.data;
                            //更新头像
                            that.axios.put('/member/m/updateIcon', {
                                icon: src,
                                id: that.member.id
                            }).then(function (res) {
                                that.loading = false;
                                if (res.data.code == 0) {
                                    that.$Message.success("更换图片成功")
                                    that.uptBtnAvailable=false;
                                    //更新用户信息
                                    that.axios.get("/member/m/" + that.$store.state.m_id)
                                        .then(function (res) {
                                            if (res.data.code == 0) {
                                                that.memberInfo = res.data.data;
                                            }
                                        })
                                } else {
                                    that.$Message.error("更换图片失败")

                                }
                            }).catch(function () {
                                that.$Message.error("更换图片失败")

                            })
                        }
                    }).catch(function () {
                    that.$Message.error("更换图片失败")

                })

            }
        }
    }
</script>

<style scoped>

</style>