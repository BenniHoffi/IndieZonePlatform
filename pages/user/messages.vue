<template>
    <div class="block h-full md:hidden">
        <ChatSelect v-if="!openChatId" :chats="chats!" @selectChat="selectChat" />
        <ChatView v-else :chatId="openChatId" />
    </div>
    <div class="hidden h-full gap-4 p-4 md:flex">
        <ChatView :chatId="openChatId" />
        <div class="flex flex-col">
            <div class="flex max-w-md items-end gap-4 py-4">
                <div class="flex w-3/5 flex-col items-center gap-2">
                    <NuxtImg class="w-full rounded-lg" src="/dummyImages/shoppy.png" />
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
            <ChatSelect :chats="chats!" @selectChat="selectChat" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { breakpointsTailwind } from "@vueuse/core"
    definePageMeta({
        title: "User Messages",
        layout: "user",
    })

    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")

    const { chats } = await useChats()
    const openChatId = ref<string | undefined>()
    function selectChat(chatId: string) {
        openChatId.value = chatId
    }
</script>
