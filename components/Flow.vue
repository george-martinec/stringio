<script setup lang="ts">
    import { VueFlow, useVueFlow, MarkerType, Position } from '@vue-flow/core'
    import { Background, BackgroundVariant } from '@vue-flow/background'

    const vueFlow = useVueFlow({
        edgeUpdaterRadius: 24,
        // snapToGrid: true,
        // snapGrid: [24, 24],
        deleteKeyCode: 'Delete',
        elevateEdgesOnSelect: true,
        defaultZoom: 1,
        minZoom: 1,
        maxZoom: 1,
        edgeTypes: 'smoothstep',
        multiSelectionKeyCode: process.client && navigator.appVersion.indexOf('Mac') !== -1 ? 'Meta' : 'Control',
        // defaultEdgeOptions: {
        //     type: 'custom',
        //     updatable: true,
        //     selectable: true,
        //     markerEnd: MarkerType.ArrowClosed,
        // }
    })

    vueFlow.onConnect((params) => {
        params.class = `source-${params.sourceHandle} target-${params.targetHandle}`;
        params.updatable = true;
        vueFlow.addEdges([params]);
    });

    function applyFlowData() {
        vueFlow.setNodes([
            {
                id: '1',
                // source: '1',
                target: '2',
                // type: 'custom',
                draggable: true,
                // connectable: true,
                type: "output",
                position: {
                    x: 0,
                    y: 0,
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Right,
            },
            {
                id: '2',
                source: '1',
                // type: 'custom',
                draggable: true,
                connectable: true,
                position: {
                    x: 0,
                    y: 0,
                },
                targetPosition: Position.Right,
                sourcePosition: Position.Left,
            },
            {
                id: '3',
                // source: '2',
                // type: 'custom',
                draggable: true,
                connectable: true,
                position: {
                    x: 0,
                    y: 0,
                },
                targetPosition: Position.Right,
                sourcePosition: Position.Left,
            },
        ]);
        // editor.setEdges(props.data?.edges || []);
        // editor.setTransform({
        //     x: props.data?.x || 0,
        //     y: props.data?.y || 0,
        //     zoom: props.data?.zoom || 1,
        // });
    }

    onMounted(() => {
        applyFlowData();
    });
</script>

<template>
    <VueFlow>
        <template #node-custom="props">
            <select class="w-[240px] h-[48px] pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">-->
                <option selected>UpperCase</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </template>
        <Background
            :variant="BackgroundVariant.Dots"
            :size="2"
            :gap="24"
            pattern-color="var(--primary-color-500)"
        />
    </VueFlow>
</template>

<style>
    @import '@vue-flow/core/dist/style.css';
    @import '@vue-flow/core/dist/theme-default.css';
</style>