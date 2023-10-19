<template>
    <div>
        <h1>Home</h1>
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
        <NuxtLink to="/user">Deine Zone Test</NuxtLink>
        <br />
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
</script>
