<script setup lang="ts">
    import { Handle } from '@vue-flow/core'

    const props = defineProps({
        node: {
            type: Object,
            required: true,
        },
        methods: {
            type: Array,
            required: true,
        },
    })

    // const emit = defineEmits(['change'])

    const source = computed(() => ({
        right: '-1.5rem',
        width: '1rem',
        height: '1rem',
        border: '0.2rem solid var(--primary-color-600)',
        background: 'var(--primary-color-200)'
    }))

    const target = computed(() => ({
        left: '-1.5rem',
        width: '1rem',
        height: '1rem',
        border: '0',
        background: 'var(--primary-color-600)'
    }))

    const currentMethod = ref(props.node.data.method);
</script>

<template>
    <div class="hs-dropdown relative inline-flex">
        <button id="hs-dropdown-node" type="button" :class="props.node.selected === true ? 'border-primary-500 hover:border-primary-500' : ''" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-4 rounded-md font-medium bg-primary-50 text-primary-700 shadow-sm align-middle hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-600 transition-all text-sm">
            <Icon :name="currentMethod.icon" size="1.25rem"/>
            <div>{{currentMethod.name}}</div>
            <Icon name="mdi:chevron-down" class="chevron mt-0.5 duration-100" size="1.25rem"/>
        </button>

        <div class="!translate-x-[0px] !translate-y-[54px] hs-dropdown-menu transition-[opacity,margin] duration-[100ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-[12rem] bg-primary-50 shadow-sm rounded-lg p-2" aria-labelledby="hs-dropdown-node">
            <div v-for="(method) in methods" @click="() => currentMethod = method" :class="currentMethod === method ? 'font-bold' : ''" class="flex cursor-pointer items-center gap-x-4 py-2.5 px-2.5 rounded-md text-sm font-medium text-primary-700 hover:bg-primary-200">
                <Icon class="text-primary-700" :name="method.icon" size="1.25rem"/>
                <div>{{method.name}}</div>
            </div>
        </div>
    </div>

    <Handle v-if="props.node.data.initial !== true" type="target" :position="props.node.targetPosition" :style="target" />
    <Handle type="source" :position="props.node.sourcePosition" :style="source" />
</template>

<style scoped>
    .open .chevron {
        transform: rotateZ(180deg);
    }
</style>