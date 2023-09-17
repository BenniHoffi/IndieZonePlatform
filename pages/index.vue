<template>
    <div>
        <h1>Home</h1>
        <Test />
        <NuxtLink to="/myshop">My shop</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })
</script>
