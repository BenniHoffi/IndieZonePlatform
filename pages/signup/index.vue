<template>
    <div class="flex w-full flex-col items-center p-4">
        <h1 class="py-4 text-headline-large font-bold">Registrieren</h1>
        <SignupForm class="max-w-lg" />
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        title: "Registrieren",
        middleware: ["anon"],
    })
</script>
