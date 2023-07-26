<script setup>
    const head = useLocaleHead({
        addDirAttribute: true,
        identifierAttribute: 'id',
        addSeoAttributes: true,
    });

    const { finalizePendingLocaleChange } = useI18n();
    const transition = "opacity " + useRuntimeConfig().public.transitions.time + "ms";
    const onBeforeEnter = async () => {
        await finalizePendingLocaleChange();
    };
</script>

<template>
    <div class="h-full">
        <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
            <Head>
                <template v-for="link in head.link" :key="link.id">
                    <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
                </template>
                <template v-for="meta in head.meta" :key="meta.id">
                    <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
                </template>
            </Head>
            <Body>
                <NuxtLayout name="page">
                    <NuxtPage :transition="{
                        name: 'page',
                        mode: 'out-in',
                        onBeforeEnter,
                    }" />
                </NuxtLayout>
            </Body>
        </Html>
    </div>
</template>

<style>
    .page-enter-active,
    .page-enter-to,
    .page-leave-active {
        transition: v-bind('transition');
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
    }
</style>