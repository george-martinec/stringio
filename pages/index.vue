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

    function applyTransformation(inputValue: string) {
        return inputValue.toUpperCase();
    }

    function onInput() {
        output.value!.value = applyTransformation(input.value!.value);
    }

    function swap() {
        input.value!.value = output.value!.value;
    }

    function copy() {
        const outputEl = output.value;
        if (outputEl !== undefined) {
            console.log(outputEl, outputEl.value);
            outputEl.select();
            outputEl.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
            window.isSecureContext
                ? window.navigator.clipboard.writeText(outputEl.value)
                : document.execCommand('copy');
        }
    }

    const methods = ref([
        {
            name: "UPPERCASE"
        },
        {
            name: "snake_case"
        },
        {
            name: "kebab-case"
        },
        {
            name: "lowercase"
        },
    ])

    onMounted(() => {
        // Tooltip fix
        [...document.body.getElementsByClassName('hs-tooltip')].forEach(
            (element) => element.addEventListener('mouseleave', () => {element.classList.remove('show')})
        );
    });
</script>

<template>
    <div class="flex flex-col h-full">
        <header class="flex px-2 md:px-8 py-2 md:py-3 shadow-sm z-10 bg-primary-50">
            <div left class="flex flex-1">
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                        <Icon name="lucide:plus" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Add
                        </span>
                    </button>
                </div>

                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:clipboard-copy" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Copy
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none rounded-l-none">
                        <Icon name="lucide:clipboard-paste" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Paste
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-l-none">
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
            <div content class="w-full h-full" ref="content">
                <Flow :methods="methods"/>
            </div>

            <div right class="flex flex-row absolute bottom-0 md:p-8 w-full">
                <div class="w-full md:rounded-md overflow-hidden md:focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 transition-all">
                    <textarea ref="input" @input="onInput()" class="h-[16rem] flex-1 p-4 block w-full resize-none shadow-sm z-10 bg-primary-50 text-primary-800 text-sm outline-none border-0 border-r border-primary-300 md:border-none md:border-transparent outline-none focus:ring-0 focus:border-primary-300" autofocus placeholder="Input"></textarea>
                </div>
                <div class="flex-0 self-center m-2 hidden md:flex">
                    <div class="hs-tooltip inline-block">
                        <button @click="swap()" class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                            <Icon name="lucide:arrow-down-up" class="rotate-90" size="1.5rem"/>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                              Swap
                            </span>
                        </button>
                    </div>
                </div>
                <div class="w-full md:rounded-md overflow-hidden md:focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 transition-all">
                    <textarea ref="output" @click="copy" class="h-[16rem] flex-1 p-4 block w-full resize-none shadow-sm z-10 bg-primary-50 text-primary-800 text-sm outline-none border-none border-transparent outline-none focus:ring-0" readonly placeholder="Output"></textarea>
                </div>
            </div>
        </main>

        <SettingsModal />
        <ContextMenu v-if="content" :content="content" @optionSelected="optionSelected" />
    </div>
</template>

<style scoped>

</style>
