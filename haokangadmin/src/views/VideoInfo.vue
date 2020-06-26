<template>
    <div style="text-align: center">
        <Table border :loading="loading" :columns="columns" :data="videoData">
            <template v-slot:action="{row,index}">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
                <Button type="error" size="small" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <!-- 分页导航-->
        <Page :total="videoPage.total"
              :page-size="videoPage.pageNum"
              :current="videoPage.currentPage"
              @on-change="videoPageChange"
              show-total
              show-elevator/>
    </div>

</template>

<script>
    export default {
        name: "VideoInfo",
        data() {
            return {
                id: '',
                videoPage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                videoData: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true,
                        width: 70,
                        tooltip: true
                    },
                    {
                        title: '标题',
                        key: 'title',
                        sortable: true,
                        width: 100,
                        tooltip: true
                    },
                    {
                        title: '类别ID',
                        key: 'classify_id',
                        sortable: true,
                        width: 100,
                        tooltip: true
                    },
                    {
                        title: '会员id',
                        key: 'member_id',
                        sortable: true,
                        width: 100,
                        tooltip: true
                    },
                    {
                        title: '浏览量',
                        key: 'viewCount',
                        sortable: true,
                        width: 100,
                        tooltip: true
                    },
                    {
                        title: '封面',
                        key: 'viewCoverUrl',
                        tooltip: true
                    },

                    {
                        title: '简介',
                        key: 'videoDescribe',
                        tooltip: true
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true,

                    },
                    {
                        title: '修改时间',
                        key: 'modifiedTime',
                        sortable: true,

                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                loading: false
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            const id = that.$route.query.classifyId;
            that.id = id;
            that.loading = true;
            that.getVideoData();
        },
        methods: {
            //显示详细数据跳转
            show(row) {
                this.$router.push("/video/videoDetail?id=" + row.id);
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
                        that.axios.delete('/admin/v/' + row.id)
                            .then(function (res) {
                                if (res.data.data) {
                                    that.$Modal.remove();
                                    that.$Message.success('删除成功');
                                    that.videoData.splice(index, 1);
                                } else {
                                    that.$Modal.remove();
                                    that.$Message.error('删除失败');
                                }

                            }).catch(function () {
                            that.$Modal.remove();
                            that.$Message.error('删除失败');

                        });
                    }
                });
            },
            //视频分页切换
            videoPageChange(index) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                that.loading = true;
                that.videoPage.currentPage = index;
                that.getVideoData()

            },
            getVideoData() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                //获取该分类下视频数量
                that.axios.get('/admin/v/count/classify/' + that.id)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.videoPage.total = res.data.data;
                        } else {
                            that.$Message.error("获取数据失败")
                        }
                    }).catch(function () {
                    that.$Message.error("获取数据失败")
                })
                //根据分类id 获取视频分页数据 根据时间降序
                that.axios.get('/admin/v/page/custom/classify/' + that.id,
                    {
                        params: {
                            pageIndex: that.videoPage.currentPage,
                            pageNum: that.videoPage.pageNum,
                            orderField: that.videoPage.orderField,
                            orderType: that.videoPage.orderType
                        }
                    }
                ).then(function (res) {
                    if (res.data.code == 0) {
                        that.videoData = res.data.data
                        that.loading = false;
                    } else {
                        that.$Message.error("获取数据失败")
                    }
                }).catch(function (e) {
                    console.log(e)
                    that.$Message.error("获取数据失败")
                })
            }
        }
    }
</script>

<style scoped>

</style>