<template>
    <div>
        <h1>Home</h1>
        <NuxtLink to="/myshop">My shop</NuxtLink>
        <br />
        <NuxtLink to="/shop-123">Shopansicht test</NuxtLink>
        <br />
        <NuxtLink to="/product-123">Produktansicht test</NuxtLink>
        <br />
        <ShowcaseSection title="Schaofenster" :cards="cards" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })

    const cards = useProducts()
</script>
