<template>
    <div v-if="!location" class="mx-auto flex w-full flex-col items-center justify-center gap-10 p-4">
        <h1 class="text-display-medium font-bold">Online stöbern, lokal kaufen.</h1>
        <div class="relative flex w-full max-w-md items-center justify-center">
            <img class="w-full" src="/images/OutlineGermany.svg" />
            <Card class="top-1/5 absolute z-10 w-full max-w-md rounded-2xl bg-surface-container-high">
                <template #title>
                    <h3>Wo willst du stöbern?</h3>
                </template>
                <template #content>
                    <div class="flex flex-col items-center gap-4 text-on-surface-variant">
                        <div>
                            Um dir relevante Produkte anzeigen zu können, teile uns mit in welcher Umgebung du stöbern willst.
                        </div>
                        <AutoComplete
                            v-model="city"
                            placeholder="Stadt eingeben"
                            :suggestions="allowedCities"
                            dropdown
                            class="w-full"
                            :pt="{ input: 'bg-surface-dim border-0 w-full rounded-xl focus:ring-0' }"
                            @item-select="setLocation"
                            @complete="search" />
                        <div>oder</div>
                        <Button class="self-end" outlined>GPS nutzen</Button>
                    </div>
                </template>
                <template #footer>
                    <div class="flex w-full justify-around gap-4">
                        <Button label="Registrieren" outlined @click="navigateTo('/signup')"></Button>
                        <Button label="Einloggen" @click="navigateTo('/login')"></Button>
                    </div>
                </template>
            </Card>
        </div>
    </div>
    <div v-else>
        <h1 class="py-12 text-center text-display-medium font-bold">The sustainable heart of your city</h1>

        <div class="hidden justify-center pb-32 pt-16 lg:flex">
            <div class="flex w-full max-w-7xl flex-auto justify-evenly gap-4 px-4">
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ1.png" />
                        <p class="text-title-large">Einkaufen</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ2.png" />
                        <p class="text-ellipsis text-title-large">Veranstaltungen</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ3.png" />
                        <p class="text-title-large">Vereine</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ4.png" />
                        <p class="text-title-large">Deine Stadt</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { AutoCompleteItemSelectEvent, AutoCompleteCompleteEvent } from "primevue/autocomplete"
    const location = useLocationCookie()

    const city = ref("")

    const allowedCities = ref<string[]>()

    function search(event: AutoCompleteCompleteEvent) {
        allowedCities.value = ["Leipzig", "Thübingen", "Berlin"]
    }

    function setLocation(event: AutoCompleteItemSelectEvent) {
        console.log(event.value)
        // location.value = {
        //     place_name: event.query,
        //     center: [0, 0],
        //     bbox: [0, 0, 0, 0],
        // }
    }
</script>
