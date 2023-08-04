<script setup lang="ts">
    const { locale, locales } = useI18n();
    const switchLocalePath = useSwitchLocalePath();

    const resolveLocale = () => locales.value.find(l => l.code === locale.value);
    const resolvedLocale = ref(resolveLocale());
    watch(locale, () => {
        resolvedLocale.value = resolveLocale();
    });

    const select = async (code: string) => {
        navigateTo(switchLocalePath(code));
    };

    function flag(flag: string) {
        return 'flag:' + flag + '-4x3';
    }
</script>

<template>
    <div class="[--placement:bottom-left] hs-dropdown relative inline-flex">
        <button id="hs-language-switcher" type="button" class="hs-dropdown-toggle py-3 px-3 inline-flex justify-center items-center align-middle gap-2 rounded-md border border-primary-200 font-medium bg-white hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm">
            <span class="w-[20px] h-[20px] inline-flex justify-center items-center align-middle"><Icon :name="flag(resolvedLocale.flag)" size="20" /></span>
            <span class="hidden sm:inline-flex justify-center items-center align-middle">{{ resolvedLocale.name }}</span>
            <span class="hidden sm:inline-flex w-[20px] h-[20px] inline-flex justify-center items-center align-middle"><Icon class="hidden" name="material-symbols:keyboard-arrow-down" size="20"/></span>
        </button>

        <div class="hs-dropdown-menu border z-50 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-sm rounded-lg p-2 mt-2 divide-y divide-primary-200"
             aria-labelledby="hs-language-switcher">
            <div class="py-2 first:pt-0 last:pb-0">
                <a class="flex items-center gap-x-3 py-2.5 px-3 cursor-pointer rounded-md text-sm text-primary-700 hover:bg-primary-100"
                   v-for="locale in locales"
                   :key="locale.code"
                   :value="locale.code"
                   @click="select(locale.code)"
                >
                    <Icon :name="flag(locale.flag)" size="16"/>
                    {{ locale.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
