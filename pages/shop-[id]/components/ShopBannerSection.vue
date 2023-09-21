<template>
    <section class="flex flex-col w-full max-w-6xl lg:flex-row lg:items-end">
        <div class="flex lg:w-2/3">
            <div class="hidden w-1/5 items-start lg:flex">
                <button class="hidden lg:block" @click="router.back()">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="px-4 space-y-2">
                    <img class="w-full h-auto" src="~/assets/dummyImages/shoppy.png" />
                    <img class="w-full h-auto" src="~/assets/dummyImages/shoppy.png" />
                    <img class="w-full h-auto" src="~/assets/dummyImages/shoppy.png" />
                    <img class="w-full h-auto" src="~/assets/dummyImages/shoppy.png" />
                </div>
            </div>
            <div class="relative text-white lg:w-4/5">
                <!-- TODO: URL richtig machen -->
                <img class="w-full" src="~/assets/dummyImages/shoppy.png" />
                <button class="absolute left-3 top-3 lg:hidden" @click="router.back()">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <button class="absolute right-3 top-3 lg:hidden" @click="">
                    <span class="material-symbols-outlined">favorite</span>
                </button>
            </div>
        </div>
        <div class="px-4 py-4 space-y-4 lg:w-1/3 lg:py-0">
            <div class="space-y-1">
                <div class="flex justify-between">
                    <h1 class="title-large">{{ shop.name }}</h1>
                    <div class="text-secondary">
                        <span v-if="shop.rating > 0" class="material-symbols-outlined">star</span>
                        <span v-if="shop.rating > 1" class="material-symbols-outlined">star</span>
                        <span v-if="shop.rating > 2" class="material-symbols-outlined">star</span>
                        <span v-if="shop.rating > 3" class="material-symbols-outlined">star</span>
                        <span v-if="shop.rating > 4" class="material-symbols-outlined">star</span>
                    </div>
                </div>

                <div class="text-label-medium font-bold">
                    {{ shop.intro }}
                </div>
                <div class="flex text-label-small items-center gap-1">
                    <span class="material-symbols-outlined"> schedule </span>
                    Heute geöffnet bis 18:00 Uhr
                    <span
                        class="material-symbols-outlined cursor-pointer transition-transform"
                        :class="openingHoursOpen ? 'rotate-90' : ''"
                        @click="openingHoursOpen = !openingHoursOpen">
                        arrow_right
                    </span>
                </div>
            </div>
            <div>
                <div class="text-label-small">
                    {{ shop.streetAdress }}
                </div>
                <div class="text-label-small">{{ shop.zip }} {{ shop.city }} (--km)</div>
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-label-small">
                            {{ shop.phone }}
                        </div>
                        <div class="text-label-small">
                            {{ shop.email }}
                        </div>
                    </div>
                    <Button size="small" @click="">
                        <template #icon>
                            <span class="material-symbols-outlined">chat_bubble</span>
                        </template>
                    </Button>
                </div>
            </div>
            <div>
                <div class="flex justify-between gap-2">
                    <Button label="Auf meine Route" size="small" />
                    <Button label="Auf Karte anzeigen" size="small" outlined />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        shop: any
    }>()

    const router = useRouter()

    const openingHoursOpen = ref(false)
</script>
