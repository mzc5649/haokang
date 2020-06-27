<template>
    <Row :gutter="10">
        <Col span="10">
            <Carousel v-model="value1" loop
                      :height="250"
                      dots="inside"
                      autoplay
                      :autoplay-speed="5000"

            >
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="/img/lunbo/horse1.jpg" style="width: 100%;height: 250px">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="/img/lunbo/horse4.jpg" style="width: 100%;height: 250px">
                    </div>
                </CarouselItem>

            </Carousel>
        </Col>
        <Col span="14">
            <Row :gutter="10">
                <template v-for="(item ,index) in videoData">
                    <Col :key="index" span="8">
                        <RecommendCard :key="index" :info="item"></RecommendCard>
                    </Col>
                </template>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import RecommendCard from "@/components/index/recommendCard-mzc"

    export default {
        name: "lunbo-mzc",
        data() {
            return {
                value1: 0,
            }
        },
        components: {RecommendCard},
        props:{
            videoData:Array
        }
    }
</script>

<style scoped>

</style>