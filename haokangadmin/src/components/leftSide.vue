<template>
        <Menu :theme="theme" :active-name="$route.name">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"/>
                    会员管理
                </template>
                <MenuItem name="Member" to="/member">所有会员</MenuItem>
                <MenuItem name="1-2">新增会员</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people" />
                    视频管理
                </template>
                <MenuItem name="Video" to="/video">所有视频</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-people" />
                    文章管理
                </template>
                <MenuItem name="Article" to="/article">所有文章</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Icon type="ios-stats" />
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
</template>

<script>
    export default {
        name: "leftSide",
        data(){
            return {
                theme:'light'
            }
        }
    }
</script>

<style scoped>

</style>