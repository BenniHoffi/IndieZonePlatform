<template>
    <div>
        <h1>Home</h1>
        <PrimeDemoForm />
        <PrimeDemoToast />
        <NuxtLink to="/myshop">My shop</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })
</script>
