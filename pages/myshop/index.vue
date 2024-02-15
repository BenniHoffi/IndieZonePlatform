<template>
    <div>
        <h1 class="text-heading-large">Mein Shop</h1>
        <pre>
            {{ shopData }}
        </pre>
    </div>
</template>

<script lang="ts" setup>

    const shopData = await useShopData()
    definePageMeta({
        title: "Mein Shop",
        layout: "myshop",
        middleware: ["shopowner"],
    })
</script>
