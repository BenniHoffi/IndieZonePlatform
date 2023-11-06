<template>
    <div class="min-w-md flex h-full w-full justify-center text-primary xl:gap-4">
        <div class="flex h-full w-full flex-col items-center gap-4 p-4 lg:gap-8">
            <div class="hidden w-full py-12 text-display-medium md:block">Nachrichten</div>
            <div v-if="!chatId" class="flex h-full w-full items-center justify-center rounded-xl bg-surface-bright p-4">
                <div class="flex w-72 flex-col gap-4 rounded-xl bg-[#464A4D] p-6 text-surface-bright">
                    <p class="text-headline-small">Tritt mit Läden in Kontakt</p>
                    <p class="text-body-medium">
                        Du hast noch keine Chat ausgewählt. Wähle rechts einen Chat aus, oder kontaktiere einen Laden über seine
                        Seite.
                    </p>
                </div>
            </div>

            <div v-else class="flex h-full w-full flex-col-reverse overflow-auto rounded-xl bg-surface-bright p-4" ref="el">
                <div v-for="message in messages" class="py-4">
                    <div v-if="chatId === message.from" class="flex w-full justify-start text-primary">
                        <div class="flex flex-col items-start gap-1">
                            <div class="text-body-small text-neutral-70">{{ message.created_at.toLocaleTimeString("de") }}</div>
                            <div class="max-w-[512px] rounded-t-xl rounded-br-xl bg-primary-70 p-2 text-body-small">
                                {{ message.message }}
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex w-full justify-end text-primary">
                        <div class="flex flex-col items-end gap-1">
                            <div class="text-body-small text-neutral-70">{{ message.created_at.toLocaleTimeString("de") }}</div>
                            <div class="max-w-[512px] rounded-t-xl rounded-bl-xl bg-secondary p-2 text-body-small">
                                {{ message.message }}
                            </div>
                        </div>
                    </div>
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
                    <Button text class="absolute bottom-0 right-0 rounded" size="small">
                        <template #icon>
                            <Icon name="material-symbols:send" />
                        </template>
                    </Button>
                </div>
                <div class="hidden md:block">
                    <Button class="text-user-surface-bright gap-2 bg-primary text-label-large" label="Senden" size="small">
                        <template #icon>
                            <Icon name="material-symbols:send" size="20px" />
                        </template>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { chatId } = defineProps<{
        chatId: string | undefined
    }>()

    const { messages } = await useMessages(chatId)

    const el = ref<HTMLElement | null>(null)
    const { y } = useScroll(el)
    onMounted(() => (y.value = 0))
</script>
