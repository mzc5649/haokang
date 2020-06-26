<template>
    <div>
        <div v-if="!isHasArticle">
            暂无文章去
            <router-link to="/create/">投稿</router-link>
        </div>
        <div v-else>
            <div  style="text-align: left">
                        <List item-layout="vertical" :border="true" size="small" >
                            <ListItem v-for="item in articleData" :key="item.id" class="articleCard"
                                      @click.native="toArticle(item.id)">
                                <ListItemMeta v-if="item.member" :avatar="item.member.icon"
                                              :title="item.title"
                                              style="overflow: hidden;height: 34px;"/>
                                <div  class="summary" style="height: 50px;line-height: 25px;overflow: hidden;text-overflow: ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; "
                                >
                                    {{item.summary}}
                                </div>
                                <template slot="action">
                                    <li style="height: 34px">
                                        <Icon type="md-eye"/>
                                        {{item.traffic}}
                                    </li>
                                </template>
                                <template slot="extra">
                                    <img :src="item.coverUrl"
                                         style="width: 280px;height: 150px">
                                </template>
                            </ListItem>
                        </List>
            </div>
            <!-- 分页导航-->
            <Page :total="articlePage.total"
                  :page-size="articlePage.pageNum"
                  :current="articlePage.currentPage"
                  @on-change="articlePageChange"
                  show-total
                  show-elevator/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homeMyArticle",
        data() {
            return {
                isHasArticle: false,
                articlePage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                m_id: '',
                articleData: [],
            }
        },
        created() {
            let that = this;
            //是否登录
            that.axios.post("/member/m/loginOrNot")
                .then(function (res) {
                    if (res.data.code == 0) {
                        that.m_id = res.data.data;
                        that.getArticleData();
                    }
                })
        },
        methods: {
            //获取文章数据
            getArticleData() {
                let that = this;
                let id = that.m_id
                that.axios.get('/article/i/count/m/' + id)
                    .then(function (res) {
                        that.articlePage.total = res.data;
                        if (res.data > 0) {
                            that.isHasArticle = true;
                            // 用户存在文章执行查找
                            //分页获取数据 根据时间降序
                            that.axios.get('/article/i/matchInfoByMid',
                                {
                                    params: {
                                        m_id:id,
                                        page: that.articlePage.currentPage,
                                        num: that.articlePage.pageNum,
                                        orderField: that.articlePage.orderField,
                                        orderType: that.articlePage.orderType
                                    }
                                }
                            ).then(function (res) {
                                    that.articleData = res.data
                            }).catch(function () {
                                that.$Message.error("获取数据失败")
                            })


                        }
                    });
            },
            //跳转到文章
            toArticle(id) {
                let that=this;
                let obj=that.$router.resolve(
                    {
                        path: '/art',
                        query: {
                            articleId: id
                        }
                    }
                );
                window.open(obj.href,"_blank")

            },
            //文章分页切换
            articlePageChange(index) {
                let that = this;
                that. articlePage.currentPage = index;
                that.getVideoData();
            }
        }
    }
</script>

<style scoped>
    .articleCard {
        cursor: pointer;
    }

    .articleCard:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

    }
</style>