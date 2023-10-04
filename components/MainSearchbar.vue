<template>
    <div class="relative h-full w-full">
        <button class="absolute right-0 aspect-square h-full" @click="console.log('Suche...')">
            <Icon name="material-symbols:search" />
        </button>
        <InputText
            placeholder="Suche"
            type="text"
            class="h-full w-full rounded-xl border-0 bg-container-dark ring-primary focus:ring-2" />
    </div>
</template>
<script setup lang="ts"></script>
