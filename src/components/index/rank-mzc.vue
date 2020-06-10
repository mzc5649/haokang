<template>
    <div style="height: 390px;" data-aos="fade-up">
        <template v-for="(item,index) in data">
            <div v-if="index==0" :key="index+1">
                <div :key="index+1" style="height: 120px;display: flex" data-aos="fade-left">
                    <span>  {{index+1}}</span>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div v-else :key="index+1">
                <div :key="index+1" style="height: 30px;display: flex" data-aos="fade-left">
                    <span>  {{index+1}}</span>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "rank-mzc",
        props:['data']
    }
</script>

<style scoped>

</style>