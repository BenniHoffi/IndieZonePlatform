<template>
    <div class="flex h-full w-full justify-center gap-10 text-primary">
        <div class="flex h-full w-full flex-col items-center gap-8">
            <div class="w-full py-12 text-display-medium">Nachrichten</div>
            <div class="flex w-full justify-center bg-surface-bright py-24">
                <div class="flex w-72 flex-col items-center gap-4 rounded-xl bg-[#464A4D] p-6 text-surface-bright">
                    <p class="text-headline-small">Tritt mit Läden in Kontakt</p>
                    <p class="text-body-medium">
                        Du hast noch keine Chat ausgewählt. Wähle rechts einen Chat aus, oder kontaktiere einen Laden über seine
                        Seite.
                    </p>
                </div>
            </div>
            <div class="flex w-full gap-4 rounded-xl bg-user-surface-container p-4">
                <div class="relative w-full">
                    <Textarea
                        id="nachricht"
                        rows="3"
                        autoResize
                        class="w-full rounded-lg pr-10"
                        placeholder="Deine Nachricht..." />
                    <!--

                        <Button text class="absolute right-0 top-0" size="small">
                            <template #icon>
                                <Icon name="material-symbols:attach-file" />
                            </template>
                        </Button>
                    -->

                    <Button text class="absolute right-0 top-0 rounded text-on-surface-variant" size="small">
                        <template #icon>
                            <Icon name="material-symbols:add-reaction" />
                        </template>
                    </Button>
                </div>
                <div>
                    <Button class="text-user-surface-bright gap-2 bg-primary text-label-large" label="Senden" size="small">
                        <template #icon>
                            <Icon name="material-symbols:send" size="20px" />
                        </template>
                    </Button>
                </div>
            </div>
        </div>
        <div class="hidden h-full w-[700px] flex-col rounded-l-xl bg-surface-bright p-4 lg:flex">
            <div class="flex items-end gap-4 py-4">
                <div class="flex w-3/5 flex-col items-center gap-2">
                    <img class="w-full rounded-lg" src="~/assets/dummyImages/shoppy.png" />
                    <p class="text-label-medium font-extrabold text-primary">Bücherwurm</p>
                </div>
                <div class="flex w-2/5 flex-col items-end gap-2">
                    <Button class="text-user-surface-bright bg-primary" size="small">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:arrow-outward" />
                            <p class="text-label-small">Zum Laden</p>
                        </div>
                    </Button>
                    <Button class="bg-user-surface-container text-primary" size="small">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:priority-high" />
                            <p class="text-label-small">Melden</p>
                        </div>
                    </Button>
                </div>
            </div>
            <TabView>
                <TabPanel header="Alle">
                    <div class="h-[650px] w-full overflow-auto rounded-xl bg-user-surface-container p-2">
                        <div
                            v-for="chat in chats"
                            class="flex w-full items-center justify-start gap-4 rounded-xl p-2 hover:bg-user-surface-dim">
                            <img class="h-autyo w-14 max-w-none" src="~/assets/dummyImages/UserIcon.png" />
                            <div class="flex w-full flex-col gap-1 text-primary">
                                <div class="text-label-medium font-bold">{{ chat.chatWith }}</div>
                                <div class="w-full max-w-md truncate text-body-small">
                                    {{ chat.messages.at(chat.messages.length - 1)?.message }}
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Ungelesen">
                    <div class="overflow-auto rounded-xl bg-user-surface-container p-2">
                        <div v-for="chat in chats">
                            <div v-for="message in chat.messages">
                                <div
                                    v-if="!message.read"
                                    class="flex items-center justify-start gap-4 rounded-xl p-2 hover:bg-user-surface-dim">
                                    <img class="h-auto max-w-xs" src="~/assets/dummyImages/UserIcon.png" />
                                    <div class="flex flex-col gap-1 text-primary">
                                        <p class="text-label-medium font-bold">{{ chat.chatWith }}</p>
                                        <p class="truncate text-body-small">
                                            {{ chat.messages.at(chat.messages.length - 1)?.message }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Markiert"> </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import useMessages from "./composables/useMessages"

    definePageMeta({
        title: "User Messages",
        layout: "user",
    })
    const { chats } = await useMessages("12345")
</script>
