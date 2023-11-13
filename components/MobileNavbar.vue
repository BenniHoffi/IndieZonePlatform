<template>
    <div class="fixed bottom-0 left-0 z-[999] flex h-14 w-full items-center justify-around bg-secondary">
        <NuxtLink v-for="link in navigation" :key="link.to" :to="link.to" class="flex h-full w-full items-center justify-center">
            <Icon :name="route.path === link.to ? link.icon : link.icon + '-outline'" />
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute()
    const user = useSupabaseUser()
    const navigation = ref([
        {
            to: "/",
            icon: "material-symbols:home",
        },
        {
            to: "/user/favorites",
            icon: "material-symbols:favorite",
        },
        {
            to: "/location",
            icon: "material-symbols:location-on",
        },
        {
            to: "/user",
            icon: "material-symbols:person",
        },
    ])

    if (user.value?.app_metadata.shops) {
        navigation.value.push({
            to: "/myshop",
            icon: "material-symbols:storefront",
        })
    }
</script>
