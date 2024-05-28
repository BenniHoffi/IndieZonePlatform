<template>
    <div>
        <h1 class="text-headline-large">Artikelübersicht</h1>
        <Button class="mt-4" @click="navigateTo('/myshop/addProduct')">Artikel hinzufügen</Button>
        <!-- <pre>{{ shopProductsWithImageUrls }}</pre> -->
        <DataTable :value="shopProductsWithImageUrls">
            <Column field="name" header="Name"></Column>
            <Column header="Bild">
                <template #body="{ data }">
                    <!-- <pre>{{ data }}</pre> -->
                    <img :src="data.imgUrl" alt="Product image" />
                </template>
            </Column>
            <Column field="price" header="Preis"></Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Artikelübersicht",
        description: "Verwalten Sie Ihre Artikel.",
        layout: "myshop",
    })
    const shopId = useShopId()
    const { shopProducts, shopProductsWithImageUrls, refreshShopProducts, shopProductsPending } = await useShopProducts(
        shopId.value
    )
</script>
