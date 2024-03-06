<template>
    <div>
        <div class="fixed left-0 top-0 flex h-16 w-full justify-between bg-primary text-white md:hidden">
            <button class="aspect-square h-full" @click="$router.back()">
                <Icon name="material-symbols:arrow-back" />
            </button>
            <button class="aspect-square h-full" @click="sidebarOpen = !sidebarOpen">
                <Icon name="material-symbols:menu" />
            </button>
        </div>
        <Message
            v-if="!shopData?.verified"
            class="mt-16 transition-[padding] md:mt-4"
            :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            Ihr Laden ist noch nicht verifiziert. Sie können in der Zwischenzeit schon bis zu 50 Produkte einstellen.
        </Message>
        <MyshopSidebar v-model:open="sidebarOpen" v-model:minimized="sidebarMinimized" />
        <div class="grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <main class="p-4 pt-12 lg:pt-4">
                <slot />
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { breakpointsTailwind } from "@vueuse/core"
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")
    const sidebarOpen = ref(mdAndLarger)

    const sidebarMinimized = ref(false)

    const shopData = await useShopData()
</script>
