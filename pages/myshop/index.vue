<template>
    <div>
        <h1 class="text-headline-large">Mein Shop</h1>
        <Button class="mt-4" @click="navigateTo('/myshop/addProduct')">Artikel hinzufügen</Button>
        <pre>{{ myshop }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const { myshop } = await useMyshop()
    definePageMeta({
        title: "Mein Shop",
        layout: "myshop",
        middleware: ["shopowner"],
    })
</script>
