<template>
    <div class="flex w-full flex-col items-center">
        <ProductBannerSection :product="product" />
        <ProductCommentSection :product="product" />
    </div>
</template>

<script lang="ts" setup>
    // TODO: Warum brauch ich hier einen Import und für shop-[id] nischt?
    import useProductID from "./composables/useProductID"

    definePageMeta({
        title: "productname",
    })
    const route = useRoute()
    const productID = route.params.id as string
    const { product } = await useProductID(productID)
</script>
