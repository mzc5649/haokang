<template>
    <div style="max-width: 410px;min-width: 410px;;display: flex;align-items: center;height: 36px;left: 50%;transform: translateX(-50%);position: relative">
        <input class="switch-btn switch-btn-animbg" @click="switchClick" type="checkbox" checked>
        <transition name="custom-classes-transition"
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
        >
            <div v-show="isShow" class="in_d" style="display: flex;align-items: center;">
                <Form style="position: relative;display: flex" :disabled="!isLogin">
                    <Select v-model="direction" style="width:65px">
                        <Option value="default">默认</Option>
                        <Option value="top">顶部</Option>
                    </Select>
                    <Input ref="dm" v-model="danMuContent" placeholder="发个友善的弹幕见证当下" style="width: 180px"/>
                    <ColorPicker v-model="color" recommend />
                    <Button type="primary" @click="sendDanMu" style="width: 60px">发送</Button>
                    <span v-show="!isLogin" class="dmShadow">请先<router-link to="/login" target="_blank">登录</router-link>或<router-link
                            to="/register" target="_blank">注册</router-link></span>
                </Form>
            </div>
        </transition>
    </div>

</template>

<script>

    export default {
        name: "sendDM-lzr",
        props: {
            isLogin:Boolean
        },
        data() {
            return {
                color: '#FFFFFF',
                isShow: true,
                danMuContent: '',
                danMuIsShow: true,
                direction: 'default'
            }
        },
        methods: {
            switchClick() {
                this.isShow = !this.isShow;
                this.danMuIsShow = !this.danMuIsShow;
                this.$emit('switchDmShow', this.danMuIsShow)
            },
            sendDanMu() {
                this.$emit('sendDanMu', this.danMuContent, this.color, this.direction);
                this.danMuContent = '';
            }
        }
    }

</script>

<style scoped>
    .switch-btn {
        cursor: pointer;
        width: 45px;
        height: 28px;
        position: relative;
        border: 1px solid #dfdfdf;
        background-color: #fdfdfd;
        box-shadow: #dfdfdf 0 0 0 0 inset;
        border-radius: 15px;
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;
    }

    .switch-btn:before {
        content: '弹';
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(153, 153, 153);
        width: 25px;
        height: 25px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        font-weight: 500;
    }

    .switch-btn:checked {
        border-color: #56b0d4;
        box-shadow: #56b0d4 0 0 0 16px inset;
        background-color: #56b0d4;
    }

    .switch-btn:checked:before {
        content: '弹';
        font-size: 14px;
        color: #56b0d4;
        left: 18px;
    }

    .switch-btn.switch-btn-animbg {
        transition: background-color ease .4s;
    }

    .switch-btn.switch-btn-animbg:before {
        transition: left .3s;
    }

    .switch-btn.switch-btn-animbg:checked {
        box-shadow: #dfdfdf 0 0 0 0 inset;
        background-color: #56b0d4;
        transition: border-color .4s, background-color ease .4s;
    }

    .switch-btn.switch-btn-animbg:checked:before {
        transition: left .3s;
    }

    #in {
        width: 454px;
        height: 30px;
        border: 2px solid lightgray;
        outline: none;
        font: 14px/30px "microsoft yahei";
        color: rgb(153, 153, 153);
        background-color: rgb(224, 224, 224);
    }

    .dmShadow {
        position: absolute;
        top: 50%;
        left: 20%;
        transform: translateY(-50%);
        font-size: 18px;
        color: gray;
    }
</style>