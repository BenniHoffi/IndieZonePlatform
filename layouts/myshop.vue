<script setup lang="ts">
    const sidebarMinimized = useState("shopsidebarMinimized")

    const shopData = await useShopData()
</script>
<template>
    <div>
        <Message v-if="!shopData?.verified" class="transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            Ihr Laden ist noch nicht verifiziert. Sie können in der Zwischenzeit schon bis zu 50 Produkte einstellen.
        </Message>
        <MyshopSidebar />
        <div class="grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <main class="p-4 pt-12 lg:pt-4">
                <slot />
            </main>
        </div>
    </div>
</template>
