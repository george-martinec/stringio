<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
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
</script>

<template>
    <div class="flex flex-col h-full">
        <header class="flex px-8 py-3 shadow-sm z-10 bg-slate-50">
            <div left class="flex flex-1">
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4 ">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0">
                        <Icon name="lucide:plus" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Add
                        </span>
                    </button>
                </div>

                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:copy" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Copy
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0 rounded-r-none rounded-l-none">
                        <Icon name="lucide:clipboard-paste" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Paste
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:trash-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Delete
                        </span>
                    </button>
                </div>

                <div class="hs-tooltip inline-block [--placement:bottom] mr-1">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0 rounded-r-none">
                        <Icon name="lucide:undo-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Undo
                        </span>
                    </button>
                </div>
                <div class="hs-tooltip inline-block [--placement:bottom] mr-4">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0 rounded-l-none">
                        <Icon name="lucide:redo-2" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Redo
                        </span>
                    </button>
                </div>
            </div>

            <div right class="flex">
                <div class="hs-tooltip inline-block [--placement:bottom]" data-hs-overlay="#hs-settings-modal">
                    <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0">
                        <Icon name="lucide:settings" size="1.5rem"/>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                          Settings
                        </span>
                    </button>
                </div>
            </div>
        </header>
        <main class="flex flex-1 bg-slate-200 relative">
            <div content class="flex flex-col relative w-full h-full">
                <div class="bg-slate-50 px-4 py-3 shadow-sm rounded-md absolute left-[45%] top-[35%] -translate-x-1/2 -translate-y-1/2">UpperCase</div>
                <div class="bg-slate-50 px-4 py-3 shadow-sm rounded-md absolute left-[55%] top-[35%] -translate-x-1/2 -translate-y-1/2">CamelCase</div>
            </div>
            <div right class="flex flex-row absolute bottom-0 p-8 w-full">
                <div class="w-full">
                    <textarea class="h-[16rem] flex-1 p-4 block w-full resize-none shadow-sm z-10 bg-slate-50 text-slate-800 rounded-md text-sm outline-none border-none border-transparent focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-all" autofocus placeholder="Input"></textarea>
                </div>
                <div class="flex-0 self-center m-2">
                    <div class="hs-tooltip inline-block">
                        <button class="hs-tooltip-toggle p-2 inline-flex rounded-md bg-slate-200 text-slate-800 align-middle hover:bg-slate-300 outline-none ring-0">
                            <Icon name="lucide:arrow-down-up" class="rotate-90" size="1.5rem"/>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-slate-600 text-xs font-medium text-white rounded-md shadow-sm" role="tooltip">
                              Swap
                            </span>
                        </button>
                    </div>
                </div>
                <div class="w-full">
                    <textarea class="h-[16rem] flex-1 p-4 block w-full resize-none shadow-sm z-10 bg-slate-50 text-slate-800 rounded-md text-sm outline-none border-none border-transparent focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-all" placeholder="Output"></textarea>
                </div>
            </div>
        </main>

        <SettingsModal />
    </div>
</template>

<style scoped>

</style>
