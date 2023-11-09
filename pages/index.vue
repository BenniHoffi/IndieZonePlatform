<template>
    <div>
        <DevOnly>
            <div class="mx-auto max-w-md">
                <h1 class="text-headline-medium">Home</h1>
                <NuxtLink to="/myshop" class="text-blue-600 underline">My shop</NuxtLink>
                <br />
                <NuxtLink to="/shop-123" class="text-blue-600 underline">Shopansicht test</NuxtLink>
                <br />
                <NuxtLink to="/product-123" class="text-blue-600 underline">Produktansicht test</NuxtLink>
                <br />
                <NuxtLink to="/shopRegistration" class="text-blue-600 underline">Shop-Registrierung Test</NuxtLink>
                <br />
            </div>
        </DevOnly>
        <!-- <div class="mx-auto h-[500px] w-full lg:w-2/3">
            <ClientOnly>
                <TheMap
                    :markers="[
                        [12.377257, 51.341283],
                        [12.377257, 52.341283],
                    ]" />
            </ClientOnly>
        </div> -->
        <HomeTopSection />

        <ShowcaseSection title="Neu in deiner IndieZone" :cards="cards" bgColor="bg-secondary" />
        <ShowcaseSection title="Eure Lieblinge" :cards="cards" />
        <ShowcaseSection title="Wir empfehlen" :cards="cards" bgColor="bg-tertiary" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })

    const cards = useProducts()

    const result = ref<MapboxGeocoder.Result>()
</script>
