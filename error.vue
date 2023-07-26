<script lang="ts" setup>
    const props = defineProps({
        error: Object
    })

    const back = () => clearError({ redirect: '/' })

    useHead({
        title: 'Error ' + props.error.statusCode,
        meta: [{
            name: 'description',
            content: 'Error'
        }],
    })
</script>

<template>
    <div>
        <main>
            {{ error.statusCode }}
            {{ error.message }}
            <button @click="back">
                Back
            </button>
        </main>
    </div>
</template>

<style scoped>

</style>
