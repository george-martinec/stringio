<script lang="ts" setup>
    import { Background, BackgroundVariant } from "@vue-flow/background";
    import { VueFlow } from "@vue-flow/core";
    import { MiniMap } from "@vue-flow/minimap";
    import { Controls } from '@vue-flow/controls'

    import '@vue-flow/core/dist/style.css';
    import '@vue-flow/core/dist/theme-default.css';
    import '@vue-flow/minimap/dist/style.css'
    import '@vue-flow/controls/dist/style.css'

    import { ref } from "vue";

    const elements = ref([
        {id: "1", type: "input", label: "Input", position: {x: 0, y: 0}},
        {id: "2", label: "upperCase", position: {x: 0, y: 100}},
        {id: "1", type: "output", label: "Output", position: {x: 0, y: 200}},
    ]);
</script>

<template>
    <div class="flow">
        <VueFlow v-model="elements" fit-view-on-init>
            <Background
                    :variant="BackgroundVariant.Dots"
                    :gap=16
                    :size=1
                    :patternColor="`rgba(0, 0, 0, 0.5)`"
            />
            <MiniMap
                    :nodeColor="`rgba(0, 0, 0, 1)`"
                    :maskColor="`rgba(240, 242, 243, 0.7)`"
                    :pannable=true
                    :zoomable=true
            />
            <Controls />
        </VueFlow>
        <div class="absolute">

        </div>
    </div>
</template>

<style scoped>
    .flow {
        height: 100vh;
        min-width: 640px;
        width: 100%;
    }
</style>