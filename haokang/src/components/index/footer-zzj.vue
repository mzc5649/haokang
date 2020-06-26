<template>
    <div class="footertotal">
        <div class="link-box">
            <div class="link-box-left">
					<span class="top-left">
						好康网
					</span>
                <ul class="ul-left">
                    <a href="#">关于我们</a>
                    <a href="#">联系我们</a>
                    <a href="#">用户协议</a>
                    <a href="#">加入我们</a>
                    <a href="#">友情链接</a>
                    <a href="#">隐私政策</a>
                    <a href="#">好康认证</a>
                </ul>
            </div>
            <div class="link-box-middle">
					<span class="top-left">
						传送门
					</span>
                <ul class="ul-middle">
                    <a href="#">帮助中心</a>
                    <a href="#">高级弹幕</a>
                    <a href="#">活动专题页</a>
                    <a href="#">侵权申诉</a>
                    <a href="#">活动中心</a>
                    <a href="#">用户反馈论坛</a>
                    <a href="#">壁纸站</a>
                    <a href="#">服务中心</a>
                    <a href="#">名人堂</a>
                </ul>

            </div>
            <div class="link-box-right">
                <!-- <a href="#" class="a-left">
                    <a class="a-left-2"></a>
                </a> -->
                <div class="icon-left">

                    <div class="download">
                        <span class="iconfont icon-xiazai"></span>
                    </div>
                    <div class="download-text">
                        <a href="#">客户端下载</a>
                    </div>
                </div>
                <div class="icon-middle">
                    <div class="download-m">
                        <span class="iconfont icon-weibo"></span>
                    </div>
                    <div class="download-text-m">
                        <a href="#">新浪微博</a>
                    </div>
                </div>
                <div class="icon-right">
                    <div class="download-r">
                        <span class="iconfont icon-weixin"></span>
                    </div>
                    <div class="download-text-r">
                        <a href="#">官方微信</a>
                    </div>
                </div>

                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "footer-zzj"
    }
</script>

<style scoped>
    .footertotal{
        width: 100%;
        height: 136px;
        /* border: #000000 solid 1px; */
        /* padding: 30px; */
        display: flex;
    }
    .link-box{
        width: 100%;
        margin: 0 auto;
        /* border: blue solid 0.5px; */
        display: flex;
    }
    .link-box-left{
        width: 38%;
        /* min-width: 354.5px; */
        height: 150px;
        /* border: orange solid 0.5px; */
        display: flex;
        padding-right: 40px;
        margin-right: 40px;
        border-right: solid 1px #eee;
        flex-direction: column;
    }
    .link-box-middle{
        width: 38%;
        /* min-width: 354.5px; */
        height: 150px;
        /* border: orange solid 0.5px; */
        display: flex;
        padding-right: 40px;
        margin-right: 40px;
        border-right: solid 1px #eee;
        flex-direction: column;
    }
    .link-box-right{
        width: 24%;
        height: 150px;
        /* border: orange solid 0.5px; */
        display: flex;
    }
    .top-left{
        height: 20px;
        width: 550px;
        margin-bottom: 20px;
        font-size: 16px;
        color: #999;
    }
    .ul-left{
        height: 96px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: 0px;
        padding: 0px;
    }
    .ul-left a{
        display: inline-block;
        text-decoration: none;
        color: #212121;
        cursor: pointer;
        width: 117.05px;
        height: 19px;
        margin: 0px 0px 10px;
        font-size: 15px;
    }
    .ul-left a:hover{
        color: rgb(0,161,214);
    }
    .ul-middle{
        height: 96px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 0px;
    }
    .ul-middle a{
        text-decoration: none;
        color: #212121;
        color: #212121;
        /* margin-bottom: 10px; */
        cursor: pointer;
        width: 117.05px;
        height: 19px;
        /* margin-left: 0px; */
        margin: 0px 0px 10px;
        font-size: 15px;
    }
    .ul-middle a:hover{
        color: rgb(0,161,214);
    }

    .link-box-right{
        flex: 1;
    }
    .icon-left{
        width: 70px;
        height: 73px;
        /* border: green solid 0.5px; */
        margin-top: 33px;
        margin-right: 22px;
        flex-direction: column;

    }
    .icon-middle{
        width: 70px;
        height: 73px;
        /* border: green solid 0.5px; */
        margin-top: 33px;
        margin-right: 22px;
        flex-direction: column;
    }
    .icon-right{
        width: 70px;
        height: 73px;
        /* border: green solid 0.5px; */
        margin-top: 33px;
        flex-direction: column;
    }
    .download{
        width: 47px;
        height: 47px;
        margin-left: 12.5px;
    }
    .download-text{
        width: 72px;
        height: 28px;
    }
    .download-text a{
        font-size: 14px;
        text-decoration: none;
        color: #212121;
    }
    .download-text a:hover{
        color: rgb(0,161,214);
    }

    .download-m{
        width: 47px;
        height: 47px;
        margin-left: 12.5px;
    }
    .download-text-m{
        width: 72px;
        height: 28px;
    }
    .download-text-m a{
        font-size: 14px;
        text-decoration: none;
        color: #212121;
        margin-left: 8px;
    }
    .download-text-m a:hover{
        color: rgb(0,161,214);
    }

    .download-r{
        width: 47px;
        height: 47px;
        margin-left: 12.5px;
    }
    .download-text-r{
        width: 72px;
        height: 28px;
    }
    .download-text-r a{
        font-size: 14px;
        text-decoration: none;
        color: #212121;
        margin-left: 8px;
    }
    .download-text-r a:hover{
        color: rgb(0,161,214);
    }
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .iconfont {
        font-size: 150px;
    }

</style>