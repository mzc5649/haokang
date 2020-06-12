<template>

                <div class="box">
                    <div style="width: 550px;">
                        <span class="title">拍反转神剧5个月，我们最终成了炮灰</span>
                        <div class="t1">
                            <p>3月26日中午，厦门的天气异常温暖。阳光透过百叶窗照进办公室，
                                微信工作群里突然弹出一条消息：“明天开始所有人放假。可以找新工作了。
                                工资尽快全发给大家。”我错愕了几秒，抬头碰上了对面剪辑师的目光。两人面
                                面相觑，互相无话，接着又回到各自的世界中去。那天，我们公司正式破产了。
                                我并不惊讶，只不过没有想到这一天来得这么快，这么突然。破产前一天。 “我
                                们的工作很简单，就是抄快手的反转剧”2019年10月，老黑再一次找到了我。酒吧里
                                很昏暗，他押了一口酒问：“你考虑得怎么样了？”他指的“考虑”，是希望我加入他的</p>
                        </div>
                        <div class="t2">
                            <img class="img_1" src="img/10.jpg" />
                            <span>一个看客匆匆路过</span>
                            <img class="img_2" src="img/eye.png" style="margin-left: 50px; height: 10px;" />
                            <a href="#">685</a>
                            <img class="img_2" src="img/zan.png" style="height: 14px;" />
                            <a href="#">888</a>
                            <img class="img_2" src="img/pinglun.png" style="height: 14px;" />
                            <a href="#">555</a>
                        </div>
                    </div>
                    <div class="box_i">
                        <img src="img/1.jpg" />
                    </div>
                </div>
</template>

<script>
    export default {
        name: "articleCard-lzr"
    }
</script>

<style scoped>
    .box{
        height: 131px;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .title{
        font-size: 20px;
        color: #212121;
    }
    .title:hover{
        color: rgb(0,161,214);
    }
    .t1{
        width: 543px;
        height: 22px;
        margin-top: 10px;
        overflow: hidden;
    }
    .t1 p{
        display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1 ;
        color: #99a2aa;
        font-size: 12px;
        margin-top: 4px;
    }
    .t2{
        width: 500px;
        height: 25px;
        margin-top: 35px;
        display: flex;
        align-items: center;
    }
    .img_1{
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    .t2 a{
        color: #99a2aa;
        font-size: 12px;
        margin-left: 5px;
    }
    .t2 span{
        color: #99a2aa;
        font-size: 12px;
        margin-left: 5px;
    }
    .img_2{
        width: 16px;
        margin-left: 30px;
    }
    .box_i{
        width: 130px;
        height: 120px;
    }
    .box_i img{
        width: 130px;
        height: 100px;
        border-radius: 5%;
    }
    .t2 a{
        text-decoration: none;
    }
    .t2 a:hover{
        color: rgb(0,161,214);
    }
</style>