<template>
    <div>
        <UserSidebar class="z-50" />
        <div class="z-0 grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <main class="p-4 pt-12 lg:pt-4">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const sidebarMinimized = useState("usersidebarMinimized")
</script>
