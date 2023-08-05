<script setup lang="ts">
    import { onMounted } from 'vue'

    useHead({
        title: useI18n().t("pages.index.head.title"),
        meta: [
            {
                name: "description",
                content: useI18n().t("pages.index.head.description"),
            },
        ],
        // bodyAttrs: {
        //     class: 'dark',
        // },
    });

    function optionSelected(action: string) {
        console.log(action);
    }

    const input = ref<HTMLTextAreaElement|undefined>();
    const output = ref<HTMLTextAreaElement|undefined>();
    const content = ref<HTMLDivElement|undefined>();
    const flowGround = ref<HTMLDivElement|undefined>();
    const pastePermission = ref(null);
    const toasts = ref<{
        message: string,
        type: 'info'|'success'|'error'|'warning'|null,
        time: number,
    }[]>([]);

    function applyTransformation(inputValue: string) {
        return inputValue.toUpperCase();
    }

    function onInput() {
        output.value!.value = applyTransformation(input.value!.value);
    }

    function swap() {
        input.value!.value = output.value!.value;
    }

    function toast(message: string, type: 'info'|'success'|'error'|'warning'|null, time: number) {
        toasts.value.push({
            message: message,
            type: type,
            time: time,
        });
    }

    function remove(element: HTMLDivElement) {
        console.log(element);
    }

    async function copy() {
        const outputEl = output.value;
        if (outputEl !== undefined) {
            if (outputEl.value === '') {
                toast('Output is empty', 'info', 5000);
            } else {
                outputEl.select();
                outputEl.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
                window.isSecureContext
                    ? await window.navigator.clipboard.writeText(outputEl.value)
                    : document.execCommand('copy');
                toast('Output was copied successfully !', 'success', 5000);
            }
        }
    }

    async function paste() {
        const inputEl = input.value;
        if (inputEl !== undefined) {
            try {
                inputEl.value = await window.navigator.clipboard.readText();
                toast('Clipboard contents pasted successfully !', 'success', 5000);
            } catch (exception) {
                toast('Permission for clipboard is required !', 'error', 10000);
            }
        }
    }

    const methods = ref([
        {
            name: 'UPPERCASE',
            icon: 'mdi:format-letter-case-upper',
        },
        {
            name: 'lowercase',
            icon: 'mdi:format-letter-case-lower',
        },
        {
            name: 'snake_case',
            icon: 'mdi:snake',
        },
        {
            name: 'kebab-case',
            icon: 'material-symbols:kebab-dining-outline',
        },
    ])

    onMounted(async () => {
        // Tooltip fix
        [...document.body.getElementsByClassName('hs-tooltip')].forEach(
            (element) => element.addEventListener('mouseleave', () => {element.classList.remove('show')})
        );
    });
</script>

<template>
    <div class="flex flex-col h-full">
        <header class="flex p-3 md:px-8 shadow-sm z-10 bg-primary-50">
            <div left class="flex flex-1">
                <div class="hidden md:inline-block hs-tooltip [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                        <Icon name="lucide:plus" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Add
                        </span>
                    </button>
                </div>

                <div class="hidden md:inline-block hs-tooltip [--placement:bottom] mr-1">
                    <button disabled class="hs-tooltip-toggle p-2 disabled:bg-primary-200 disabled:text-primary-400 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:copy" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Duplicate
                        </span>
                    </button>
                </div>
                <div class="hidden md:inline-block hs-tooltip [--placement:bottom] mr-4">
                    <button @mouseenter="remove($event.currentTarget)" class="hs-tooltip-toggle p-2 disabled:bg-primary-200 disabled:text-primary-400 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:trash-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Delete
                        </span>
                    </button>
                </div>

                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:undo-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Undo
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:redo-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Redo
                        </span>
                    </button>
                </div>
            </div>

            <div right class="flex">
                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button @click="copy" class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:clipboard-copy" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Copy
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-8">
                    <button @click="paste" :disabled="pastePermission === false" class="hs-tooltip-toggle p-2 disabled:bg-primary-200 disabled:text-primary-400  inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:clipboard-paste" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Paste
                        </span>
                    </button>
                </div>

                <div class="hs-tooltip inline-block [--placement:bottom]" data-hs-overlay="#hs-settings-modal">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                        <Icon name="lucide:settings" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Settings
                        </span>
                    </button>
                </div>
            </div>
        </header>
        <main class="flex flex-1 bg-primary-200 relative">
            <div class="w-full h-full" ref="content">
                <Flow v-if="flowGround" :flowGround="flowGround" :methods="methods"/>
            </div>

            <div class="flex flex-col absolute top-0 right-0 bottom-0 left-0 pointer-events-none">
                <div ref="flowGround" class="flex-1 pointer-events-none"></div>
                <div class="flex p-3 md:p-8 md:pt-0 w-full pointer-events-none">
                    <div class="pointer-events-auto w-full rounded-l-md md:rounded-md shadow-sm md:focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-primary-200 focus-within:ring-offset-2 transition-all">
                        <textarea ref="input" @input="onInput()" class="rounded-l-md md:rounded-md h-[12rem] md:h-[16rem] flex-1 p-4 block w-full resize-none z-10 bg-primary-50 text-primary-800 text-sm border-0 border-r border-primary-200 md:border-none md:border-transparent outline-none focus:ring-0 focus:border-primary-300" autofocus placeholder="Input"></textarea>
                    </div>
                    <div class="flex-0 self-center gap-2 m-2 hidden md:flex flex-col">
                        <div class="hs-tooltip inline-block pointer-events-auto">
                            <button @click="swap()" class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                                <Icon name="lucide:arrow-down-up" class="rotate-90" size="1.5rem"/>
                                <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                              Swap
                            </span>
                            </button>
                        </div>
                    </div>
                    <div class="pointer-events-auto w-full rounded-l-md md:rounded-md shadow-sm md:focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-primary-200 focus-within:ring-offset-2 transition-all">
                        <textarea ref="output" class="rounded-r-md md:rounded-md h-[12rem] md:h-[16rem] flex-1 p-4 block w-full resize-none z-10 bg-primary-50 text-primary-800 text-sm border-none outline-none focus:ring-0 focus:border-primary-300" readonly placeholder="Output"></textarea>
                    </div>
                </div>
            </div>
        </main>
        <footer class="flex justify-center md:hidden gap-8 p-3 shadow-sm z-10 bg-primary-50">
            <div class="hs-tooltip inline-block [--placement:top]">
                <button disabled class="disabled:bg-primary-200 disabled:text-primary-400 hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                    <Icon name="lucide:copy" size="1.5rem"/>
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                      Duplicate
                    </span>
                </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
                <button @click="remove($event.currentTarget)" disabled class="disabled:bg-primary-200 disabled:text-primary-400 hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                    <Icon name="lucide:trash-2" size="1.5rem"/>
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                      Delete
                    </span>
                </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
                <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                    <Icon name="lucide:plus" size="1.5rem"/>
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                      Add
                    </span>
                </button>
            </div>
        </footer>

        <SettingsModal />
        <ContextMenu v-if="content" :content="content" @optionSelected="optionSelected" />
        <Toasts :toasts="toasts"/>
    </div>
</template>

<style scoped>

</style>
