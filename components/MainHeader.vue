<template>
    <header class="w-full">
        <div class="pb-44 lg:hidden">
            <Sidebar v-model:visible="sidebarVisibility" class="flex flex-col gap-4 p-4">
                <ul>
                    <li v-if="user?.app_metadata.claims_admin">
                        <NuxtLink to="/admin">Admin Dashboard</NuxtLink>
                    </li>
                    <li v-if="user?.app_metadata.shopowner">
                        <NuxtLink to="/shop">Mein Shop</NuxtLink>
                    </li>
                    <li v-else>
                        <NuxtLink to="/becomeShopowner">IndieZone Händler werden</NuxtLink>
                    </li>
                </ul>
            </Sidebar>
            <div class="fixed left-0 top-0 z-[999] w-full">
                <div class="flex w-full items-center justify-between bg-white p-4 px-6 pt-6">
                    <NuxtLink to="/" class="flex items-center gap-4">
                        <img src="/images/indiezoneLogo.png" alt="IndieZone Logo" class="h-14" />
                        <img src="/images/indiezoneBanner.png" alt="IndieZone Banner" class="h-5" />
                    </NuxtLink>
                    <div class="flex items-center gap-4">
                        <NuxtLink to="/location">
                            <Icon name="material-symbols:location-on-outline" />
                        </NuxtLink>
                        <NuxtLink :to="user ? '/user/favorites' : '/'">
                            <Icon name="material-symbols:favorite-outline" />
                        </NuxtLink>
                        <NuxtLink :to="user ? '/user' : '/login'">
                            <Icon name="material-symbols:person-outline" />
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex h-20 w-full items-center gap-4 bg-secondary p-4 lg:pr-8">
                    <button class="aspect-square h-10" @click="sidebarVisibility = true">
                        <Icon name="material-symbols:menu" />
                    </button>
                    <MainSearchbar />
                </div>
            </div>
        </div>
        <div class="relative hidden w-full flex-col items-center lg:flex">
            <div class="absolute top-40 z-10 flex h-[65px] w-full justify-between bg-secondary p-2 pl-80 pr-10">
                <div class="relative w-[45%]">
                    <button class="absolute right-0 aspect-square h-full" @click="console.log('Suche...')">
                        <Icon name="material-symbols:search" />
                    </button>
                    <MainSearchbar />
                </div>
                <div class="flex h-full items-center gap-10 xl:gap-16">
                    <NuxtLink to="/products">Produkte</NuxtLink>
                    <NuxtLink to="/shops">Läden</NuxtLink>
                    <NuxtLink to="/location">Meine Umgebung</NuxtLink>
                </div>
            </div>
            <div class="flex w-[90%] justify-between">
                <NuxtLink class="z-20" to="/">
                    <img src="/images/IndieZoneDesktopLogo.png" alt="IndieZoneLogo" class="h-56" />
                </NuxtLink>
                <div class="flex w-60 items-center justify-between gap-4 text-label-medium">
                    <NuxtLink to="/location">
                        <div class="flex flex-col items-center">
                            <Icon name="material-symbols:location-on-outline" />
                            Standort
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="user ? '/user/favorites' : '/'">
                        <div class="flex flex-col items-center">
                            <Icon name="material-symbols:favorite-outline" />
                            Favoriten
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="user ? '/user' : '/login'">
                        <div class="flex flex-col items-center">
                            <Icon name="material-symbols:person-outline" />
                            <div v-if="user">Profil</div>
                            <div v-else>Login</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser()

    const sidebarVisibility = ref(false)
</script>
