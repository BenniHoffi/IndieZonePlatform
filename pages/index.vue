<template>
    <div>
        <DevOnly>
            <div class="mx-auto max-w-md">
                <h1 class="text-headline-medium">Home</h1>
                <div class="text-blue-700 underline">
                    <NuxtLink to="/myshop">My shop</NuxtLink>
                    <br />
                    <NuxtLink to="/shop-123">Shopansicht test</NuxtLink>
                    <br />
                    <NuxtLink to="/product-123">Produktansicht test</NuxtLink>
                    <br />
                    <NuxtLink to="/shopRegistration">Shop-Registrierung Test</NuxtLink>
                    <br />
                </div>
            </div>
        </DevOnly>
        <HomeTopSection />

        <ShowcaseSection title="Neu in deiner IndieZone" :cards="cards" bg-color="bg-secondary" />
        <ShowcaseSection title="Eure Lieblinge" :cards="cards" />
        <ShowcaseSection title="Wir empfehlen" :cards="cards" bg-color="bg-tertiary" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })

    const cards = useProducts()
</script>
