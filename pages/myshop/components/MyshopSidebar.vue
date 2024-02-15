<template>
    <div>
        <Transition>
            <div
                v-if="open"
                :class="minimized ? 'w-[80px] px-3' : 'w-72 px-5'"
                class="fixed left-0 top-0 flex h-screen cursor-pointer flex-col justify-around overflow-hidden whitespace-nowrap rounded-r-2xl bg-primary py-10 text-white transition-all">
                <div class="absolute right-4 top-4 lg:hidden" @click="open = false">
                    <Icon name="material-symbols:close" />
                </div>
                <div>
                    <div class="flex w-full flex-col gap-3">
                        <NuxtLink
                            to="/myshop"
                            :class="minimized ? 'justify-center' : ''"
                            activeClass="bg-secondary text-black hover:bg-secondary"
                            class="flex h-9 w-full items-center gap-3 rounded-lg px-3 py-1 text-3xl hover:bg-primary-hover">
                            <Icon name="material-symbols:home" />
                            <div v-if="!minimized">Dein Shop</div>
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
                        <MyshopSidebarLink
                            v-for="link in sidebarLinks"
                            :key="link.to"
                            :to="link.to"
                            :label="link.label"
                            :icon="link.icon"
                            :minimized="minimized" />
                    </div>
                </div>
                <div :class="minimized ? '' : 'w-full'" class="flex flex-col gap-3">
                    <MyshopSidebarLink
                        to="/myshop/account"
                        label="Mein Account"
                        icon="material-symbols:account-circle"
                        :minimized="minimized" />
                    <MyshopSidebarLink
                        to="/myshop/settings"
                        label="Einstellungen"
                        icon="material-symbols:settings"
                        :minimized="minimized" />

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
    import { breakpointsTailwind } from "@vueuse/core"
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")
    const open = defineModel("open", { type: Boolean, default: true })
    const minimized = defineModel("minimized", { type: Boolean, default: false })

    const sidebarLinks = [
        { to: "/myshop/products", label: "Artikelübersicht", icon: "material-symbols:interests" },
        { to: "/myshop/stats", label: "Statistik", icon: "material-symbols:leaderboard" },
        { to: "/myshop/notifications", label: "Mitteilungen", icon: "material-symbols:mail" },
        { to: "/myshop/messages", label: "Kundenchats", icon: "material-symbols:chat-bubble" },
        { to: "/myshop/shopview", label: "Shopansicht", icon: "material-symbols:storefront-outline" },
        { to: "/myshop/help", label: "Hilfe & Community", icon: "material-symbols:diversity-3" },
    ]
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
