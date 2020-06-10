<template>
    <span class="tag" >
        <slot>-</slot>
    </span>
</template>

<script>
    export default {
        name: "classify-tag-mzc"
    }
</script>

<style scoped>
.tag{
    background: #2db7f5;
    color: white;
    display: flex;
    align-items: center;
    height: 12px;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 12px;
    width: 27px;
    justify-content: center;
    margin-left: 3px;
}
</style>