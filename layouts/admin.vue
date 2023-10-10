<script setup lang="ts">
    import { breakpointsTailwind } from "@vueuse/core"

    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndLarger = breakpoints.greaterOrEqual("lg")

    const sidebarVisibility = lgAndLarger ? ref(true) : ref(false)
</script>
<template>
    <div class="flex h-screen w-full flex-col">
        <Sidebar
            v-model:visible="sidebarVisibility"
            :dismissable="lgAndLarger ? false : true"
            :show-close-icon="lgAndLarger ? false : true"
            :modal="lgAndLarger ? false : true"
            class="w-72">
            <template #header>
                <h2 class="p-4">Admin</h2>
            </template>
            <template #default>
                <ul class="ml-4 list-disc space-y-2">
                    <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
                    <li><NuxtLink to="/admin/shopownerApplications">Händleranfragen</NuxtLink></li>
                    <li><NuxtLink to="/admin/shops">Shopmanagement</NuxtLink></li>
                    <li><NuxtLink to="/admin/categoryEditor">Kategorieneditor</NuxtLink></li>
                    <li><NuxtLink to="/admin/attributeEditor">Attributeditor</NuxtLink></li>
                </ul>
            </template>
        </Sidebar>
        <div class="flex w-full justify-between lg:justify-end">
            <button v-show="!lgAndLarger" class="m-4 aspect-square h-10" @click="sidebarVisibility = true">
                <Icon name="material-symbols:menu" />
            </button>
            <div class="p-4 pr-6"><NuxtLink to="/">zurück zu IndieZone</NuxtLink></div>
        </div>
        <div class="flex w-full grow items-center justify-center self-center p-4 lg:pl-72">
            <slot />
        </div>
    </div>
</template>
