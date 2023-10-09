<template>
    <section class="w-full">
        <div class="mx-auto w-full max-w-7xl pb-2 pl-4 pt-4 text-title-large text-primary">{{ title }}</div>
        <div class="w-full bg-primary">
            <div class="mx-auto max-w-7xl pl-4">
                <div class="flex snap-x snap-mandatory items-start gap-x-6 overflow-x-auto py-6 pr-6">
                    <MainCard v-for="card in cards" :key="card.id" :card="card" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        title: string
        cards: Card[]
    }>()
</script>
