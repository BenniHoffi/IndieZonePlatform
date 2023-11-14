<template>
    <div class="flex flex-col justify-center p-4">
        <h1 class="text-headline-medium font-bold">FAVORITEN BABY</h1>
        <div>
            <div v-if="visibleList">
                <div class="flex flex-col gap-4 text-title-large font-bold">
                    <div v-for="item in lists![visibleList]" :key="item" class="p-2">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed right-0 top-0 h-full w-full max-w-md border-l border-primary p-4">
            <div class="flex flex-col gap-4 text-title-large font-bold">
                <div
                    v-for="(list, listname) in <Record<string, string[]>>lists"
                    :key="listname"
                    class="cursor-pointer p-2"
                    @click="openList(listname)">
                    {{ listname }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "User Favorites",
        layout: "user",
    })

    const visibleList = ref<string>()

    const { lists, refreshLists, listsPending } = await useFaveLists()

    function openList(listname: string) {
        visibleList.value = listname
    }
</script>
