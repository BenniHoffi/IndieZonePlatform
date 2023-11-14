<template>
    <Dialog v-model:visible="visible" :modal="!confirm" :draggable="false" :position="'bottom'">
        <template #container="">
            <div v-if="!user" class="max-h-[264px] w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                <div>Logge dich ein oder erstelle einen Account um dir [Produkte/Läden/...] merken zu können</div>
                <div>
                    <Button
                        text
                        size="small"
                        class="text-label-medium font-bold text-user-surface-container"
                        @click="navigateTo('/login'), (visible = false)">
                        Einloggen oder Registrieren
                    </Button>
                </div>
            </div>
            <div v-else-if="listsPending">
                <ProgressSpinner />
            </div>
            <div v-else-if="!confirm" class="w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                <div class="relative flex justify-center pb-2 text-label-large font-bold">
                    Als Favorit merken

                    <button class="absolute right-0" @click="visible = false">
                        <Icon name="material-symbols:close" />
                    </button>
                </div>
                <div class="h-full max-h-[150px] w-full overflow-auto pb-4 lg:max-h-[300px]">
                    <div
                        v-for="(list, listname) in <Record<string, string[]>>faveLists"
                        :key="listname"
                        class="flex items-center justify-between">
                        <div class="text-body-small">{{ listname }}</div>
                        <Button
                            v-if="!list.includes(id)"
                            text
                            size="small"
                            class="text-label-medium font-bold text-user-surface-container"
                            @click="addToList(listname)">
                            Merken
                        </Button>
                        <Button
                            v-else
                            text
                            size="small"
                            class="text-label-medium font-bold text-user-surface-container"
                            @click="removeFromList(listname)">
                            Entfernen
                        </Button>
                    </div>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <InputText
                        v-model="newList"
                        class="w-full rounded-lg border-0 bg-gray-600 text-user-surface-container focus:ring-user-surface-container"
                        size="small"
                        placeholder="Neue Liste erstellen" />
                    <button class="px-6" @click="addList()">
                        <Icon name="material-symbols:add" />
                    </button>
                </div>
            </div>
            <div v-else class="max-h-[264px] w-[404px] rounded-xl bg-gray-600 p-4 text-user-surface-container shadow-md">
                <div class="flex items-center justify-between text-body-medium font-bold">Gemerkt auf: Meine Liste TODO!</div>
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
    const { id } = defineProps<{
        id: string
    }>()

    const user = useSupabaseUser()
    const { lists: faveLists, refreshLists, listsPending, saveLists } = await useFaveLists()
    const visible = defineModel<boolean>("visible")

    function addToList(listname: string) {
        if (!faveLists.value) return
        faveLists.value[listname].push(id)
        saveLists(faveLists.value)
        confirm.value = true
        useTimeoutFn(() => {
            visible.value = false
            useTimeoutFn(() => {
                confirm.value = false
            }, 300)
        }, 1250)
    }

    const confirm = ref(false)
    const newList = ref("")

    async function addList() {
        //TODO: Überprüfen, dass noch nicht eine Liste mit diesem Namen existiert
        if (newList.value) {
            faveLists.value![newList.value] = []
            newList.value = ""
        }
        saveLists(faveLists.value!)
    }

    function removeFromList(listname: string) {
        faveLists.value![listname].splice(faveLists.value![listname].indexOf(id), 1)
    }
</script>
