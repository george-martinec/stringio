<script setup lang="ts">
    import { onMounted } from "vue";

    const toasts = ref<HTMLDivElement|undefined>();

    const props = defineProps({
        toasts: {
            type: Array as PropType<{
                message: string,
                type: 'info'|'success'|'error'|'warning'|null,
                time: number,
            }[]>,
            required: true,
        },
    })

    function remove(element: HTMLDivElement) {
        const duration = 500;
        element.style.opacity = '';
        element.style.transform = '';
        element.classList.add('hs-removing');
        setTimeout(() => {
            element.remove();
        }, duration)
    }

    onMounted(() => {
        toasts.value!.addEventListener('DOMNodeInserted', (event) => {
            const element = event.target as HTMLDivElement;
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }, 0);

            const time = parseInt(element.getAttribute('time') ?? '');
            if (time !== 0) {
                console.log(element, time);
                setTimeout(() => {
                    remove(element);
                }, time)
            }
        })
    });
</script>

<template>
    <div ref="toasts" class="flex flex-col fixed top-12 p-2 md:p-0 md:top-20 md:right-8 z-[50] pointer-events-none">
        <Info class="text-blue-500 block" size="1.25rem" />
        <div v-for="(toast) in props.toasts" :time="toast.time" @click="remove($event.currentTarget)" class="mt-4 select-none ml-auto pointer-events-auto cursor-pointer ease-in-out relative hs-removing:translate-x-5 translate-x-5 hs-removing:opacity-0 transition-[transform,opacity] duration-500 opacity-0 shadow-sm bg-primary-50 hover:bg-primary-100 rounded-md overflow-hidden" role="alert">
            <Info class="text-blue-500 block" size="1.25rem" />
            <div class="flex p-4 relative text-sm text-primary-800 font-medium z-20">
                <div class="mr-3 flex" v-if="toast.type !== null">
                    <IconCSS v-if="toast.type === 'info'" class="text-blue-500" name="lucide:info" size="1.25rem" />
                    <IconCSS v-if="toast.type === 'success'" class="text-green-500" name="lucide:check-circle-2" size="1.25rem" />
                    <IconCSS v-if="toast.type === 'error'" class="text-red-500" name="lucide:x-circle" size="1.25rem" />
                    <IconCSS v-if="toast.type === 'warning'" class="text-amber-500" name="lucide:alert-circle" size="1.25rem" />
                </div>
                <div v-html="toast.message"></div>
            </div>
            <div class="flex absolute right-0 bottom-0 left-0 h-0.5 z-10">
                <div class="flex flex-col justify-center overflow-hidden bg-primary-400 w-full translate-x-0 time" :style="'animation-duration:' + toast.time + 'ms'" role="progressbar"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @keyframes time {
        from {
            transform: translateX(0%)
        }
        to {
            transform: translateX(100%)
        }
    }

    .time {
        animation-name: time;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }
</style>