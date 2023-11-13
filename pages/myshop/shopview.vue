<template>
    <div>
        <h1 class="text-heading-large">Ladenvorschau</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Mein Shop - Ladenvorschau",
        layout: "myshop",
        middleware: ["shopowner"],
    })
</script>
