<template>
    <Row :gutter="10">
        <Col span="10">
            <Carousel v-model="value1" loop
                      :height="250"
                      dots="inside"
            >
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="/horse1.jpg" style="width: 100%;height: 250px">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">2</div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">3</div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">4</div>
                </CarouselItem>
            </Carousel>
        </Col>
        <Col span="14">
            <Row :gutter="10">
                <template v-for="(item ,index) in data">
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
                data: [
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    },
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    },
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    },
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    },
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    },
                    {
                        title: '狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒狮子“阿廖沙”太活泼了，它喜欢把游客扑倒',
                        author: '克里米亚野生动物园',
                        playNum: '10.7万次播放',
                        style: {
                            'background-image': 'url(/img/1.jpg)',
                            'background-size': '100% 120px'
                        }
                    }
                ]
            }
        },
        components: {RecommendCard}
    }
</script>

<style scoped>

</style>