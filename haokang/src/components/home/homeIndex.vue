<template>
    <div>
        <div style="padding-bottom: 16px;display: flex;justify-content: flex-start">
            <span class="avatar">
            <Avatar icon="ios-person" :src="member.icon"
                    style="width: 64px;height: 64px;width:64px;min-width:64px;line-height: 64px;font-size: 32px">
            </Avatar>
                <router-link to="/home/homeMyHead" style="color: white">
                    <div class="cover">
                     更换头像
                     </div>
                </router-link>

            </span>
            <div style="margin-left: 20px;width:100%;height:64px;text-align: left">
                <div style="height: 32px;line-height: 32px;display: flex;justify-content: space-between">
                            <span>
                                {{member.nickname}}
                                <Icon v-if="member.gender==null" type="md-transgender"/>
                                <Icon v-else-if="member.gender=='男'" type="md-male"/>
                                <Icon v-else type="md-female"/>
                            </span>
                    <span>
                                <Button shape="circle" icon="md-create" size="small"></Button>
                            </span>
                </div>
                <div v-text="member.sign"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homeIndex",
        data() {
            return {
                memberInfo: this.$store.state.memberInfo
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
    .avatar {
        position: relative;
        cursor: pointer;
    }

    .cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
        border-radius: 50%;
        color: white;
        line-height: 64px;
        opacity: 0;
        transition: opacity .2s;
        font-size: 12px;
    }

    .avatar:hover .cover {
        opacity: 1;
    }
</style>