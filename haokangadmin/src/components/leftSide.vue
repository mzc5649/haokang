<template>
        <Menu :theme="theme" :active-name="$route.name">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"/>
                    会员管理
                </template>
                <MenuItem name="Member" to="/member">所有会员</MenuItem>
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
                    <Icon type="ios-people" />
                   分类管理
                </template>
                <MenuItem name="Classify" to="/classify">所有分类</MenuItem>
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