<template>
    <div class="flex h-screen w-full flex-col">
        <header class="h-16 md:hidden">
            <div class="fixed left-0 top-0 flex h-16 w-full justify-between bg-secondary">
                <button class="aspect-square h-full" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <button class="aspect-square h-full" @click="mdAndLarger = !mdAndLarger">
                    <Icon name="material-symbols:menu" />
                </button>
            </div>
            <MobileNavbar />
        </header>
        <UserSidebar v-model="mdAndLarger" v-model:minimized="sidebarMinimized" />
        <main class="z-0 w-full grow pb-16 transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
    import { breakpointsTailwind } from "@vueuse/core"
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")

    const sidebarMinimized = ref<boolean>(false)

    const router = useRouter()
</script>
