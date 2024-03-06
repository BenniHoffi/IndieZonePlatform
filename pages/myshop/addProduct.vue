<template>
    <div>
        <h1 class="text-headline-large">Artikel hinzufügen</h1>
        <ShopImageUpload v-model:img="mainImg" label="Hauptbild" />
        <FormKit type="form">
            <FormKit type="primeInputText" id="productName" label="Produktname" />
        </FormKit>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Artikel hinzufügen",
        description: "Fügen Sie ein neues Artikel zu Ihrem Shop hinzu.",
        layout: "myshop",
    })

    const mainImg = ref<File>()
</script>
