<template>
    <div>
        <h1 class="text-headline-medium font-bold">Admin</h1>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        title: "IndieZone Admin",
        layout: "admin",
        middleware: ["admin"],
    })
</script>
