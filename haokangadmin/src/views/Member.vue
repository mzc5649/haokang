<template>
    <div style="text-align: center">
        <Table border :loading="loading" :columns="columns" :data="memberData">
            <template v-slot:action="{row,index}">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
                <Button type="error" size="small" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <!-- 分页导航-->
        <Page :total="memberPage.total"
              :page-size="memberPage.pageNum"
              :current="memberPage.currentPage"
              @on-change="memberPageChange"
              show-total
              show-elevator/>
    </div>
</template>

<script>
    export default {
        name: "Member",
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
                        title: '头像地址',
                        key: 'icon',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '昵称',
                        key: 'nickname',
                        sortable: true,

                        tooltip: true
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        sortable: true,

                        tooltip: true
                    },
                    {
                        title: '密码',
                        key: 'password',
                        sortable: true,

                        tooltip: true
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        tooltip: true
                    },

                    {
                        title: '出生日期',
                        key: 'birthday',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '个性签名',
                        key: 'sign',
                        sortable: true,

                    },
                    {
                        title: '金币',
                        key: 'account',
                        sortable: true,

                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                memberData: [],
                memberPage: {
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
            let that = this;
            that.getMemberData();
        },
        methods: {
            getMemberData() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                //    获取记录总数
                that.axios.get("/admin/me/count")
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.memberPage.total = res.data.data;
                        } else {
                            that.$Message.error('获取数据失败');
                        }
                    }).catch(function () {
                    that.$Message.error('获取数据失败');
                })
                //获取分页数据
                that.axios.get("/admin/me/page", {
                    params: {
                        pageIndex: that.memberPage.currentPage,
                        pageNum: that.memberPage.pageNum
                    }
                }).then(function (res) {
                    if (res.data.code == 0) {
                        that.memberData= res.data.data;
                        that.loading=false;
                    } else {
                        that.$Message.error('获取数据失败');
                    }
                }).catch(function () {
                    that.$Message.error('获取数据失败');
                })

            },
            //显示详细数据跳转
            show(row) {
                 this.$router.push("/memberDetail?id=" + row.id);
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
                    content: '<p>确认删除id为 "' + row.id + '" ,昵称为 "' + row.nickname + '" 的用户吗</p>',
                    loading: true,
                    onOk: () => {
                        //删除member
                        that.axios.delete('/admin/me/'+row.id)
                             .then(function (res) {
                                if (res.data.code==0) {
                                    that.$Modal.remove();
                                    that.$Message.success('删除成功');
                                    that.memberData.splice(index, 1);
                                } else {
                                    that.$Modal.remove();
                                    that.$Message.error('删除失败');
                                }
                            }).catch(function (e) {
                                console.log(e)
                            that.$Modal.remove();
                            that.$Message.error('删除失败');
                        });

                    }
                });
            },
            //分页
            memberPageChange(index) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                that.memberPage.currentPage=index;
                that.getMemberData();
            },

        }
    }
</script>

<style scoped>

</style>