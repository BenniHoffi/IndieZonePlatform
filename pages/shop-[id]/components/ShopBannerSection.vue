<template>
    <section class="flex w-full max-w-6xl flex-col md:flex-row md:items-end">
        <div class="flex md:w-2/3">
            <div class="hidden w-1/5 items-start md:flex">
                <button class="hidden md:block" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <div class="space-y-2 px-4">
                    <img class="h-auto w-full" src="~/assets/dummyImages/shoppy.png" />
                    <img class="h-auto w-full" src="~/assets/dummyImages/shoppy.png" />
                    <img class="h-auto w-full" src="~/assets/dummyImages/shoppy.png" />
                    <img class="h-auto w-full" src="~/assets/dummyImages/shoppy.png" />
                </div>
            </div>
            <div class="relative text-white md:w-4/5">
                <!-- TODO: URL richtig machen -->
                <img class="w-full" src="~/assets/dummyImages/shoppy.png" />
                <button class="absolute left-3 top-3 md:hidden" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <button class="absolute right-3 top-3 md:hidden" @click="">
                    <Icon name="material-symbols:favorite" />
                </button>
            </div>
        </div>
        <div class="space-y-4 px-4 py-4 md:w-1/3 md:py-0">
            <div class="space-y-1">
                <div class="flex justify-between">
                    <h1 class="title-large">{{ shop.name }}</h1>
                    <div class="flex text-secondary">
                        <div v-for="index in 5">
                            <Icon v-if="shop.rating >= index" name="material-symbols:star" />
                            <Icon v-else-if="shop.rating == index - 0.5" name="material-symbols:star-half" />
                            <Icon v-else name="material-symbols:star-outline" />
                        </div>
                    </div>
                </div>

                <div class="text-label-medium font-bold">
                    {{ shop.intro }}
                </div>
                <div class="flex items-center gap-1 text-label-small">
                    <Icon name="material-symbols:schedule-outline" />
                    Heute geöffnet bis 18:00 Uhr
                    <button
                        class="transition-transform"
                        :class="openingHoursOpen ? 'rotate-90' : ''"
                        @click="openingHoursOpen = !openingHoursOpen">
                        <Icon name="material-symbols:arrow-right" />
                    </button>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <div class="text-label-small">
                        {{ shop.streetAdress }}
                    </div>

                    <div class="text-label-small">{{ shop.zip }} {{ shop.city }} (--km)</div>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-label-small">
                            {{ shop.phone }}
                        </div>
                        <div class="text-label-small">
                            {{ shop.email }}
                        </div>
                    </div>
                    <Button class="md:hidden" size="small" @click="">
                        <template #icon>
                            <Icon name="material-symbols:chat-bubble-outline" />
                        </template>
                    </Button>
                </div>
                <Button label="Zum Chat" class="hidden md:block" size="small" outlined />
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
