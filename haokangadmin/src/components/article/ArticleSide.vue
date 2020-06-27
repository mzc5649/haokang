<template>
    <Menu :theme="theme" @on-select="select" width="auto">
        <MenuGroup title="视频分类">
            <template v-for="(item) in classifyData">
                <MenuItem :name="item.id" :key="item.id">
                    <Icon type="md-document"/>
                    {{item.classifyName}}
                </MenuItem>
            </template>
        </MenuGroup>
    </Menu>
</template>
<script>
    export default {
        name: "ArticleSide",
        data() {
            return {
                theme: 'light',
                classifyData: []
            }
        },
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            that.axios.get("/admin/vc/")
                .then(function (data) {
                    that.classifyData = data.data.data;
                }).catch(function () {
                that.$Message.error('获取数据失败');
            });
        }, methods: {
            select(name) {
                this.$router.push(
                    {
                        path: '/article/articleInfo',
                        query: {
                            classifyId: name
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                ).catch(err => {
                });
            }
        }


    }
</script>

<style scoped>

</style>