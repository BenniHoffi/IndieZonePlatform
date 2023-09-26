<template>
    <div class="flex w-screen flex-col items-center">
        <ShopBannerSection :shop="shop" />
        <ShopShowcaseSection />
        <ShopDescriptionSection />
        <ShopCommentSection :shop="shop" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "shopname",
    })
    const route = useRoute()
    const shopID = route.params.id as string
    const { shop } = await useShopID(shopID)
</script>
