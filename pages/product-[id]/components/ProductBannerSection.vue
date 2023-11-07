<template>
    <section class="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:gap-12 lg:py-16">
        <div class="flex lg:w-2/3">
            <div class="hidden w-1/5 items-start lg:flex">
                <button class="hidden lg:block" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <div class="space-y-2 px-4">
                    <NuxtImg class="h-auto w-full" src="~/assets/dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="~/assets/dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="~/assets/dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="~/assets/dummyImages/productty.png" />
                </div>
            </div>
            <div class="relative text-white lg:w-4/5">
                <!-- TODO: URL richtig machen -->
                <NuxtImg class="w-full" src="~/assets/dummyImages/productty.png" />
                <button class="absolute left-3 top-3 lg:hidden" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <button class="absolute right-3 top-3 lg:hidden" @click="isFavorite = !isFavorite">
                    <div v-if="isFavorite" class="text-secondary">
                        <Icon name="material-symbols:favorite" />
                    </div>
                    <Icon v-else name="material-symbols:favorite" />
                </button>
            </div>
        </div>
        <div class="lg:w-1/3">
            <div class="space-y-4 px-4 py-4 lg:rounded-xl lg:bg-user-surface-container-low">
                <div class="space-y-1">
                    <div class="flex justify-between">
                        <h1 class="title-large">{{ product.name }}</h1>
                        <div class="flex text-secondary">
                            <RatingDisplay :rating="product.rating" />
                        </div>
                    </div>
                    <div class="hidden text-headline-medium lg:block">15,49€</div>
                    <div class="hidden text-body-medium lg:block">Lokal produziert</div>
                    <div class="hidden text-body-medium lg:block">Unikat</div>
                    <div class="hidden items-center gap-2 lg:flex lg:justify-end">
                        <Icon name="material-symbols:check-small" />
                        <p class="text-body-small">Auf Lager</p>
                        <div class="flex items-center">
                            <Icon name="material-symbols:location-on-outline" />
                            <p class="text-body-small">1,5km</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden gap-2 py-4 lg:flex lg:justify-around">
                <Button label="Auf meine Route" size="small" />
                <Button label="Auf Karte anzeigen" size="small" outlined />
                <Button class="aspect-square text-secondary" size="small" @click="isFavorite = !isFavorite">
                    <template #icon>
                        <Icon v-if="isFavorite" name="material-symbols:favorite" />
                        <Icon v-else name="material-symbols:favorite-outline" />
                    </template>
                </Button>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        product: any
    }>()

    const router = useRouter()

    const openingHoursOpen = ref(false)

    const isFavorite = ref(false)
</script>
