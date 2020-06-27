<template>
    <div style="text-align: center">
        <Table border :loading="loading" :columns="columns" :data="articleData">
            <template v-slot:action="{row,index}">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
                <Button type="error" size="small" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <!-- 分页导航-->
        <Page :total="articlePage.total"
              :page-size="articlePage.pageNum"
              :current="articlePage.currentPage"
              @on-change="articlePageChange"
              show-total
              show-elevator/>
    </div>
</template>

<script>
    export default {
        name: "ArticleInfo",
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
            const id = that.$route.query.classifyId;
            that.getArticleData(id)
        },
        methods:{
            getArticleData(id){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                //文章所有数量
                that.axios.get("/admin/i/count/"+id)
                    .then(function (res) {
                        if(res.data.code==0){
                            that.articlePage.total=res.data.data;
                        }else{
                            that.$Message.error("获取数据失败")
                        }
                    })
                //文章分页数据
                that.axios.get("/admin/i/page/"+id,{
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
                this.$router.push("/article/articleDetail?id=" + row.id);
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
                    content: '<p>确认删除id为 "<b>' + row.id + '</b>" ,标题为 "<b>' + row.title + '</b>" 的文章吗</p>',
                    loading: true,
                    onOk: () => {
                        //删除article
                    that.axios.delete("/admin/i/"+row.id).
                        then(function (res) {
                        if(res.data.code==0){
                            that.$Modal.remove();
                            that.$Message.success('删除成功');
                            that.articleData.splice(index, 1);
                        }else{
                            that.$Modal.remove();
                            that.$Message.error('删除失败');
                        }
                    }).catch(function () {
                        that.$Message.error('删除失败');
                    })

                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>