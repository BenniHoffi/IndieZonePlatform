<template>
    <div>
        <Transition>
            <div v-if="!open" class="absolute left-2 top-2 lg:hidden">
                <Icon name="material-symbols:menu" @click="open = true" />
            </div>
            <div
                v-else
                :class="minimized ? 'w-[80px] px-3' : 'w-72 px-5'"
                class="fixed left-0 top-0 flex h-screen cursor-pointer flex-col justify-around overflow-hidden whitespace-nowrap rounded-r-2xl bg-primary py-10 text-white transition-all">
                <div class="absolute right-4 top-4 lg:hidden" @click="open = false">
                    <Icon name="material-symbols:close" />
                </div>
                <div>
                    <div class="flex w-full flex-col gap-3">
                        <NuxtLink
                            to="/shop"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex h-9 w-full items-center gap-3 rounded-lg px-3 py-1 text-3xl hover:bg-primary-hover">
                            <Icon name="material-symbols:home" />
                            <div v-if="!minimized">Deine Zone</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/"
                            :class="minimized ? 'justify-center' : ''"
                            class="text-md flex w-full items-center gap-3 rounded-lg px-3 py-1 hover:bg-primary-hover">
                            <Icon name="material-symbols:arrow-back" />
                            <div v-if="!minimized">Zurück zur IndieZone</div>
                        </NuxtLink>
                    </div>
                    <div class="mx-3 my-3 h-[1px] w-auto bg-outline-variant" />
                    <div class="flex flex-col gap-3">
                        <NuxtLink
                            to="/shop/products"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/products',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Artikelübersicht' : ''">
                            <Icon name="material-symbols:interests" />
                            <div v-if="!minimized">Artikelübersicht</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/stats"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/stats',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Statistik' : ''">
                            <Icon name="material-symbols:leaderboard" />
                            <div v-if="!minimized">Statistik</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/notifications"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/notifications',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Mitteilungen' : ''">
                            <Icon name="material-symbols:mail" />
                            <div v-if="!minimized">Mitteilungen</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/messages"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/messages',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Kundenchats' : ''">
                            <Icon name="material-symbols:chat-bubble" />
                            <div v-if="!minimized">Kundenchats</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/shopview"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/shopview',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Shopansicht' : ''">
                            <Icon name="material-symbols:storefront-outline" />
                            <div v-if="!minimized">Shopansicht</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/help"
                            :class="[
                                {
                                    'bg-secondary text-black hover:bg-secondary': route.fullPath === '/shop/help',
                                    'justify-center': minimized,
                                },
                            ]"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Hilfe und Community' : ''">
                            <Icon name="material-symbols:diversity-3" />
                            <div v-if="!minimized" class="whitespace-normal">Hilfe und Community</div>
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
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
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
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
                        v-tooltip="minimized ? 'Einstellungen' : ''">
                        <Icon name="material-symbols:settings" />
                        <div v-if="!minimized">Einstellungen</div>
                    </NuxtLink>
                    <div
                        class="hidden w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover lg:flex"
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
    const minimized = useState<boolean>("shopsidebarMinimized", () => false)

    const route = useRoute()
</script>

<style scoped>
    .v-enter-from {
        transform: translateX(-100%);
    }
    .v-enter-active {
        transition: transform 0.3s ease;
    }
    .v-leave-from {
        transform: translateX(0);
    }
    .v-leave-active {
        transition: transform 0.3s ease;
    }
    .v-leave-to {
        transform: translateX(-100%);
    }
</style>
