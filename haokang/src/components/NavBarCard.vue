<template>
    <div class="box">
        <router-link to="/home" target="_blank">
            <Avatar :src="memberInfo.icon" icon="ios-person"
                    style="z-index: 10;font-size: 35px;line-height:70px;cursor:pointer; position: absolute;height: 70px;width: 70px;top: -40px;left: 50%;transform: translateX(-50%)"/>

        </router-link>
        <div class="username">
            <h4>{{memberInfo.nickname}}</h4>
        </div>
        <div class="btu">
            <div class="btu_a">
                <span href="#">
                    <p class="p1" style=" font-size: 12px;">年龄</p>
                    <p class="p2" style=" font-weight: bold;">{{age}}</p>
                </span>
            </div>
            <div class="btu_a">
                <span href="#">
                    <p class="p1" style=" font-size: 12px;">性别</p>
                    <p class="p2" style=" font-weight: bold;">{{memberInfo.gender==null?'保密':memberInfo.gender}}</p>
                </span>
            </div>
            <div class="btu_a">
                <span href="#">
                    <p class="p1" style=" font-size: 12px;">金币</p>
                    <p class="p2" style=" font-weight: bold;">{{memberInfo.account}}</p>
                </span>
            </div>
        </div>
        <div class="nav">
            <ul>
                <a v-if="dotCount!=0" href="javascript:void(0)" @click="toSignToday">
                    <li style="display: flex;align-items: center">
                        <Icon type="md-heart" style="margin-right: 20px;font-size: 25px;line-height: 50px"/>
                        <Badge :count="dotCount" dot v>
                            今日签到
                        </Badge>
                    </li>
                </a>
                <div v-else>
                    <li style="display: flex;align-items: center">
                        <Icon type="md-checkmark" style="margin-right: 20px;font-size: 25px;line-height: 50px"/>
                        今日已签到
                    </li>
                </div>
            </ul>
        </div>
        <div class="nav">
            <ul>
                <a href="javascript:void(0)" @click="toHome">
                    <li style="display: flex;align-items: center">
                        <Icon type="md-person" style="margin-right: 20px;font-size: 25px;line-height: 50px"/>
                        个人中心
                    </li>
                </a>
            </ul>
        </div>
        <div class="signout">
            <ul>
                <a href="javascript:void(0)" @click="logout">
                    <li style="display: flex;align-items: center">
                        <Icon type="md-exit" style="margin-right: 20px;font-size: 25px;line-height: 50px"/>
                        退出
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBarCard",
        props: {
            memberInfo: Object
        },
        created() {


        },
        mounted() {

        },
        methods: {
            toHome() {
                let that = this;
                let obj = that.$router.resolve("/home");
                window.open(obj.href, "_blank");
            },
            logout() {
                let that = this;
                that.axios.get("/member/m/logout")
                    .then(function () {
                        window.location.reload();
                    }).catch(function () {
                    window.location.reload();
                })
            },
            toSignToday() {
                let that = this;
                //用户id
                let id = that.memberInfo.id;
                //是否签到
                that.axios.get("/video/m/sign/" + id)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            let num = ((Math.random() * 10) + 1).toFixed(0);
                            //进行签到
                            that.axios.post("/video/m/sign/" + id)
                                .then(function (res) {
                                    if (res.data.code == 0) {
                                        //签到成功。。。。
                                        //执行金币更新操作 。。。。。
                                        that.axios.put("/member/m/goldCoinAdd",
                                            {
                                                id: id,
                                                account: num
                                            }
                                        ).then(function (res) {
                                            if (res.data.code == 0) {
                                                //更新成功通知。。。
                                                that.$store.state.dotCount = 0;
                                                that.$Message.info({
                                                    content: '签到成功，金币+' + num,
                                                    duration: 3
                                                });
                                                //页面更新金币数量
                                                that.$store.state.memberInfo.account=parseInt(that.$store.state.memberInfo.account)+parseInt(num);
                                            } else {
                                                that.$store.state.dotCount = 1;
                                                that.$Message.error({
                                                    content: '签到失败',
                                                    duration: 3
                                                });
                                            }
                                        }).catch(function () {
                                            that.$store.state.dotCount = 1;
                                            that.$Message.error({
                                                content: '签到失败',
                                                duration: 3
                                            });
                                        })

                                    } else {
                                        that.$store.state.dotCount = 1;
                                        that.$Message.error({
                                            content: '签到失败',
                                            duration: 3
                                        });
                                    }

                                })
                        } else {
                            that.$Message.info({
                                content: '您已经签到过了',
                                duration: 2
                            });
                            that.$store.state.dotCount = 0;
                        }
                    })
            }
        },
        computed: {
            age: function () {
                let that = this;
                var date = new Date();
                var birthday = that.memberInfo.birthday;
                var startDate = new Date(birthday);
                var newDate = date.getTime() - startDate.getTime();
                var age = Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
                if (isNaN(age)) {
                    age = "";
                }
                return age;
            },
            dotCount: function () {
                let that = this;
                return that.$store.state.dotCount;
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 250px;
        border-radius: 5px;
        border: solid 1px rgba(0, 0, 0, 0);
        /*margin-top: 40px;*/
        box-shadow: 1px 1px 5px #949d90;
        background-color: white;
    }

    .username {

        height: 30px;
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lv {
        height: 30px;
        width: 240px;

        margin-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btu {
        width: 100%;
        height: 60px;
        border-top: #eeeeee 1px solid;
        border-bottom: #EEEEEE 1px solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btu p {
        margin: 0;
        padding: 0;
    }

    .btu span {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        cursor: auto;
    }


    .btu_a {
        height: 100%;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }

    .p1 {
        color: #949D90;
    }

    .p2 {
        color: #000000;
    }

    .nav {
        width: 100%;
        border-bottom: #EEEEEE solid 1px;
    }

    .nav ul {
        list-style: none;
        padding: 0;

    }

    .nav li {
        margin-left: 27px;
        list-style: none;
    }

    .nav a {
        height: 50px;
        width: 100%;
        color: black;
        display: flex;
        align-items: center;
    }

    .nav a:hover {
        background-color: rgba(192, 192, 192, 0.4);
    }

    .nav a {
        text-decoration: none;
    }

    .signout {
        width: 100%;
        height: 60px;

    }

    .signout li {
        margin-left: 27px;
        list-style: none;
    }

    .signout a {
        height: 50px;
        width: 100%;
        color: black;
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .signout a:hover {
        background-color: rgba(192, 192, 192, 0.4);
    }

    .signout ul {
        padding: 0;
    }
</style>