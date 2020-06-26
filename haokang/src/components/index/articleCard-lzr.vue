<template>
    <div>
        <ListItemMeta :avatar="memberInfo.icon" :title="articleInfo.title" :description="memberInfo.sign" style="overflow: hidden"/>
        {{articleInfo.summary}}
        <template slot="action">
            <li>
                <Icon type="ios-star-outline"/>
                123213
            </li>
        </template>
        <template slot="extra">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                 style="width: 280px">
        </template>
    </div>
</template>

<script>
    export default {
        name: "articleCard-lzr",
        props:{
          articleInfo:Object
        },
        data(){
            return{
               memberInfo:{}
            }
        }
    }
</script>

<style scoped>

</style>