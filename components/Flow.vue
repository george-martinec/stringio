<script setup lang="ts">
    import { VueFlow, useVueFlow, MarkerType, Position, SmoothStepEdge } from '@vue-flow/core'
    import { Background, BackgroundVariant } from '@vue-flow/background'

    const props = defineProps({
        methods: {
            type: Array,
            required: true,
        },
    })

    const vueFlow = useVueFlow({
        edgeUpdaterRadius: 24,
        snapToGrid: true,
        snapGrid: [8, 8],
        deleteKeyCode: 'Delete',
        elevateEdgesOnSelect: true,
        connectionRadius: 24,
        autoConnect: true,
        minZoom: 1,
        maxZoom: 2,
        multiSelectionKeyCode: process.client && navigator.appVersion.indexOf('Mac') !== -1 ? 'Meta' : 'Control',
        defaultPosition: [0, 0],
        defaultEdgeOptions: {
            type: SmoothStepEdge,
            updatable: true,
            selectable: true,
            markerEnd: MarkerType.ArrowClosed,
            strokeWidth: 8,
        }
    })

    vueFlow.onConnect((params) => {
        params.id = params.source + '-' + params.target;
        params.updatable = true;
        vueFlow.addEdges([params]);
    });

    function applyFlowData() {
        vueFlow.setNodes([
            {
                id: '1',
                type: 'custom',
                position: {
                    x: 100,
                    y: 100,
                },
                data: {
                    initial: true,
                    method: props.methods[0],
                },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
            {
                id: '2',
                type: 'custom',
                position: {
                    x: 200,
                    y: 200,
                },
                data: {
                    initial: false,
                    method: props.methods[0],
                },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
            {
                id: '3',
                type: 'custom',
                position: {
                    x: 300,
                    y: 300,
                },
                data: {
                    initial: false,
                    method: props.methods[0],
                },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
        ]);
        vueFlow.setEdges([
            { id: '1-2', source: '1', target: '2'},
            { id: '2-3', source: '2', target: '3'},
        ]);
    }

    onMounted(() => {
        applyFlowData();
    });
</script>

<template>
    <VueFlow>
        <template #node-custom="node">
            <Node :node="{...node}" :methods="props.methods"/>
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