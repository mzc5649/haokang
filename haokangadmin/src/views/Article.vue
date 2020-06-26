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
        name: "Article",
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
        methods:{
            articlePageChange(){
                //
            }
        }
    }
</script>

<style scoped>

</style>