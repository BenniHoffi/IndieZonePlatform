<template>
    <div v-for="index in 5">
        <Icon v-if="rating >= index" name="material-symbols:star" />
        <Icon v-else-if="rating == index - 0.5" name="material-symbols:star-half" />
        <Icon v-else name="material-symbols:star-outline" />
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        rating: number
    }>()
</script>
