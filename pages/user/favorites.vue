<template>
    <div class="flex justify-center">
        <h1>FAVORITEN BABY</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "User Favorites",
        layout: "user",
        middleware: ["auth"],
    })
</script>
