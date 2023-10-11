<template>
    <div class="flex w-full flex-col items-center gap-10">
        <ProductBannerSection :product="product" />

        <div class="mx-auto w-full max-w-7xl">
            <TabView class="w-full">
                <TabPanel header="Beschreibung">
                    <ProductDescriptionSection />
                </TabPanel>
                <TabPanel header="Laden">
                    <ProductShopSection />
                </TabPanel>
                <TabPanel header="Bewertungen">
                    <CommentSection :rating="product!.rating" :comments="comments" />
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<script lang="ts" setup>
    // TODO: Warum brauch ich hier einen Import und für shop-[id] nischt?
    import useComments from "~/composables/useComments"
    import useProductID from "./composables/useProductID"

    definePageMeta({
        title: "productname",
    })
    const route = useRoute()
    const productID = route.params.id as string
    const { product } = await useProductID(productID)
    const comments = await useComments()
</script>
