<template>
    <div>
        <Button label="Testprodukt erstellen" @click="uploadTestProduct" />
        <pre>{{ product }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const toast = useToast()
    const product = ref()
    async function uploadTestProduct() {
        product.value = await useAsyncData()
    }
</script>
