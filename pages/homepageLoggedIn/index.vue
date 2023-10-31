<template>
    <div class="w-full">
        <div class="flex justify-center">
            <h1 class="py-12 text-headline-large font-bold">The sustainable heart of your city</h1>
        </div>

        <div class="flex hidden justify-center pb-32 pt-16 lg:flex">
            <div class="flex w-full max-w-7xl flex-auto justify-around gap-4 px-4">
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="~/assets/dummyImages/circ1.png" />
                        <p class="text-title-large">Einkaufen</p>
                    </div>
                </NuxtLink>
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="~/assets/dummyImages/circ2.png" />
                        <p class="text-ellipsis text-title-large">Veranstaltungen</p>
                    </div>
                </NuxtLink>
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="~/assets/dummyImages/circ3.png" />
                        <p class="text-title-large">Vereine</p>
                    </div>
                </NuxtLink>
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="~/assets/dummyImages/circ4.png" />
                        <p class="text-title-large">deine Stadt</p>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <ShowcaseSection title="Neu in deiner IndieZone" :cards="cards" bgColor="bg-secondary" />
        <!--TODO: mehr anzeigen button richtig positionieren-->
        <div class="flex max-w-7xl justify-end pb-16 pt-4">
            <button class="flex items-center" @click="">
                <div class="pr-1 text-body-small text-primary">mehr anzeigen</div>
                <div>
                    <Icon name="material-symbols:arrow-forward-ios-rounded" />
                </div>
            </button>
        </div>
        <ShowcaseSection title="Eure Lieblinge" :cards="cards" />
        <ShowcaseSection title="Wir empfehlen" :cards="cards" bgColor="bg-tertiary" />
    </div>
</template>
<script lang="ts" setup>
    definePageMeta({})

    const cards = useProducts()
</script>
