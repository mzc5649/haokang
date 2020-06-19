<template>
    <div>
                <div style="padding-bottom: 16px;display: flex;justify-content: flex-start">
                    <Avatar icon="ios-person" :src="memberInfo.icon" style="width: 64px;height: 64px;width:64px;min-width:64px;line-height: 64px;font-size: 32px"/>
                    <div style="margin-left: 20px;width:100%;height:64px;text-align: left">
                        <div style="height: 32px;line-height: 32px;display: flex;justify-content: space-between">
                            <span>
                                {{memberInfo.nickname}}
                                <Icon v-if="memberInfo.gender==null" type="md-transgender" />
                                <Icon v-else-if="memberInfo.gender=='男'" type="md-male" />
                                <Icon v-else type="md-female" />
                            </span>
                            <span>
                                <Button shape="circle" icon="md-create" size="small"></Button>
                            </span>
                        </div>
                        <div v-text="memberInfo.sign" ></div>
                    </div>
                </div>
    </div>
</template>

<script>
    export default {
        name: "homeIndex",
        data(){
            return{
                memberInfo:this.$store.state.memberInfo
            }

        }
    }
</script>

<style scoped>

</style>