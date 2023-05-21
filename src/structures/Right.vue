<template>
    <div class="right">
        <div>
            <div class="input">
                <textarea ref="input" autofocus></textarea>
            </div>
            <div class="output">
                <textarea ref="output" readonly>awd</textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
    .right {
        width: 360px;
        height: 100vh;
    }

    .input, .output {
        display: block;
    }
</style>