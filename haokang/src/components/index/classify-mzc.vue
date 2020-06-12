<template>
    <div>
        <Row class="classify">
            <Col span="6">
                1
            </Col>
            <Col span="12">
                <div class="classify-mid">
                    <template v-for="(item , index) in data">
                        <a :key="index" class="classify-item">
                            {{item}}
                            <ClassifyTagMzc></ClassifyTagMzc>
                        </a>
                    </template>
                </div>
            </Col>
            <Col span="6">
                3
            </Col>
        </Row>

    </div>

</template>

<script>

    import ClassifyTagMzc from "./classify-tag-mzc";

    export default {
        name: "classify-mzc",
        components: {ClassifyTagMzc},
        props: ['data']
    }

</script>

<style scoped>
    .classify{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .classify-mid {
        display: flex;
        flex-wrap: wrap;
    }

    .classify-item {
        display: flex;
        align-items: center;
        font-size: 15px;
        height: 30px;
        width: 70px;
        color: black;
    }

    .classify-item:hover {
        color: #2d8cf0;
    }
</style>