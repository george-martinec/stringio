<script setup lang="ts">
    import { onMounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    const props = defineProps({
        content: {
            type: Object as PropType<HTMLDivElement|undefined>,
            required: true,
        },
    })

    interface openDataInterface {
        position: {
            x: number,
            y: number,
        }
    }

    const open = ref(false);
    const contextMenu = ref<HTMLDivElement|undefined>();
    const openData = ref<openDataInterface|undefined>();
    const options = ref([
        {
            action: 'add',
            label: 'Add',
            icon: 'lucide:plus',
        },
        {
            action: 'duplicate',
            label: 'Duplicate',
            icon: 'lucide:copy',
        },
        {
            action: 'remove',
            label: 'Delete',
            icon: 'lucide:trash-2',
        },
    ]);

    function optionSelected(action: string) {
        let option = {
            action: action,
            data: undefined as openDataInterface|undefined,
        };

        switch (option.action) {
            case 'add':
                option.data = openData._rawValue
                break;
        }

        open.value = false;
        emit("optionSelected", option)
    }

    const emit = defineEmits([
        "optionSelected",
    ]);

    onMounted(() => {
        const contextMenuEl = contextMenu.value;
        if (contextMenuEl !== undefined) {
            props.content!.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                open.value = false;
                Timeout.start(() => {
                    const eventTargetBoundingClientRect = event.target!.getBoundingClientRect();
                    contextMenuEl.style.left = event.x + "px";
                    contextMenuEl.style.top = event.y + "px";
                    open.value = true;
                    openData.value = {
                        position: {
                            x: event.x - eventTargetBoundingClientRect.x,
                            y: event.y - eventTargetBoundingClientRect.y,
                        }
                    }
                }, 60);
            })
            onClickOutside(contextMenuEl, () => open.value = false);
        }
    });
</script>

<template>
    <div ref="contextMenu" :class="open ? 'opacity-100' : 'opacity-0 pointer-events-none'" class="position absolute transition-[opacity] duration-[120ms] min-w-[12rem] z-[999] bg-primary-50 shadow-md rounded-lg p-2">
        <div @click="optionSelected(option.action)" v-for="(option) in options" class="flex cursor-pointer items-center gap-x-4 py-2.5 px-2.5 rounded-md text-sm font-medium text-primary-700 hover:bg-primary-200">
            <Icon :name="option.icon" size="1.25rem"/>
            <div>{{option.label}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>