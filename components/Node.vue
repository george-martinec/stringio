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
        right: '-24px',
        width: '16px',
        height: '16px',
        border: '2px solid var(--primary-color-600)',
        background: 'var(--primary-color-200)'
    }))

    const target = computed(() => ({
        left: '-24px',
        width: '16px',
        height: '16px',
        border: '0',
        background: 'var(--primary-color-600)'
    }))

    const currentMethod = ref(props.node.data.method);
</script>

<template>
    <div class="hs-dropdown relative inline-flex">
        <button id="hs-dropdown-node" type="button" :class="props.node.selected === true ? 'border-primary-500 hover:border-primary-500' : ''" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-primary-50 text-gray-700 shadow-sm align-middle hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
            {{ currentMethod.name }}
            <svg class="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="hs-dropdown-menu transition-[opacity,margin] duration-[100ms] hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2" aria-labelledby="node">
            <a v-for="(method) in methods" @click="() => currentMethod = method" :class="currentMethod === method ? 'font-bold' : ''" class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                {{ method.name }}
            </a>
        </div>
    </div>

    <Handle v-if="props.node.data.initial !== true" type="target" :position="props.node.targetPosition" :style="target" />
    <Handle type="source" :position="props.node.sourcePosition" :style="source" />
</template>
