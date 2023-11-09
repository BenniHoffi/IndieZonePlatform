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
                    <div class="text-on-surface-variant">
                        <div v-if="step === ''">
                            Um dir relevante Produkte anzeigen zu können, teile uns mit in welcher Umgebung du stöbern willst.
                        </div>
                        <div v-else-if="step === 'address'">
                            <div>Gib hier deine Adresse ein</div>
                            <br />
                            <!-- <AddressSearch @update="" /> -->
                        </div>
                    </div>
                </template>
                <template #footer>
                    <div v-if="step === ''" class="flex justify-evenly gap-4">
                        <button
                            class="rounded-[4px] px-3 py-[10px] text-label-large hover:bg-primary hover:bg-opacity-[8%]"
                            @click="step = 'address'">
                            Adresse eingeben
                        </button>
                        <button
                            class="rounded-[4px] px-3 py-[10px] text-label-large hover:bg-primary hover:bg-opacity-[8%]"
                            @click="step = 'gps'">
                            GPS verwenden
                        </button>
                    </div>
                    <div v-else-if="step !== 'radius'" class="flex justify-between gap-4">
                        <button
                            class="rounded-[4px] px-3 py-[10px] text-label-large hover:bg-primary hover:bg-opacity-[8%]"
                            @click="step = ''">
                            Zurück
                        </button>
                        <button
                            class="rounded-[4px] px-3 py-[10px] text-label-large hover:bg-primary hover:bg-opacity-[8%]"
                            @click="step = 'radius'">
                            Weiter
                        </button>
                    </div>
                    <div v-else></div>
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
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ2.png" />
                        <p class="text-ellipsis text-title-large">Veranstaltungen</p>
                    </div>
                </NuxtLink>
                <NuxtLink to=".">
                    <div class="flex flex-col items-center gap-4">
                        <NuxtImg class="max-h-44" src="/images/circ3.png" />
                        <p class="text-title-large">Vereine</p>
                    </div>
                </NuxtLink>
                <NuxtLink to=".">
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
    const location = useLocationCookie()
    const step = ref("")
</script>
