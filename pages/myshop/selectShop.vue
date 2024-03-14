<template>
    <div>
        <div v-for="shop in shops"></div>
    </div>
</template>

<script lang="ts" setup>
    const shopId = useShopId()
    const user = useSupabaseUser()
    const shops = computed(async () => {})
</script>
