<template>
    <div>
        <h1>Admin</h1>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        title: "IndieZone Admin",
        layout: "admin",
        middleware: ["admin"],
    })
</script>
