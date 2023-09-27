<template>
    <div>
        <h1>Home</h1>
        <NuxtLink to="/myshop">My shop</NuxtLink>
        <br />
        <NuxtLink to="/shop-123">Shopansicht test</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })
</script>
