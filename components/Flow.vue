<script setup lang="ts">
    import { VueFlow, useVueFlow, MarkerType, Position, SmoothStepEdge } from '@vue-flow/core'
    import { Background, BackgroundVariant } from '@vue-flow/background'

    const flow = ref<HTMLDivElement|undefined>();

    const props = defineProps({
        methods: {
            type: Array,
            required: true,
        },
        flowGround: {
            type: Object as PropType<HTMLDivElement|undefined>,
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
        minZoom: 0.5,
        maxZoom: 2,
        multiSelectionKeyCode: process.client && navigator.appVersion.indexOf('Mac') !== -1 ? 'Meta' : 'Control',
        defaultViewport: {
            x: props.flowGround!.getBoundingClientRect().width / 2,
            y: props.flowGround!.getBoundingClientRect().height / 2,
            zoom: 1,
        },
        defaultEdgeOptions: {
            type: 'smoothstep',
            updatable: true,
            selectable: true,
            deletable: true,
            markerEnd: MarkerType.ArrowClosed,
        }
    })

    vueFlow.onConnect((params) => {
        params.id = params.source + '-' + params.target;
        vueFlow.addEdges([params]);
    });

    onMounted(() => {
        vueFlow.addNodes([
            {
                id: '1',
                type: 'custom',
                position: {
                    x: -174 / 2,
                    y: -46 / 2,
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
                    y: -46 / 2,
                },
                data: {
                    method: props.methods[0],
                },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
            {
                id: '3',
                type: 'custom',
                position: {
                    x: 500,
                    y: -46 / 2,
                },
                data: {
                    method: props.methods[0],
                },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
        ]);

        vueFlow.addEdges([
            { id: '1-2', source: '1', target: '2'},
            { id: '2-3', source: '2', target: '3'},
        ]);
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