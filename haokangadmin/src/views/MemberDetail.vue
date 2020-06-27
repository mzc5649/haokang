<template>
    <div style="width: 800px;margin: 0 auto;background-color: white;padding: 5px;border-radius: 5px">
        <Form :model="memberData" label-position="left" :label-width="80" label-colon>
            <FormItem label="昵称">
                <Input v-model="memberData.nickname" :readonly="!isUpdate" maxlength="20" show-word-limit></Input>
            </FormItem>
            <FormItem label="头像">
                <div class="image">
                    <Avatar :src="memberData.icon" size="60" style="line-height: 30px"></Avatar>
                    <div class="image-cover">
                        <Icon type="ios-eye-outline" @click="handleView()"></Icon>
                    </div>
                </div>
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
            <FormItem label="用户名">
                <Input v-model="memberData.username" readonly maxlength="16" show-word-limit></Input>
            </FormItem>
            <FormItem label="密码">
                <Input v-model="memberData.password" :readonly="!isUpdate" maxlength="16" show-word-limit></Input>
            </FormItem>
            <FormItem label="性别" >
                <RadioGroup v-model="memberData.gender" type="button" >
                    <Radio label="男" :disabled="!isUpdate"></Radio>
                    <Radio label="女" :disabled="!isUpdate"></Radio>
                    <Radio label="保密" :disabled="!isUpdate"></Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="出生日期">
                <DatePicker v-model="memberData.birthday" :readonly="!isUpdate" type="date" placeholder="Select date"
                            style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="个性签名">
                <Input v-model="memberData.sign" :readonly="!isUpdate" maxlength="20" show-word-limit></Input>
            </FormItem>
            <FormItem label="金币">
                <Input v-model="memberData.account" type="number" :readonly="!isUpdate"></Input>
            </FormItem>
            <FormItem>
                <span v-if="!isUpdate">
                    <Button type="primary" @click="uptBtn">修改</Button>
                </span>
                <span v-else>
                     <Button type="success" @click="submitBtn" >提交</Button>
                     <Button type="warning" style="margin-left: 5px" @click="cancelUptBtn">取消</Button>
                </span>
            </FormItem>
        </Form>
        <Modal title="查看图片" v-model="imageVisible">
            <img :src="memberData.icon" v-if="imageVisible" style="width: 100%">
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "MemberDetail",
        data() {
            return {
                imageUploadShow: false,
                imageVisible: false,
                isUpdate: false,
                image: '',
                memberData: {
                    id: '',
                    nickname: '',
                    username: '',
                    password: '',
                    gender:'',
                    icon: '',
                    birthday: '',
                    sign: '',
                    account: 0
                }
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let that = this;
            let id = that.$route.query.id
            //查询用户信息
            that.axios.get("/admin/me/selectAll/" + id)
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.memberData = res.data.data;
                    } else {
                        that.$Message.error("获取数据失败");
                    }
                }).catch(function () {
                that.$Message.error("获取数据失败");
            })
        },
        methods: {
            //查看封面大图
            handleView() {
                this.imageVisible = true;
            },
            //开启修改
            uptBtn() {
                this.$Message.info("开启修改");
                this.isUpdate = true;
                this.imageUploadShow = true;
            },
            cancelUptBtn() {
                this.$Message.info("关闭修改");
                this.isUpdate = false;
                this.imageUploadShow = false;
            },
            //执行修改提交
            submitBtn() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                let regStr =/^[\u4e00-\u9fa5_a-zA-Z0-9-]+$/;
                if(that.memberData.nickname===''){
                    that.$Message.warning("昵称不能为空");
                    return;
                }else if(that.memberData.nickname.indexOf(' ')!=-1){
                    that.$Message.warning("昵称不能含有空格");
                    return;
                }else if(!regStr.test(that.memberData.nickname)) {
                    that.$Message.warning("昵称不可包含除-和_以外的特殊字符");
                    return;
                }
                if(that.memberData.password==''){
                    that.$Message.warning("密码不能为空");
                    return;
                }
                if(that.memberData.gender==''){
                    that.$Message.warning("性别不能为空");
                    return;
                }
                if(that.memberData.birthday==''){
                    that.$Message.warning("生日不能为空");
                    return;
                }
                if(that.memberData.sign==''){
                    that.$Message.warning("签名不能为空");
                    return;
                }
                if(that.memberData.account===''){
                    that.$Message.warning("金币不能为空");
                    return;
                }
                that.$Modal.confirm({
                    title: '修改',
                    content: '<p>确认修改吗</p>',
                    loading: true,
                    onOk: () => {
                        let formData = new FormData();
                        formData.append('id', that.memberData.id);
                        formData.append('nickname', that.memberData.nickname);
                        formData.append('password', that.memberData.password);
                        formData.append('gender', that.memberData.gender);
                        formData.append('sign', that.memberData.sign);
                        formData.append('birthday', that.memberData.birthday);
                        formData.append('account', that.memberData.account);
                        if(that.image!=''){
                            formData.append('imageFile', that.image);
                        }
                        let config = {
                            //添加请求头
                            headers: {"Content-Type": "multipart/form-data"}
                        }
                        that.axios.put('/admin/me/',formData,config)
                            .then(function () {
                                that.$Modal.remove();
                                that.$Message.success("修改成功")
                                that.isUpdate=false;
                            }).catch(function () {
                            that.$Modal.remove();
                            that.$Message.error("修改失败")
                        })
                    }
                });
            },
            //上传图片前
            beforeImageUpload(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                if (file.size > 2097152) {
                    that.$Message.error('超出图片大小限制2MB');
                    return false;
                }
                file.src = that.convertSrc(file);
                that.image = file;
                that.memberData.icon = file.src;
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
        border-radius: 50%;
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