<template>
    <Card class="w-full max-w-lg" :pt="{ content: 'p-0' }">
        <template #header>
            <h3 class="px-4 pt-4 text-title-large font-bold">Öffnungszeiten:</h3>
        </template>
        <template #content>
            <div class="flex w-full gap-4">
                <div class="flex w-full flex-col gap-2">
                    <div v-for="(hours, day) in openingHours" class="w-full">
                        <div class="flex w-full flex-col gap-4 sm:flex-row">
                            <div class="flex items-center">
                                <h4 class="w-24">{{ days[day] }}:</h4>
                                <Button icon="pi pi-plus" rounded text @click="hours.push({ from: '', to: '' })">
                                    <template #icon>
                                        <Icon name="material-symbols:add" />
                                    </template>
                                </Button>
                            </div>
                            <div v-if="hours.length > 0" class="flex w-full flex-col">
                                <div
                                    v-for="(item, index) in hours"
                                    class="flex w-full items-center justify-center gap-2 sm:justify-between">
                                    <div class="flex items-center gap-3">
                                        <div>von:</div>
                                        <InputMask v-model="item.from" mask="99:99" class="w-16 px-2 py-1" />
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="ml-4">bis:</div>
                                        <InputMask v-model="item.to" mask="99:99" class="w-16 px-2 py-1" />
                                    </div>
                                    <Button rounded text severity="danger" @click="hours.splice(index, 1)">
                                        <template #icon>
                                            <Icon name="material-symbols:close-rounded" />
                                        </template>
                                    </Button>
                                </div>
                            </div>
                            <div v-else class="flex items-center gap-2">geschlossen</div>
                        </div>
                        <Divider v-if="day !== 6" class="my-2" />
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
    const openingHours = defineModel<OpeningHoursDay[][]>({ required: true })
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
</script>
