<template>
    <div>
        <h1>Home</h1>
        <span class="material-symbols-outlined">home</span>
        <NuxtLink to="/myshop">My shop</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })
</script>

<style>
    .material-symbols-outlined {
        font-variation-settings: "FILL" 1;
    }
</style>
