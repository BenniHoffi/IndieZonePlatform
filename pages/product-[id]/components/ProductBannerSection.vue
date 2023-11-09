<template>
    <section class="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:gap-12 lg:py-16">
        <div class="flex lg:w-2/3">
            <div class="hidden w-1/5 items-start lg:flex">
                <button class="hidden lg:block" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <div class="space-y-2 px-4">
                    <NuxtImg class="h-auto w-full" src="dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="dummyImages/productty.png" />
                    <NuxtImg class="h-auto w-full" src="dummyImages/productty.png" />
                </div>
            </div>
            <div class="relative text-white lg:w-4/5">
                <!-- TODO: URL richtig machen -->
                <NuxtImg class="w-full" src="dummyImages/productty.png" />
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
                <Button
                    class="aspect-square text-secondary"
                    size="small"
                    @click="(isFavorite = !isFavorite), (visibleFaves = true)">
                    <template #icon>
                        <Icon v-if="isFavorite" name="material-symbols:favorite" />
                        <Icon v-else name="material-symbols:favorite-outline" />
                    </template>
                </Button>
            </div>
        </div>

        <Dialog v-model:visible="visibleFaves" modal :draggable="false" :position="'bottom'">
            <template #container="">
                <div class="max-h-[264px] w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                    <div class="relative flex justify-center pb-2 text-label-large font-bold">
                        Als Favorit merken

                        <button class="absolute right-0" @click="visibleFaves = false">
                            <Icon name="material-symbols:close" />
                        </button>
                    </div>
                    <div class="h-[144px] w-full overflow-auto pb-4">
                        <div v-for="list in lists" class="flex items-center justify-between">
                            <div class="text-body-small">{{ list.name }}</div>
                            <Button
                                text
                                size="small"
                                class="text-label-medium font-bold text-user-surface-container"
                                @click="openDialog(2)"
                                >Merken</Button
                            >
                        </div>
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <p class="text-body-medium">Neue Liste erstellen</p>
                        <button class="px-6" @click="openDialog(1)">
                            <Icon name="material-symbols:add" />
                        </button>
                    </div>
                </div>
            </template>
        </Dialog>

        <Dialog v-model:visible="visibleNewList" modal :draggable="false" :position="'bottom'">
            <template #container="">
                <div class="max-h-[264px] w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                    <div class="relative flex justify-center text-label-large font-bold">
                        Neue Liste erstellen
                        <button class="absolute right-0" @click="visibleNewList = false">
                            <Icon name="material-symbols:close" />
                        </button>
                    </div>
                </div>
            </template>
        </Dialog>
        <Dialog v-model:visible="visibleConfirmFave" modal :draggable="false" :position="'bottom'">
            <template #container="">
                <div class="max-h-[264px] w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                    <div class="flex items-center justify-between text-body-medium font-bold">
                        Gemerkt auf: Meine Liste TODO!
                        <button class="text-label-medium" @click="openDialog(0)">Ändern</button>
                    </div>
                </div>
            </template>
        </Dialog>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        product: any
    }>()

    const router = useRouter()

    const openingHoursOpen = ref(false)

    const isFavorite = ref(false)

    //TODO: automatishes schließen des Confirm-Dialoges benötigt!
    function closeConfirm() {
        visibleConfirmFave.value = false
    }

    function openDialog(index: number) {
        visibleFaves.value = false
        visibleNewList.value = false
        visibleConfirmFave.value = false
        dialoges.at(index)!.value = true
    }

    const visibleFaves = ref(false)
    const visibleNewList = ref(false)
    const visibleConfirmFave = ref(false)
    const dialoges = [visibleFaves, visibleNewList, visibleConfirmFave]

    const lists = [
        { name: "Meine Liste", faves: ["123", "124", "125"] },
        { name: "irgendwelcher Quatsch", faves: [] },
        { name: "Lieblingsläden" },
        { name: "Inspirationen" },
        { name: "Lieblingsläden" },
        { name: "Lieblingsläden" },
        { name: "Lieblingsläden" },
        { name: "Lieblingsläden" },
    ]
</script>
