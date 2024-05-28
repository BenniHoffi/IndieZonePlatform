<template>
    <div class="mt-20 md:mt-4">
        <div class="fixed left-0 top-0 flex h-16 w-full justify-between bg-primary text-white md:hidden">
            <button class="aspect-square h-full" @click="$router.back()">
                <Icon name="material-symbols:arrow-back" />
            </button>
            <button class="aspect-square h-full" @click="sidebarOpen = !sidebarOpen">
                <Icon name="material-symbols:menu" />
            </button>
        </div>
        <Message
            v-if="!shop?.verified"
            class="transition-[padding] md:mt-4"
            :class="lgAndSmaller ? 'md:ml-[84px]' : 'md:ml-[18.5rem]'">
            Ihr Laden ist noch nicht verifiziert. Sie können in der Zwischenzeit schon bis zu 50 Produkte einstellen.
        </Message>
        <MyshopSidebar v-model:open="sidebarOpen" v-model:minimized="lgAndSmaller" />
        <div class="grow transition-[padding]" :class="lgAndSmaller ? 'md:pl-[84px]' : 'md:pl-72'">
            <main class="p-4 pb-10 lg:pb-4">
                <slot />
            </main>
        </div>
        <div
            class="fixed bottom-0 left-0 z-[999] flex h-16 w-full justify-evenly divide-x divide-primary-100 bg-primary text-white md:hidden">
            <NuxtLink
                v-for="link in mobileBottomNavigationLinks"
                :key="link.to"
                :to="link.to"
                class="flex h-full w-full items-center justify-center"
                :class="route.path === link.to ? 'bg-primary-300' : ''">
                <Icon :name="route.path === link.to ? link.icon : link.icon + '-outline'" />
            </NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { breakpointsTailwind } from "@vueuse/core"
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")
    const lgAndSmaller = breakpoints.smallerOrEqual("lg")
    const sidebarOpen = ref(mdAndLarger)
    const route = useRoute()

    const shopId = useShopId()

    const { shop } = await useShopData(shopId.value)

    const mobileBottomNavigationLinks = [
        {
            to: "/myshop",
            icon: "material-symbols:storefront",
        },
        {
            to: "/myshop/stats",
            icon: "material-symbols:leaderboard",
        },
        {
            to: "/myshop/products",
            icon: "material-symbols:interests",
        },
        {
            to: "/myshop/settings",
            icon: "material-symbols:settings",
        },
        {
            to: "/myshop/messages",
            icon: "material-symbols:chat-bubble",
        },
    ]
</script>
