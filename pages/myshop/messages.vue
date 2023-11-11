<template>
    <div>
        <h1 class="text-heading-large">Nachrichten</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Mein Shop - Nachrichten",
        layout: "myshop",
        middleware: ["shopowner"],
    })
</script>
