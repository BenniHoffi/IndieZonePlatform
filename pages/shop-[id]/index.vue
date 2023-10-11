<template>
    <div class="flex w-full flex-col items-center gap-10">
        <ShopBannerSection :shop="shop" />
        <ShowcaseSection :title="shop!.name" :cards="cards" />
        <!-- TODO TabView evtl sticky -->
        <div class="mx-auto w-full max-w-7xl">
            <TabView class="w-full">
                <TabPanel header="Beschreibung">
                    <ShopDescriptionSection />
                </TabPanel>
                <TabPanel header="Produkte">
                    <ShopProductSection />
                </TabPanel>
                <TabPanel header="Bewertungen">
                    <CommentSection title="Was Kunden über uns sagen" :rating="shop!.rating" :comments="comments" />
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import useComments from "~/composables/useComments"

    definePageMeta({
        title: "shopname",
    })
    const route = useRoute()
    const shopID = route.params.id as string
    const { shop } = await useShopID(shopID)
    const cards = await useProducts()
    const comments = await useComments()
</script>
