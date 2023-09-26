<template>
    <section class="mx-auto w-full max-w-6xl px-4 py-16">
        <div class="text-title-large">Was Kunden über uns sagen</div>
        <div>
            <div class="flex items-center justify-between pt-2 text-secondary">
                <div class="flex items-center">
                    <div v-for="index in 5">
                        <Icon v-if="shop.rating >= index" name="material-symbols:star" />
                        <Icon v-else-if="shop.rating == index - 0.5" name="material-symbols:star-half" />
                        <Icon v-else name="material-symbols:star-outline" />
                    </div>
                    <!-- TODO: das shop.rating muss noch fett-gedruckt werden -->
                    <div class="pl-2 text-label-medium text-primary">{{ shop.rating }}</div>
                </div>
                <Button outlined @click="">
                    <template #icon>
                        <Icon name="material-symbols:tune" />
                    </template>
                </Button>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        shop: any
    }>()
</script>
