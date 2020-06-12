<template>
    <Row>
        <div style="height: 50px;font-size: 20px;">
            <slot name="sort"></slot>
        </div>
            <slot name="video"></slot>
            <slot name="article"></slot>
    </Row>
</template>

<script>
    export default {
        name: "sort-mzc"
    }
</script>

<style scoped>

</style>