<template>
    <div>
        <Transition>
            <div v-if="!open" class="absolute rounded-br-xl bg-user-surface-container p-2 text-primary lg:hidden">
                <Icon name="material-symbols:menu" @click="open = true" />
            </div>
            <div
                v-else
                :class="minimized ? 'w-[80px] px-3' : 'w-72 px-5'"
                class="fixed left-0 top-0 flex h-screen cursor-pointer flex-col justify-around overflow-hidden whitespace-nowrap rounded-r-2xl bg-user-surface-container py-10 text-primary transition-all">
                <div class="absolute right-4 top-4 lg:hidden" @click="open = false">
                    <Icon name="material-symbols:close" />
                </div>
                <div>
                    <div class="flex w-full flex-col gap-3">
                        <NuxtLink
                            to="/homepageLoggedIn"
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary': route.fullPath === '/shop',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex h-9 w-full items-center gap-3 rounded-lg px-3 py-1 text-3xl hover:bg-user-surface-dim">
                            <Icon name="material-symbols:home" />
                            <div v-if="!minimized">Deine Zone</div>
                        </NuxtLink>
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
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary':
                                        route.fullPath === '/user/favorites',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Favoriten' : ''">
                            <Icon name="material-symbols:interests" />
                            <div v-if="!minimized">Favoriten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/calendar"
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary':
                                        route.fullPath === '/user/calendar',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Kalender' : ''">
                            <Icon name="material-symbols:calendar-today-rounded" />
                            <div v-if="!minimized">Kalender</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/messages"
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary':
                                        route.fullPath === '/user/messages',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Nachrichten' : ''">
                            <Icon name="material-symbols:chat-bubble" />
                            <div v-if="!minimized">Nachrichten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/feedback"
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary':
                                        route.fullPath === '/user/feedback',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Bewerten' : ''">
                            <Icon name="material-symbols:storefront" />
                            <div v-if="!minimized">Bewerten</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/user/score"
                            :class="[
                                {
                                    'bg-primary text-user-surface-container hover:text-primary': route.fullPath === '/user/score',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                            v-tooltip="minimized ? 'Punkteübersicht' : ''">
                            <Icon name="material-symbols:circles" />
                            <div v-if="!minimized">Punkteübersicht</div>
                        </NuxtLink>
                    </div>
                </div>
                <div :class="minimized ? '' : 'w-full'" class="flex flex-col gap-3">
                    <NuxtLink
                        to="/shop/account"
                        :class="[
                            {
                                'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/account',
                                'justify-center': minimized,
                            },
                        ]"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-user-surface-dim"
                        v-tooltip="minimized ? 'Mein Account' : ''">
                        <Icon name="material-symbols:account-circle" />
                        <div v-if="!minimized">Mein Account</div>
                    </NuxtLink>
                    <NuxtLink
                        to="/shop/settings"
                        :class="[
                            {
                                'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/settings',
                                'justify-center': minimized,
                            },
                        ]"
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
        </Transition>
    </div>
</template>

<script setup lang="ts">
    const open = ref(true)
    const minimized = useState<boolean>("usersidebarMinimized", () => false)

    const route = useRoute()
</script>
