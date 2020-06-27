<template>
    <Layout>
        <Sider style="max-width: 110px;min-width: 110px">
            <ArticleSide></ArticleSide>
        </Sider>
        <Content>
            <router-view :key="$route.path+$route.query.classifyId"></router-view>
        </Content>
    </Layout>
</template>
<script>
    import ArticleSide from "@/components/article/ArticleSide";
    export default {
        name: "Article",
        components: {ArticleSide},
        data() {
            return {
                loading: true,
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true,
                        width: 70,
                        tooltip: true
                    },
                    {
                        title: '分类ID',
                        key: 'classify_id',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '标题',
                        key: 'title',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '简介',
                        key: 'summary',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '阅读量',
                        key: 'traffic',
                        sortable: true,

                        tooltip: true
                    },
                    {
                        title: '发布时间',
                        key: 'createTime',
                        tooltip: true
                    },

                    {
                        title: '修改时间',
                        key: 'modifiedTime',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                articleData: [],
                articlePage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let that=this;
            that.getArticleData()
        },
        methods:{
            getArticleData(){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                //文章所有数量
                that.axios.get("/admin/i/count")
                .then(function (res) {
                    if(res.data.code==0){
                        that.articlePage.total=res.data.data;
                    }else{
                        that.$Message.error("获取数据失败")
                    }
                })

                //文章分页数据
                that.axios.get("/admin/i/page",{
                    params:{
                        pageIndex:that.articlePage.currentPage,
                        pageNum:that.articlePage.pageNum
                    }
                }).then(function (res) {
                    if(res.data.code==0){
                        that.articleData=res.data.data;
                        that.loading=false;
                    }else{
                        that.$Message.error("获取数据失败")
                    }
                })
            },
            articlePageChange(index){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                that.loading=true;
                that.articlePage.currentPage=index;
                that.getArticleData()
            },
            //显示详细数据跳转
            show(row) {
                this.$router.push("/articleDetail?id=" + row.id);
            },
            //删除按钮
            remove(row, index) {
                this.async(row, index);
            },
            //异步确认框
            async(row, index) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const that = this;
                that.$Modal.confirm({
                    title: '删除',
                    content: '<p>确认删除id为 "' + row.id + '" ,标题为 "' + row.title + '" 的文章吗</p>',
                    loading: true,
                    onOk: () => {
                        //删除member

                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>