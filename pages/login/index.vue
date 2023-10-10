<template>
    <div class="flex w-full flex-col items-center">
        <h1 class="py-4 text-headline-large font-bold">Login</h1>
        <LoginForm class="max-w-lg" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Login",
        middleware: ["anon"],
    })
</script>
