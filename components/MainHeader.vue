<template>
    <header class="w-full">
        <div class="pb-16 md:hidden">
            <Sidebar v-model:visible="sidebarVisibility" class="flex flex-col gap-4 p-4" position="right">
                <ul>
                    <li v-if="user?.app_metadata.shops">
                        <NuxtLink to="/myshop">Mein Shop</NuxtLink>
                    </li>
                    <li v-else>
                        <NuxtLink to="/shopownerRegistration">IndieZone Händler werden</NuxtLink>
                    </li>
                </ul>
            </Sidebar>
            <div class="fixed left-0 top-0 z-[999] w-full">
                <div class="flex h-16 w-full items-center gap-1 bg-secondary p-2 lg:pr-8">
                    <button class="aspect-square h-10" @click="router.back()">
                        <Icon name="material-symbols:arrow-back" />
                    </button>
                    <MainSearchbar />
                    <button class="aspect-square h-10" @click="sidebarVisibility = true">
                        <Icon name="material-symbols:menu" />
                    </button>
                </div>
            </div>
            <MobileNavbar />
        </div>
        <div class="relative hidden w-full flex-col items-center md:flex">
            <div
                class="absolute top-40 z-10 flex h-[65px] w-full justify-between gap-4 bg-secondary p-2 pl-64 pr-10 lg:pl-72 xl:pl-80">
                <div class="relative w-[45%]">
                    <button class="absolute right-0 aspect-square h-full" @click="console.log('Suche...')">
                        <Icon name="material-symbols:search" />
                    </button>
                    <MainSearchbar />
                </div>
                <div class="flex h-full items-center gap-4 whitespace-nowrap lg:gap-8 xl:gap-16">
                    <NuxtLink to="/products">Produkte</NuxtLink>
                    <NuxtLink to="/shops">Läden</NuxtLink>
                    <NuxtLink to="/location">Meine Umgebung</NuxtLink>
                </div>
            </div>
            <div class="flex w-[90%] justify-between">
                <NuxtLink class="z-20" to="/">
                    <NuxtImg src="/images/IndieZoneDesktopLogo.png" alt="IndieZoneLogo" class="h-56" />
                </NuxtLink>
                <div class="flex w-fit items-center justify-between gap-8 whitespace-nowrap text-label-medium">
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
                    <NuxtLink v-if="user?.app_metadata.shops" to="myshop">
                        <div class="flex flex-col items-center">
                            <Icon name="material-symbols:storefront-outline" />
                            Mein Shop
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser()

    const route = useRoute()
    const router = useRouter()

    const sidebarVisibility = ref(false)
</script>
