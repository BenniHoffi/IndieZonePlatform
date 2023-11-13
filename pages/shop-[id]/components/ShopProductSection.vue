<template>
    <section class="mx-auto w-full max-w-6xl px-4 py-12">
        <div class="pb-4 text-title-large text-primary">Unsere Produkte</div>
        <MainSearchbar />
        <div class="flex items-center justify-between py-2">
            <div
                class="flex h-full w-4/5 items-center justify-between rounded-md border-0 bg-container-dark px-1 py-1 ring-primary focus:ring-2">
                <div class="pl-2 text-label-small">Alle Kategorien</div>
                <button
                    class="transition-transform"
                    :class="categoryDropdownOpen ? 'rotate-90' : ''"
                    @click="categoryDropdownOpen = !categoryDropdownOpen">
                    <Icon name="material-symbols:arrow-right" />
                </button>
            </div>
            <Button text @click="">
                <template #icon>
                    <Icon name="material-symbols:tune" />
                </template>
            </Button>
        </div>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="product in productArray" class="relative h-full rounded-lg bg-user-surface-container-low shadow-lg">
                <NuxtImg class="w-full rounded-t-lg" src="dummyImages/mediaSmall.png" />
                <!-- TODO: favourite button sollte noch togglen (irgendwann) -->
                <button class="absolute right-0 top-0 p-2" @click="">
                    <Icon name="material-symbols:favorite-outline" />
                </button>
                <div class="rounded-b-lg py-2 pl-4 text-body-small text-primary">
                    <p class="truncate">{{ product.name }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const categoryDropdownOpen = ref(false)
    const productArray = [
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
            favorite: true,
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
        {
            imgsrc: "dummyImages/media.png",
            name: "Leggins extra lang",
        },
    ]
</script>
