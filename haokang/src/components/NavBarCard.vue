<template>
    <div class="box">
        <router-link to="/home" target="_blank">
            <Avatar  :src="memberInfo.icon" icon="ios-person"
                     style="z-index: 10;font-size: 35px;line-height:70px;cursor:pointer; position: absolute;height: 70px;width: 70px;top: -40px;left: 50%;transform: translateX(-50%)"/>

        </router-link>
        <div class="username">
            <h4>{{memberInfo.nickname}}</h4>
        </div>
        <div class="btu">
            <div class="btu_a">
                <a href="#">
                    <p class="p1" style=" font-size: 12px;">出生日期</p>
                    <p class="p2" style=" font-weight: bold;">{{memberInfo.birthday}}</p>
                </a>
            </div>
            <div class="btu_a">
                <a href="#">
                    <p class="p1" style=" font-size: 12px;">性别</p>
                    <p class="p2" style=" font-weight: bold;">{{memberInfo.gender==null?'保密':memberInfo.gender}}</p>
                </a>
            </div>
            <div class="btu_a">
                <a href="#">
                    <p class="p1" style=" font-size: 12px;">金币</p>
                    <p class="p2" style=" font-weight: bold;">{{memberInfo.account}}</p>
                </a>
            </div>
        </div>
        <div class="nav">
            <ul>
                <a href="#" @click="toHome"><li><img src="img/user.png" style="width: 20px; position: absolute;left: 25px;">个人中心</li></a>
            </ul>
        </div>
        <div class="signout">
            <ul>
                <a href="#"><li><img src="img/tuichu.png" style="width: 20px; position: absolute;left: 25px;">退出</li></a>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBarCard",
        props:{
            memberInfo:Object
        },
        methods:{
            toHome() {
                console.log(123)
                let that = this;
                let obj = that.$router.resolve("/home");
                window.open(obj.href, "_blank");
            }
        }
    }
</script>

<style scoped>
    .box{
        width: 280px;
        border-radius: 5px;
        border: solid 1px rgba(0,0,0,0);
        /*margin-top: 40px;*/
        box-shadow: 1px 1px 5px #949d90;
        background-color: white;
    }
    .username{

        height: 30px;
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lv{
        height: 30px;
        width: 240px;

        margin-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btu{
        width: 100%;
        height: 60px;
        border-top: #eeeeee 1px solid;
        border-bottom: #EEEEEE 1px solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btu p{
        margin: 0;
        padding: 0;
    }
    .btu a{
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }
    .btu a:hover .p1{
        color: rgb(0,161,214);
    }
    .btu a:hover .p2{
        color: rgb(0,161,214);
    }
    .btu_a{
        height: 100%;
        width: 30%;

        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }
    .p1{
        color: #949D90;
    }
    .p2{
        color: #000000;
    }
    .nav{
        width: 100%;
        border-bottom: #EEEEEE solid 1px;
    }
    .nav ul{
        list-style: none;
        padding: 0;

    }
    .nav li{
        margin-left: 45px;
    }
    .nav a{
        height: 50px;
        width: 100%;
        color: black;
        display: flex;
        align-items: center;
    }
    .nav a:hover{
        background-color: rgba(192,192,192,0.4);
    }
    .nav a{
        text-decoration: none;
    }
    .signout{
        width: 100%;
        height: 60px;

    }
    .signout li{
        margin-left: 45px;
        list-style: none;
    }
    .signout a{
        height: 50px;
        width: 100%;
        color: black;
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    .signout a:hover{
        background-color: rgba(192,192,192,0.4);
    }
    .signout ul{
        padding: 0;
    }
</style>