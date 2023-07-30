<script setup lang="ts">
    import { onMounted, defineEmits } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    const emit = defineEmits([
        "optionSelected",
    ]);

    const options = ref([
        {
            action: 'add',
            label: 'Add',
            icon: 'lucide:plus',
        },
        {
            action: 'copy',
            label: 'Copy',
            icon: 'lucide:clipboard-copy',
        },
        {
            action: 'paste',
            label: 'Paste',
            icon: 'lucide:clipboard-paste',
        },
        {
            action: 'delete',
            label: 'Delete',
            icon: 'lucide:trash-2',
        },
    ]);

    function optionSelected(action: string) {
        open.value = false;
        emit("optionSelected", action)
    }

    const contextMenu = ref<HTMLDivElement>()
    const open = ref(false);
    onMounted(() => {
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            open.value = false;
            Timeout.start(() => {
                const contextMenuElStyle = contextMenu.value?.style;
                if (contextMenuElStyle !== undefined) {
                    contextMenuElStyle.top = event.y + "px";
                    contextMenuElStyle.left = event.x + "px";
                    open.value = true;
                }
            }, 60);
        })
        onClickOutside(contextMenu, () => open.value = false);
    });
</script>

<template>
    <div ref="contextMenu" :class="open ? 'opacity-100' : 'opacity-0 pointer-events-none'" class="position absolute transition-[opacity] duration-[120ms] min-w-[12rem] z-[999] bg-primary-50 shadow-md rounded-lg p-2">
        <div @click="optionSelected(option.action)" v-for="(option) in options" class="flex cursor-pointer items-center gap-x-4 py-2.5 px-2.5 rounded-md text-sm font-medium text-primary-800 hover:bg-primary-200">
            <Icon class="text-primary-800" :name="option.icon" size="1.25rem"/>
            <div class>{{option.label}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>