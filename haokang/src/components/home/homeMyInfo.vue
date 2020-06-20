<template>
    <div style="text-align: left">
        <Form :model="member" :label-width="80" label-colon>
            <FormItem label="昵称">
                <Input v-model="member.nickname"></Input>
            </FormItem>
            <FormItem label="用户名">
                <span v-text="member.username"></span>
            </FormItem>
            <FormItem label="我的签名">
                <Input type="textarea" maxlength="100" :autosize="true" v-model="member.sign" show-word-limit></Input>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="member.gender" type="button">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                    <Radio label="保密"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="出生日期">
                <DatePicker size="small" v-model="member.birthday" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="uptMember" :loading="loading">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "homeMyInfo",
        data() {
            return {
                loading:false
            }
        },
        created() {

        },
        methods:{
            uptMember(){
                let that=this;
                let regStr =/^[\u4e00-\u9fa5_a-zA-Z0-9-]+$/;
                if(that.member.nickname===''){
                    that.$Message.warning("昵称不能为空");
                    return;
                }else if(that.member.nickname.indexOf(' ')!=-1){
                    that.$Message.warning("昵称不能含有空格");
                    return;
                }else if(!regStr.test(that.member.nickname)){
                    that.$Message.warning("昵称不可包含除-和_以外的特殊字符");
                    return;
                }else{
                    that.loading=true;
                    that.axios.put('/member/m/',that.member)
                    .then(function (res) {
                        that.loading=false;
                        if(res.data.code==0){
                            that.$Message.success("更新成功")
                        }else{
                            that.$Message.error("更新失败")
                        }

                    }).catch(function () {
                        that.loading=false;
                        that.$Message.error("更新失败")
                    })
                }

            }
        },
        computed: {
            member: function () {
                let that = this;
                return that.$store.state.memberInfo;
            }
        }
    }
</script>

<style scoped>

</style>