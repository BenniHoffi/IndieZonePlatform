<template>
    <div>
        <h1>Home</h1>
        <NuxtLink to="/myshop">My shop</NuxtLink>
        <br />
        <PrimeDemoForm />
        <PrimeDemoToast />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Home",
    })
</script>
