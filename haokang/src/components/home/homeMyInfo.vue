<template>
    <div style="text-align: left">
        <Form :model="member" :label-width="80" label-colon>
            <FormItem label="昵称">
                <Input v-model="member.nickname" ></Input>
            </FormItem>
            <FormItem label="用户名">
                <span v-text="member.username" ></span>
            </FormItem>
            <FormItem label="我的签名">
                <Input v-model="member.sign" ></Input>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="member.gender" type="button">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                    <Radio label="保密"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="出生日期">
                <DatePicker size="small" v-model="member.birthday" placeholder="Select date"></DatePicker>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "homeMyInfo",
        data(){
            return{
                member:{
                    id:'',
                    nickname:'mzc',
                    username:'mzc',
                    sign:'1233',
                    gender:'男',
                    birthday:'2020-6-19'
                }
            }
        }
    }
</script>

<style scoped>

</style>