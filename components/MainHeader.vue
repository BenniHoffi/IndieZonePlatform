<template>
    <div class="pb-44 lg:hidden">
        <Sidebar v-model:visible="sidebarVisibility" class="flex flex-col gap-4 p-4">
            <DevOnly>
                <div v-if="user">
                    <div>email: {{ user.email }}</div>
                    <div>id: {{ user.id }}</div>
                    <div>claims_admin: {{ user.app_metadata.claims_admin }}</div>
                    <div>shopowner: {{ user.app_metadata.shopowner }}</div>
                </div>
                <br />
                <button @click="createShop()">Create Shop</button>
                <br />
                <button @click="deleteShop()">Delete Shop</button>
                <br />
                <br />
            </DevOnly>
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
        <div class="fixed top-0 left-0 w-full z-[999]">
            <div class="w-full flex items-center justify-between p-4 pt-6 px-6 bg-white">
                <NuxtLink to="/" class="flex gap-4 items-center">
                    <img src="/images/indiezoneLogo.png" alt="IndieZone Logo" class="h-14" />
                    <img src="/images/indiezoneBanner.png" alt="IndieZone Banner" class="h-5" />
                </NuxtLink>
                <div class="flex gap-4 items-center">
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
            <div class="flex items-center gap-4 w-full p-4 lg:pr-8 h-20 bg-secondary">
                <button class="h-10 aspect-square" @click="sidebarVisibility = true">
                    <Icon name="material-symbols:menu" />
                </button>
                <div class="relative w-full">
                    <button class="absolute right-0 aspect-square h-full" @click="console.log('Suche...')">
                        <Icon name="material-symbols:search" />
                    </button>
                    <InputText
                        placeholder="Suche"
                        type="text"
                        :pt="{ root: { class: 'bg-container-dark w-full h-full border-0 rounded-xl focus:ring-2 ring-primary' } }" />
                </div>
            </div>
        </div>
    </div>
    <div class="hidden lg:flex flex-col relative w-full items-center">
        <div class="absolute flex justify-between top-40 w-full h-[65px] bg-secondary z-10 p-2 pl-80 pr-10">
            <div class="relative w-[45%]">
                <button class="absolute right-0 aspect-square h-full" @click="console.log('Suche...')">
                    <Icon name="material-symbols:search" />
                </button>
                <InputText
                    placeholder="Suche"
                    type="search"
                    :pt="{
                        root: {
                            class: 'bg-container-dark w-full h-full border-0 rounded-xl focus:ring-2 ring-primary',
                        },
                    }" />
            </div>
            <div class="h-full flex gap-10 xl:gap-16 items-center">
                <NuxtLink to="/products">Produkte</NuxtLink>
                <NuxtLink to="/shops">Läden</NuxtLink>
                <NuxtLink to="/location">Meine Umgebung</NuxtLink>
            </div>
        </div>
        <div class="flex justify-between w-[90%]">
            <NuxtLink class="z-20" to="/">
                <img src="/images/IndieZoneDesktopLogo.png" alt="IndieZoneLogo" class="h-56" />
            </NuxtLink>
            <div class="flex gap-4 items-center w-60 justify-between text-label-medium">
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
                        Login
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser()
    const client = useSupabaseClient<Database>()

    const sidebarVisibility = ref(false)

    async function createShop() {
        const { data, error } = await client.from("shops").insert({
            name: "Test Shop",
            shopowner_name: "Test Shopowner",
            description: "Test Description",
            category: "Test Category",
            street_adress: "Test Street",
            city: "Test City",
            zip_code: "Test Zip",
            country: "Text Country",
            telephone: "Test Telephone",
            opening_hours: [[]],
            owner_id: user.value!.id,
        })
        if (error) {
            console.error(error)
        } else {
            console.log(data)
        }
    }

    async function deleteShop() {
        const { data, error } = await client.from("shops").delete().eq("id", user.value!.app_metadata.shopowner)
        if (error) {
            console.error(error)
        } else {
            console.log(data)
        }
    }
</script>
