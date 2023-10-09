<template>
    <NuxtLink :to="card.price ? 'product-' + card.id : 'shop-' + card.id">
        <div class="h-44 snap-start overflow-y-clip rounded-lg bg-user-surface-container-low">
            <img class="h-4/5 max-w-none" :src="card.imageUrl" />
            <div class="flex h-1/5 items-center justify-between rounded-b-lg px-4 text-primary">
                <div>{{ card.name }}</div>
                <div v-if="card.price">{{ card.price }} €</div>
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
    const props = defineProps<{ card: Card }>()
</script>
