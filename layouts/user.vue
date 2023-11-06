<template>
    <div class="h-screen">
        <ClientOnly>
            <UserSidebar class="z-50" />
        </ClientOnly>
        <div class="z-0 h-full grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <main class="h-full">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const sidebarMinimized = useState("usersidebarMinimized")
</script>
