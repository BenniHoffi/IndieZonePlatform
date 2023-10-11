<template>
    <section class="w-full">
        <div class="mx-auto w-full max-w-7xl pb-2 pl-4 pt-4 text-title-large text-primary">{{ title }}</div>
        <div class="w-full" :class="bgColor">
            <div class="mx-auto max-w-7xl pl-4">
                <div class="flex snap-x snap-mandatory items-start gap-x-6 overflow-x-auto py-6 pr-6">
                    <PreviewCard
                        v-for="card in cards"
                        :key="card.id"
                        :id="card.id"
                        :imageUrl="card.imageUrl"
                        :name="card.name"
                        :price="card.price"
                        :isFavorite="card.isFavorite" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = withDefaults(
        defineProps<{
            title?: string
            cards: any[]
            bgColor?: string
        }>(),
        { title: "Schaufenster", bgColor: "bg-primary" }
    )
</script>
