<template>
    <div>
        <h1 class="text-heading-large">Benachrichtigungen</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Mein Shop - Benachrichtigungen",
        layout: "myshop",
        middleware: ["shopowner"],
    })
</script>
