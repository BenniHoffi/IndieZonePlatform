<template>
    <div>
        <ShopBannerSection :shop="shop"/>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "shopname",
    })
    const route = useRoute();
    const shopID = route.params.id as string;
    const {shop} = await useShopID(shopID);
</script>