<template>
    <div >
        <div style="text-align: left;font-size: 18px;height: 30px;line-height: 30px">
            <Icon type="ios-ribbon" size="30" style="margin-right: 10px"/>发布者
        </div>

    <div class="box">
        <div class="bg">
            <img style="width: 100%;height: 100px" src="/img/user/bg1.png" />
        </div>
        <div style="display: flex;justify-content: space-between;padding:0 10px">
            <div class="image">
                <img class="head" :src="author.icon" style="width: 100%;height: 100%"/>
            </div>
            <div class="title">
                <span style="color: #FB7299; font-size: 15px;">{{author.nickname}}</span>
                <p>{{author.sign}}</p>
            </div>
        </div>
        <div class="middle">
            <div class="m1">
                <span style="font-size: 14px; color: #999999;">年龄</span>
                <span style="font-weight: bold;">{{age}}</span>
            </div>
            <div class="m1">
                <span style="font-size: 14px; color: #999999;">性别</span>
                <span style="font-weight: bold;">{{author.gender}}</span>
            </div>
            <div class="m1">
                <span style="font-size: 14px; color: #999999;">金币</span>
                <span style="font-weight: bold;">{{author.account}}</span>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "AuthorCard",
        props:{
            author:Object
        },
        computed:{
            age: function () {
                let that = this;
                var date = new Date();
                var birthday = that.author.birthday;
                var startDate = new Date(birthday);
                var newDate = date.getTime() - startDate.getTime();
                var age = Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
                if (isNaN(age)) {
                    age = "";
                }
                return age;
            }
        }
    }
</script>

<style scoped>
    .box{
        text-align: left;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius:4px
    }
    .head{
        border-radius: 50px;
        position: absolute;
        border: 4px white solid;
        top: -35px;
    }
    .image{
        width: 70px;
        min-width: 70px;
        height: 70px;
        min-height: 70px;
        position: relative;
    }
    .title{
        width: 100%;
        height: 65px;
        margin-top: 10px;
    }
    .title p{
        font-size: 15px;
        color: #999999;
        margin-top: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-bottom: 0;
    }
    .middle{
        width: 100%;
        border-top: #e8e8e8 1px solid;
        border-bottom: #e8e8e8 1px solid;
        height: 70px;
        display: flex;
        justify-content: space-between;
    }
    .m1{
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .m1 span:hover{
        color: #00a1d6;
        cursor: default;
    }
    .more{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: black;
        font-size: 15px;
    }
    .more:hover{
        background-color: #ebebeb;
    }
    .btn{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
    }
    .btn button{
        border: none;
        background-color: #00A1D6;
        width: 60px;
        height: 30px;
        color: white;
        border-radius: 5px;
    }
</style>