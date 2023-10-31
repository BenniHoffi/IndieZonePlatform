<template>
    <NuxtLink :to="price ? 'product-' + id : 'shop-' + id">
        <div class="relative h-44 snap-start overflow-y-clip rounded-lg bg-user-surface-container-low">
            <NuxtImg class="h-4/5 max-w-none" :src="imageUrl" />
            <div class="flex h-1/5 items-center justify-between rounded-b-lg px-4 text-primary">
                <div>{{ name }}</div>
                <div v-if="price">{{ price }} €</div>
            </div>
            <!--TODO: Problem: Button über Button, also Event Emitting ... -->
            <button class="absolute right-1 top-1" @click="">
                <div class="relative h-5 w-5">
                    <Icon
                        size="18px"
                        name="material-symbols:favorite"
                        class="absolute right-[1px] top-[1px] text-user-surface-container-low" />
                    <Icon size="20px" name="material-symbols:favorite-outline" class="absolute right-0 top-0" />
                </div>
            </button>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
    const props = defineProps<{ id: string; imageUrl: string; name: string; price?: number; isFavorite: boolean }>()
</script>
