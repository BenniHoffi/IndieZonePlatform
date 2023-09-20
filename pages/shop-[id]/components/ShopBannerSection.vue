<template>
  <div class="w-full max-w-lg">
        <div class="relative text-white">
          <!-- TODO: URL richtig machen -->
            <img class="w-full" src="~/assets/dummyImages/shoppy.png" />
            <button class="absolute left-3 top-3" @click="router.back()">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button class="absolute right-3 top-3" @click="">
                <span class="material-symbols-outlined">favorite</span>
            </button>
        </div>
        <div class="p-4">
            <div class="flex justify-between">
                <h1 class="title-large">{{ shop.name }}</h1>
                <div class="text-secondary">
                    <span v-if="shop.rating > 0" class="material-symbols-outlined">star</span>
                    <span v-if="shop.rating > 1" class="material-symbols-outlined">star</span>
                    <span v-if="shop.rating > 2" class="material-symbols-outlined">star</span>
                    <span v-if="shop.rating > 3" class="material-symbols-outlined">star</span>
                    <span v-if="shop.rating > 4" class="material-symbols-outlined">star</span>
                </div>
            </div>
            <div class="text-label-medium font-bold">
                {{ shop.description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    shop: any,
  }>();
</script>
