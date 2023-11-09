<template>
    <div class="mx-auto flex w-full max-w-lg flex-col items-center p-4">
        <h1 class="py-4 text-headline-large font-bold">Login</h1>
        <LoginForm />
        <div class="self-start">
            Du hast noch keinen Account?
            <br />
            <NuxtLink class="text-blue-700 underline" to="/signup"> Jetzt registrieren</NuxtLink>.
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Login",
        middleware: ["anon"],
    })
</script>
