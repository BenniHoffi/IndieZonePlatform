<template>
    <div>
        <h1 class="text-headline-large">Artikelübersicht</h1>
        <Button class="mt-4" @click="navigateTo('/myshop/addProduct')">Artikel hinzufügen</Button>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Artikelübersicht",
        description: "Verwalten Sie Ihre Artikel.",
        layout: "myshop",
    })
</script>
