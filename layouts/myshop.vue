<script setup lang="ts">
    const sidebarMinimized = useState("shopsidebarMinimized")

    const shopData = await useShopData()
</script>
<template>
    <div>
        <Toast />
        <ConfirmDialog />
        <Message v-if="!shopData?.verified" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            Ihr Laden ist noch nicht verifiziert. Sie können in der Zwischenzeit schon bis zu 50 Produkte einstellen.
        </Message>
        <MyshopSidebar />
        <div class="grow transition-[padding]" :class="sidebarMinimized ? 'lg:pl-[84px]' : 'lg:pl-72'">
            <div class="p-4 pt-12 lg:pt-4">
                <slot />
            </div>
        </div>
    </div>
</template>
