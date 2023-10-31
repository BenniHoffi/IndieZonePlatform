<template>
    <div>
        <div class="mx-auto max-w-md">
            <h1 class="text-headline-medium">Home</h1>
            <NuxtLink to="/myshop">My shop</NuxtLink>
            <br />
            <NuxtLink to="/shop-123">Shopansicht test</NuxtLink>
            <br />
            <NuxtLink to="/product-123">Produktansicht test</NuxtLink>
            <br />
            <NuxtLink to="/shopRegistration">Shop-Registrierung Test</NuxtLink>
            <br />
            <NuxtLink to="/homepageLoggedIn">Homepage logged in Test</NuxtLink>
            <br />
        </div>
        <!-- <div class="mx-auto h-[500px] w-full lg:w-2/3">
            <ClientOnly>
                <TheMap
                    :markers="[
                        [12.377257, 51.341283],
                        [12.377257, 52.341283],
                    ]" />
            </ClientOnly>
        </div> -->

        <ShowcaseSection title="Neu in deiner IndieZone" :cards="cards" bgColor="bg-secondary" />
        <ShowcaseSection title="Eure Lieblinge" :cards="cards" />
        <ShowcaseSection title="Wir empfehlen" :cards="cards" bgColor="bg-tertiary" />
    </div>
</template>

<script lang="ts" setup>
    import MapboxAddressAutofill from "./shopRegistration/components/MapboxAddressAutofill.vue"

    definePageMeta({
        title: "Home",
    })

    const cards = useProducts()

    const result = ref<MapboxGeocoder.Result>()
</script>
