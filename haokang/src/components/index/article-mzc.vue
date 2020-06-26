<template>
    <div class="article" >
        <Row :gutter="10" v-if="isShow" >
            <Col span="24">
                <div style="height: 30px;display: flex;justify-content: flex-start;font-size: 18px;align-items: center;padding-left:16px ">
                    <slot>文章</slot>
                </div>
                <Row style="text-align: left" >
                    <List item-layout="vertical" :border="true" size="small" >
                        <ListItem v-for="item in articleData" :key="item.id" class="articleCard"
                                  @click.native="toArticle(item.id)" data-aos="fade-up">
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
                </Row>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: "video-mzc",
        props: {
            classifyId: Number,
        },
        data() {
            return {
                isShow: false,
                articleData: [
                    {}
                ]
            }
        },
        created() {
            let that = this;
            //分类id
            that.axios.get('/article/i/mf',
                {
                    params: {
                        id: that.classifyId,
                        page: 1,
                        num: 4
                    }
                }
            ).then(function (res) {
                that.articleData = res.data;
                if (res.data.length > 0) {
                    that.isShow = true;
                }
                for (let i = 0; i < that.articleData.length; i++) {
                    let m_id = that.articleData[i].m_id
                    //查询用户
                    that.axios.get("/member/m/" + m_id)
                        .then(function (res) {
                            if (res.data.code == 0) {
                                that.articleData[i].member = res.data.data
                            }
                        })

                }

            })
        },
        components: {},
        methods: {
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