<template>
    <div class="h-screen">
        <header class="pb-16 md:hidden">
            <div class="fixed left-0 top-0 flex h-16 w-full justify-between bg-secondary">
                <button class="aspect-square h-full" @click="router.back()">
                    <Icon name="material-symbols:arrow-back" />
                </button>
                <button class="aspect-square h-full" @click="sidebarOpen = true">
                    <Icon name="material-symbols:menu" />
                </button>
            </div>
            <MobileNavbar />
        </header>
        <UserSidebar v-model="sidebarOpen" class="z-50" />
        <div class="z-0 h-full grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <main class="h-full">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { breakpointsTailwind } from "@vueuse/core"
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual("md")
    const sidebarOpen = ref(mdAndLarger)

    const sidebarMinimized = useState("usersidebarMinimized")

    const router = useRouter()
</script>
