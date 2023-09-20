<script setup lang="ts">
    const open = ref(true)
    const minimized = useState<boolean>("shopsidebarMinimized", () => false)

    const route = useRoute()
</script>
<template>
    <div>
        <Transition>
            <div v-if="!open" class="absolute top-2 left-2 lg:hidden">
                <span class="material-symbols-outlined text-4xl" @click="open = true">menu</span>
            </div>
            <div
                v-else
                :class="minimized ? 'w-[84px]' : 'w-72'"
                class="fixed top-0 left-0 flex flex-col justify-around h-screen px-5 py-10 cursor-pointer text-white rounded-r-2xl bg-primary overflow-hidden whitespace-nowrap transition-all">
                <div class="absolute right-4 top-4 lg:hidden" @click="open = false">
                    <span class="material-symbols-outlined">close</span>
                </div>
                <div>
                    <div class="flex flex-col gap-3 w-full">
                        <NuxtLink
                            to="/shop"
                            :class="route.fullPath === '/shop' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 h-9 items-center px-3 py-1 rounded-lg w-full text-3xl hover:bg-primary-hover">
                            <span class="material-symbols-outlined">home</span>
                            <div v-if="!minimized">Deine Zone</div>
                        </NuxtLink>
                        <NuxtLink to="/" class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-md hover:bg-primary-hover">
                            <span class="material-symbols-outlined">arrow_back</span>
                            <div v-if="!minimized">Zurück zur IndieZone</div>
                        </NuxtLink>
                    </div>
                    <Divider />
                    <div class="flex flex-col gap-3">
                        <NuxtLink
                            to="/shop/products"
                            :class="route.fullPath === '/shop/products' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Artikelübersicht' : ''">
                            <span class="material-symbols-outlined">interests</span>
                            <div v-if="!minimized">Artikelübersicht</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/stats"
                            :class="route.fullPath === '/shop/stats' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Statistik' : ''">
                            <span class="material-symbols-outlined">leaderboard</span>
                            <div v-if="!minimized">Statistik</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/notifications"
                            :class="route.fullPath === '/shop/notifications' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Mitteilungen' : ''">
                            <span class="material-symbols-outlined">mail</span>

                            <div v-if="!minimized">Mitteilungen</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/messages"
                            :class="route.fullPath === '/shop/messages' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Kundenchats' : ''">
                            <span class="material-symbols-outlined">chat_bubble</span>

                            <div v-if="!minimized">Kundenchats</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/shopview"
                            :class="route.fullPath === '/shop/shopview' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Shopansicht' : ''">
                            <span class="material-symbols-outlined">storefront</span>

                            <div v-if="!minimized">Shopansicht</div>
                        </NuxtLink>
                        <NuxtLink
                            to="/shop/help"
                            :class="route.fullPath === '/shop/help' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                            class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                            v-tooltip="minimized ? 'Hilfe und Community' : ''">
                            <span class="material-symbols-outlined">diversity_3</span>

                            <div v-if="!minimized">Hilfe und Community</div>
                        </NuxtLink>
                    </div>
                </div>
                <div :class="minimized ? '' : 'w-full'" class="flex flex-col gap-3">
                    <NuxtLink
                        to="/shop/account"
                        :class="route.fullPath === '/shop/account' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                        class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                        v-tooltip="minimized ? 'Mein Account' : ''">
                        <span class="material-symbols-outlined">account_circle</span>

                        <div v-if="!minimized">Mein Account</div>
                    </NuxtLink>
                    <NuxtLink
                        to="/shop/settings"
                        :class="route.fullPath === '/shop/settings' ? 'bg-secondary hover:bg-secondary text-black' : ''"
                        class="flex gap-3 items-center px-3 py-1 rounded-lg w-full text-xl hover:bg-primary-hover"
                        v-tooltip="minimized ? 'Einstellungen' : ''">
                        <span class="material-symbols-outlined">settings</span>

                        <div v-if="!minimized">Einstellungen</div>
                    </NuxtLink>
                    <div
                        class="gap-3 items-center px-3 py-1 rounded-lg w-full text-xl cursor-pointer hidden lg:flex hover:bg-primary-hover"
                        @click="minimized = !minimized">
                        <span v-if="!minimized" class="material-symbols-outlined">keyboard_double_arrow_left</span>
                        <span v-else class="material-symbols-outlined">double_arrow</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .material-symbols-outlined {
        font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
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
