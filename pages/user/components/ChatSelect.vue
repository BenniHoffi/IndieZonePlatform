<template>
    <TabView class="flex h-96 grow flex-col" :pt="{ panelContainer: 'h-full overflow-auto' }">
        <TabPanel header="Alle" :pt="{ content: '' }">
            <div class="flex w-full flex-col rounded-xl bg-user-surface-container p-2">
                <div
                    v-for="chat in chats"
                    class="flex w-full cursor-pointer items-center justify-start gap-4 rounded-xl p-2 hover:bg-user-surface-dim"
                    @click="emit('selectChat', chat.id)">
                    <div>
                        <NuxtImg class="w-10 max-w-none" src="dummyImages/UserIcon.png" />
                    </div>
                    <div class="space-y-1 truncate text-primary">
                        <div class="text-label-medium font-bold">{{ chat.shopname }}</div>
                        <div class="truncate text-body-small">
                            {{ chat.last_message.message }}
                        </div>
                    </div>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Ungelesen">
            <div class="overflow-auto rounded-xl bg-user-surface-container p-2">
                <div v-for="chat in chats">
                    <div
                        v-if="!chat.last_message.read && chat.last_message.from !== user?.id"
                        class="flex items-center justify-start gap-4 rounded-xl p-2 hover:bg-user-surface-dim"
                        @click="emit('selectChat', chat.id)">
                        <NuxtImg class="h-10 max-w-none" src="/dummyImages/UserIcon.png" />
                        <div class="flex flex-col gap-1 text-primary">
                            <p class="text-label-medium font-bold">{{ chat.shopname }}</p>
                            <p class="truncate text-body-small">
                                {{ chat.last_message.message }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Markiert"></TabPanel>
    </TabView>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser()

    const props = defineProps<{
        chats: Chat[]
    }>()

    const emit = defineEmits<{
        (e: "selectChat", id: string): void
    }>()
</script>
