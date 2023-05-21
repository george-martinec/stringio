<script lang="ts" setup>
    import Flow from "./structures/Flow.vue";
    import Left from "./structures/Left.vue";
    import Right from "./structures/Right.vue";
</script>

<template>
    <div>
        <Left/>
        <Flow/>
        <Right/>
    </div>
</template>

<style scoped>
    div {
        display: flex;
    }
</style>
