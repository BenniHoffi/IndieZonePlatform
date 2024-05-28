<template>
    <nav>
        <div class="relative z-50">
            <div
                v-if="open"
                :class="minimized ? 'w-[80px] px-3' : 'w-72 px-5'"
                class="fixed left-0 top-0 flex h-screen flex-col justify-around overflow-hidden whitespace-nowrap rounded-r-2xl bg-user-surface-container py-10 text-primary transition-all">
                <div class="absolute right-4 top-4 cursor-pointer lg:hidden" @click="open = false">
                    <Icon name="material-symbols:close" />
                </div>
                <div>
                    <div class="flex w-full flex-col gap-3">
                        <div
                            :class="minimized ? 'justify-center' : ''"
                            class="flex h-9 w-full select-none items-center gap-3 rounded-lg px-3 py-1 text-3xl">
                            <Icon name="material-symbols:home" />
                            <div v-if="!minimized">Deine Zone</div>
                        </div>
                        <NuxtLink
                            to="/"
                            :class="minimized ? 'justify-center' : ''"
                            class="text-md flex w-full items-center gap-3 rounded-lg px-3 py-1 hover:bg-user-surface-dim">
                            <Icon name="material-symbols:arrow-back" />
                            <div v-if="!minimized">Zurück zur IndieZone</div>
                        </NuxtLink>
                    </div>
                    <div class="mx-3 my-3 h-[1px] w-auto bg-outline-variant" />
                    <div class="flex flex-col gap-3">
                        <NuxtLink
                            to="/user/favorites"
                            :class="minimized ? 'justify-center' : ''"
                            active-class="bg-primary text-user-surface-container hover:bg-primary"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Favoriten' : ''">
                            <Icon name="material-symbols:interests" />
                            <div v-if="!minimized">Favoriten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/calendar"
                            :class="minimized ? 'justify-center' : ''"
                            active-class="bg-primary text-user-surface-container hover:bg-primary"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Kalender' : ''">
                            <Icon name="material-symbols:calendar-today-rounded" />
                            <div v-if="!minimized">Kalender</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/messages"
                            :class="minimized ? 'justify-center' : ''"
                            active-class="bg-primary text-user-surface-container hover:bg-primary"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Nachrichten' : ''">
                            <Icon name="material-symbols:chat-bubble" />
                            <div v-if="!minimized">Nachrichten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/feedback"
                            :class="minimized ? 'justify-center' : ''"
                            active-class="bg-primary text-user-surface-container hover:bg-primary"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Bewerten' : ''">
                            <Icon name="material-symbols:storefront" />
                            <div v-if="!minimized">Bewerten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/score"
                            :class="minimized ? 'justify-center' : ''"
                            active-class="bg-primary text-user-surface-container hover:bg-primary"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Punkteübersicht' : ''">
                            <Icon name="material-symbols:circles" />
                            <div v-if="!minimized">Punkteübersicht</div>
                        </NuxtLink>
                    </div>
                </div>
                <div :class="minimized ? '' : 'w-full'" class="flex flex-col gap-3">
                    <NuxtLink
                        to="/myshop/account"
                        :class="minimized ? 'justify-center' : ''"
                        active-class="bg-primary text-user-surface-container hover:bg-primary"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                        v-tooltip="minimized ? 'Mein Account' : ''">
                        <Icon name="material-symbols:account-circle" />
                        <div v-if="!minimized">Mein Account</div>
                    </NuxtLink>
                    <NuxtLink
                        to="/myshop/settings"
                        :class="minimized ? 'justify-center' : ''"
                        active-class="bg-primary text-user-surface-container hover:bg-primary"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                        v-tooltip="minimized ? 'Einstellungen' : ''">
                        <Icon name="material-symbols:settings" />
                        <div v-if="!minimized">Einstellungen</div>
                    </NuxtLink>
                    <div
                        class="hidden w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim lg:flex"
                        @click="minimized = !minimized">
                        <Icon :class="minimized ? '' : 'rotate-180'" name="material-symbols:double-arrow" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    const open = defineModel()
    const minimized = defineModel("minimized", { type: Boolean, default: false })
</script>
