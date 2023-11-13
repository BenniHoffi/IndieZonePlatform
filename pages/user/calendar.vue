<template>
    <div class="flex justify-center">
        <h1>KALENDER</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "User Calendar",
        layout: "user",
        middleware: ["auth"],
    })
</script>
