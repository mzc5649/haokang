<template>
    <div style="text-align: center;padding: 5px">
        <div style="text-align: left">
            <Button type="primary" style="margin-bottom: 5px" @click="showClass">添加分类</Button>
        </div>
        <Table border :loading="loading" :columns="columns" :data="classifyData">
            <template v-slot:action="{row,index}">
                <Button type="error" size="small" @click="remove(row,index)">删除</Button>
            </template>
        </Table>
        <!-- 分页导航-->
        <Page :total="classifyPage.total"
              :page-size="classifyPage.pageNum"
              :current="classifyPage.currentPage"
              @on-change="classifyPageChange"
              show-total
              show-elevator/>
        <Modal v-model="modal" width="360">
            <p slot="header" style="text-align:center">
                <span>添加分类</span>
            </p>
            <div style="text-align:center">
             <Input v-model="newClassifyName" placeholder="请输入新的分类名称，注意不要重复哦"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="addClass">添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "Classify",
        data() {
            return {
                modal:false,
                // eslint-disable-next-line @typescript-eslint/camelcase
                modal_loading:false,
                newClassifyName:'',
                classifyPage: {
                    total: 0,
                    pageNum: 10,
                    currentPage: 1,
                    orderField: 'createTime',
                    orderType: 'desc'
                },
                loading: true,
                theme: 'light',
                classifyData: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '名称',
                        key: 'classifyName',
                        sortable: true,
                        tooltip: true
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ]
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            that.getClassifyData();
        },
        methods: {
            getClassifyData() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                //获取总数
                that.axios.get("/admin/vc/count").then(function (res) {

                    if (res.data.code == 0) {
                        that.classifyPage.total = res.data.data;
                    } else {
                        that.$Message.error('获取数据失败');
                    }
                }).catch(function () {
                    that.$Message.error('获取数据失败');
                })
                //数据获取 分页
                that.axios.get("/admin/vc/page",
                    {
                        params: {
                            pageIndex: that.classifyPage.currentPage,
                            pageNum: that.classifyPage.pageNum
                        }
                    })
                    .then(function (res) {
                        that.loading = false;
                        that.classifyData = res.data.data;
                    }).catch(function () {
                    that.loading = false;
                    that.$Message.error('获取数据失败');
                });
            },
            //分类分页切换
            classifyPageChange(index) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                that.loading = true;
                that.classifyPage.currentPage = index;
                that.getClassifyData()
            },
            //删除按钮
            remove(row, index) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                that.$Modal.confirm({
                    title: '删除',
                    content: '<p>确认删除id为 "<b>' + row.id + '</b>",名称为 "<b>' + row.classifyName + '</b>" 的分类吗?<span style="color: red">(请注意该分类下的所有内容都会被删除)</span></p>',
                    loading: true,
                    onOk: () => {
                        //删除article
                        that.axios.delete("/admin/me/deleteClassify/"+row.id).
                        then(function (res) {
                            if(res.data.code==0){
                                that.$Modal.remove();
                                that.$Message.success('删除成功');
                                that.classifyData.splice(index, 1);
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
            showClass(){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                that.newClassifyName='';
                that.modal=true;

            },
            addClass(){
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that=this;
                if(that.newClassifyName===''){
                    that.$Message.info("请输入分类名称");
                    return;
                }else if(that.newClassifyName.indexOf(' ')!=-1){
                    that.$Message.info("分类名称不能有空格");
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/camelcase
                that.modal_loading=true;
               that.axios.put("/admin/me/classifyAdd",{
                   classifyName:that.newClassifyName
               }).then(function (res) {

                   // eslint-disable-next-line @typescript-eslint/camelcase
                   that.modal_loading=false;
                if(res.data.code==0){
                    that.modal=false;
                    that.$Message.success("添加成功");
                    that.getClassifyData();
                }else{
                    that.$Message.error(res.data.msg);
                }
               }).catch(function () {
                   // eslint-disable-next-line @typescript-eslint/camelcase
                   that.modal_loading=false;
                   that.$Message.error("添加失败");
               })




            }
        }
    }
</script>

<style scoped>

</style>