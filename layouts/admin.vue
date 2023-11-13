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
                    <DevOnly>
                        <pre>
                            {{ user?.app_metadata }}
                        </pre>
                    </DevOnly>
                    <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
                    <li><NuxtLink to="/admin/shopownerApplications">Shop Applications</NuxtLink></li>
                    <li><NuxtLink to="/admin/shops">Shop Management</NuxtLink></li>
                    <li><NuxtLink to="/admin/categoryEditor">Category Editor</NuxtLink></li>
                    <li><NuxtLink to="/admin/attributeEditor">Attribute Editor</NuxtLink></li>
                    <li><NuxtLink to="/admin/roleEditor">Role Editor</NuxtLink></li>
                    <li><NuxtLink to="/admin/cities">IndieZone Cities</NuxtLink></li>
                </ul>
            </template>
        </Sidebar>
        <div class="flex w-full justify-between lg:justify-end">
            <button class="m-4 aspect-square h-10 lg:hidden" @click="sidebarVisibility = true">
                <Icon name="material-symbols:menu" />
            </button>
            <div class="p-4 pr-6">
                <NuxtLink to="/" class="flex items-center gap-2 rounded-lg bg-user-surface-container-high p-2">
                    <Icon name="material-symbols:arrow-back" />
                    zurück zu IndieZone
                    <NuxtImg src="/images/indiezoneLogo.png" class="h-6" />
                </NuxtLink>
            </div>
        </div>
        <div class="flex w-full justify-center self-center p-4 lg:pl-[19rem]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { breakpointsTailwind } from "@vueuse/core"

    const user = useSupabaseUser()

    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndLarger = breakpoints.greaterOrEqual("lg")

    const sidebarVisibility = lgAndLarger ? ref(true) : ref(false)
</script>
