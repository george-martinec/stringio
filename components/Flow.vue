<script setup lang="ts">
    import { VueFlow, useVueFlow, Position, GraphNode, GraphEdge } from "@vue-flow/core";
    import { Background, BackgroundVariant } from '@vue-flow/background'
    import { ElementData } from "@vue-flow/core/dist/types/flow";
    import { PropType } from "@vue/runtime-core";

    const anyNodeSelected = ref(false);
    const anyEdgeSelected = ref(false);
    const latestNode = ref<GraphNode|null>(null);
    const latestEdge = ref<GraphEdge|null>(null);
    const latestPosition = ref({
        x: -174 / 2,
        y: -46 / 2
    });

    const emit = defineEmits([
        'anyNodeOrEdgeSelected'
    ])

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
        }
    })

    vueFlow.onConnect((params) => {
        params.id = params.source + '-' + params.target;
        vueFlow.addEdges([params]);
    });

    vueFlow.onEdgeDoubleClick((EdgeMouseEvent) => {
        vueFlow.removeEdges(EdgeMouseEvent.edge);
    })

    vueFlow.onNodesChange((NodeChanges) => {
        NodeChanges.forEach((NodeChange) => {
            if (Object.hasOwn(NodeChange, 'selected')) {
                anyNodeSelected.value = NodeChange.selected;
            }

            if (Object.hasOwn(NodeChange, 'type') && NodeChange.type === 'remove') {
                anyNodeSelected.value = false;
            }
        })
    })

    vueFlow.onEdgesChange((EdgeChanges) => {
        EdgeChanges.forEach((EdgeChange) => {
            if (Object.hasOwn(EdgeChange, 'selected')) {
                anyEdgeSelected.value = EdgeChange.selected;
            }

            if (Object.hasOwn(EdgeChange, 'type') && EdgeChange.type === 'remove') {
                anyEdgeSelected.value = false;
            }
        })
    })

    vueFlow.onNodeDragStop((NodeDragEvent) => {
        const nodes = NodeDragEvent.nodes;
        const node = nodes[nodes.length - 1];
        latestPosition.value = node.position;
    });

    watch([anyNodeSelected, anyEdgeSelected], ([node, edge]) => {
        emit('anyNodeOrEdgeSelected', {
            selected: node === true || edge === true
        });
    });

    function add(position: null|{
        x: number,
        y: number,
    }) {
        vueFlow.getSelectedNodes.value.forEach((GraphNode) => GraphNode.selected = false);
        const id = (latestNode.value ? parseInt(latestNode.value.id) : 0) + 1;
        const calculatedPosition = {
            x: (position ? position.x : latestPosition.value.x) + 32,
            y: (position ? position.y : latestPosition.value.y) + 32,
        }

        const node = {
            id: id.toString(),
            type: 'custom',
            position: calculatedPosition,
            data: {
                method: props.methods[0],
            },
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            selected: true,
        }

        latestNode.value = node as ElementData;
        latestPosition.value = calculatedPosition;
        vueFlow.addNodes([node]);
    }

    function duplicate() {
        let nodes = [];
        let edges = [];

        vueFlow.getSelectedNodes.value.forEach((GraphNode) => {
            GraphNode.selected = false

            let data = JSON.parse(JSON.stringify(GraphNode.data));
            data.initial = false;

            const id = (latestNode.value ? parseInt(latestNode.value.id) : 0) + 1;
            const position = {
                x: GraphNode.position.x,
                y: GraphNode.position.y + 48,
            };
            const node = {
                id: id.toString(),
                type: 'custom',
                position: position,
                data: data,
                targetPosition: GraphNode.targetPosition,
                sourcePosition: GraphNode.sourcePosition,
                selected: true,
            };

            latestNode.value = node as ElementData;
            latestPosition.value = position;
            nodes.push(node);
        })

        vueFlow.getSelectedEdges.value.forEach((GraphEdge) => {
            // GraphEdge.selected = false

            console.log(GraphEdge);

            // let data = JSON.parse(JSON.stringify(GraphNode.data));
            // data.initial = false;

            const edge = {
                // id: Math.floor(Math.random() * 1000),
                // type: 'custom',
                // position: {
                //     x: GraphNode.position.x + 20,
                //     y: GraphNode.position.y + 20,
                // },
                // data: data,
                // targetPosition: GraphNode.targetPosition,
                // sourcePosition: GraphNode.sourcePosition,
                // selected: true,
            };

            edges.push(edge);
        })

        vueFlow.addNodes(nodes);
        // vueFlow.addEdges(edges);
    }

    function remove() {
        vueFlow.removeNodes(vueFlow.getSelectedNodes.value);
        vueFlow.removeEdges(vueFlow.getSelectedEdges.value);
    }

    defineExpose({
        remove,
        add,
        duplicate,
    });

    onMounted(() => {
        vueFlow.addNodes([
            {
                id: '0',
                type: 'custom',
                position: latestPosition.value,
                data: {
                    initial: true,
                    method: props.methods[0],
                },
                deletable: false,
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            },
        ]);

        // vueFlow.addEdges([
        //     { id: '1-2', source: '1', target: '2'},
        //     { id: '2-3', source: '2', target: '3'},
        // ]);
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

            :width="500"
            :height="500"
            xxpattern-color="var(--primary-color-500)"
            xbg-color="var(--primary-color-500)"
        />
    </VueFlow>
</template>

<style>
    .vue-flow__edge-path, .vue-flow__connection-path {
        stroke: var(--primary-color-400);
        stroke-width: 3px;
        fill: none;
    }

    .vue-flow__edge.selected .vue-flow__edge-path, .vue-flow__edge:focus .vue-flow__edge-path, .vue-flow__edge:focus-visible .vue-flow__edge-path {
        stroke: var(--primary-color-600);
    }
</style>