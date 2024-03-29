<script setup lang="ts">
    import Case from 'case';
    import { onMounted } from 'vue'
    import Flow from "~/components/Flow.vue";

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

    const activeMethods = ref([]);
    const methodsEnum = {
        UPPER_CASE: "UPPER_CASE",
        LOWER_CASE: "LOWER_CASE",
        CAPITAL_CASE: "CAPITAL_CASE",
        SNAKE_CASE: "SNAKE_CASE",
        PASCAL_CASE: "PASCAL_CASE",
        CAMEL_CASE: "CAMEL_CASE",
        KEBAB_CASE: "KEBAB_CASE",
        HEADER_CASE: "HEADER_CASE",
        CONSTANT_CASE: "CONSTANT_CASE",
        TITLE_CASE: "TITLE_CASE",
    }
    const methods = ref([
        {
            name: 'UPPERCASE',
            enum: methodsEnum.UPPER_CASE,
            icon: 'mdi:format-letter-case-upper',
        },
        {
            name: 'lowercase',
            enum: methodsEnum.LOWER_CASE,
            icon: 'mdi:format-letter-case-lower',
        },
        {
            name: 'Capital case',
            enum: methodsEnum.CAPITAL_CASE,
            icon: 'mdi:format-letter-starts-with',
        },
        {
            name: 'snake_case',
            enum: methodsEnum.SNAKE_CASE,
            icon: 'mdi:snake',
        },
        {
            name: 'PascalCase',
            enum: methodsEnum.PASCAL_CASE,
            icon: 'mdi:format-letter-matches',
        },
        {
            name: 'camelCase',
            enum: methodsEnum.CAMEL_CASE,
            icon: 'game-icons:camel',
        },
        {
            name: 'kebab-case',
            enum: methodsEnum.KEBAB_CASE,
            icon: 'material-symbols:kebab-dining-outline',
        },
        {
            name: 'Header-Case',
            enum: methodsEnum.HEADER_CASE,
            icon: 'mdi:format-header-1',
        },
        {
            name: 'CONSTANT_CASE',
            enum: methodsEnum.CONSTANT_CASE,
            icon: 'material-symbols:code-rounded',
        },
        {
            name: 'Title Case',
            enum: methodsEnum.TITLE_CASE,
            icon: 'material-symbols:title',
        },
    ])

    const input = ref<HTMLTextAreaElement|undefined>();
    const output = ref<HTMLTextAreaElement|undefined>();
    const content = ref<HTMLDivElement|undefined>();
    const flowGround = ref<HTMLDivElement|undefined>();

    const flow = ref(Flow);
    const canDuplicate = ref(false);
    const canRemove = ref(false);

    const pastePermission = ref(null);
    const toasts = ref<{
        message: string,
        type: 'info'|'success'|'error'|'warning'|null,
        time: number,
    }[]>([]);

    function optionSelected(option: {
        action: string,
        data: any,
    }) {
        switch (option.action) {
            case 'remove':
                remove();
                break;
            case 'add':
                add(option.data.position);
                break;
        }
    }

    function anyNodeOrEdgeSelected(args) {
        canDuplicate.value = args.selected;
        canRemove.value = args.selected;
    }

    function methodsChanged(args) {
        activeMethods.value = args.methods;
        onInput();
    }

    function applyTransformation(inputValue: string) {
        activeMethods.value.forEach((activeMethod) => {
            switch (activeMethod.enum) {
                case methodsEnum.UPPER_CASE:
                    inputValue = inputValue.toUpperCase();
                    break;
                case methodsEnum.LOWER_CASE:
                    inputValue = inputValue.toLowerCase();
                    break;
                case methodsEnum.CAPITAL_CASE:
                    inputValue = Case.capital(inputValue);
                    break;
                case methodsEnum.SNAKE_CASE:
                    inputValue = Case.snake(inputValue);
                    break;
                case methodsEnum.PASCAL_CASE:
                    inputValue = Case.pascal(inputValue);
                    break;
                case methodsEnum.CAMEL_CASE:
                    inputValue = Case.camel(inputValue);
                    break;
                case methodsEnum.KEBAB_CASE:
                    inputValue = Case.kebab(inputValue);
                    break;
                case methodsEnum.HEADER_CASE:
                    inputValue = Case.header(inputValue);
                    break;
                case methodsEnum.CONSTANT_CASE:
                    inputValue = Case.constant(inputValue);
                    break;
                case methodsEnum.TITLE_CASE:
                    inputValue = Case.title(inputValue);
                    break;
            }
        })

        return inputValue;
    }

    function onInput() {
        output.value!.value = applyTransformation(input.value!.value);
    }

    function swap() {
        input.value!.value = output.value!.value;
        onInput();
    }

    function toast(message: string, type: 'info'|'success'|'error'|'warning'|null, time: number) {
        toasts.value.push({
            message: message,
            type: type,
            time: time,
        });
    }

    function add(position: null|{
        x: number,
        y: number,
    }) {
        flow.value.add(position);
    }

    function duplicate() {
        flow.value.duplicate();
    }

    function remove() {
        flow.value.remove();
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
                onInput();
            } catch (exception) {
                toast('Permission for clipboard is required !', 'error', 10000);
            }
        }
    }

    function bindCtrlKeyCombo(key: string, callback: {(): void}, preventDefault: boolean = true) {
        document.addEventListener("keydown", function(e) {
            if (e.key === key && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                if (preventDefault) {
                    e.preventDefault();
                }

                callback();
            }
        }, false);
    }

    function isInputOrOutputFocused() {
        return document.activeElement === input.value || document.activeElement === output.value;
    }

    onMounted(() => {
        bindCtrlKeyCombo('v', () => ! isInputOrOutputFocused() ? paste() : null, false);
        bindCtrlKeyCombo('c', () => ! isInputOrOutputFocused() ? copy() : null, false);
        bindCtrlKeyCombo('k', () => add(null));
        bindCtrlKeyCombo('d', () => duplicate());

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
                    <button @click="add(null)" class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                        <Icon name="lucide:plus" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Add
                        </span>
                    </button>
                </div>

                <div class="hidden md:inline-block hs-tooltip [--placement:bottom] mr-1">
                    <button @click="duplicate" :disabled="!canDuplicate" class="hs-tooltip-toggle p-2 disabled:bg-primary-200 disabled:text-primary-400 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:copy" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Duplicate
                        </span>
                    </button>
                </div>
                <div class="hidden md:inline-block hs-tooltip [--placement:bottom] mr-4">
                    <button @click="remove" :disabled="!canRemove" class="hs-tooltip-toggle p-2 disabled:bg-primary-200 disabled:text-primary-400 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:trash-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Delete
                        </span>
                    </button>
                </div>

                <!--
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
                -->
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
                <Flow ref="flow" v-if="flowGround" :flowGround="flowGround" :methods="methods" @anyNodeOrEdgeSelected="anyNodeOrEdgeSelected" @methodsChanged="methodsChanged"/>
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
                <button @click="duplicate" :disabled="!canDuplicate" class="disabled:bg-primary-200 disabled:text-primary-400 hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                    <Icon name="lucide:copy" size="1.5rem"/>
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                      Duplicate
                    </span>
                </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
                <button @click="remove" :disabled="!canRemove" class="disabled:bg-primary-200 disabled:text-primary-400 hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
                    <Icon name="lucide:trash-2" size="1.5rem"/>
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 top-0 left-0 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-primary-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                      Delete
                    </span>
                </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
                <button @click="add(null)" class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-primary-200 text-primary-800 align-middle hover:bg-primary-300 outline-none ring-0">
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
