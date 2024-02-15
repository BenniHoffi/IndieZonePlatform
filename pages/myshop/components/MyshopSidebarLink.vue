<template>
    <NuxtLink
        :to="to"
        :class="minimized ? 'justify-center' : ''"
        activeClass="bg-secondary text-black hover:bg-secondary"
        class="flex h-9 w-full items-center gap-3 rounded-lg px-3 py-1 text-xl hover:bg-primary-hover"
        v-tooltip="minimized ? label : ''">
        <Icon :name="icon" />
        <div v-if="!minimized">{{ label }}</div>
    </NuxtLink>
</template>

<script lang="ts" setup>
    defineProps<{
        minimized: boolean
        to: string
        label: string
        icon: string
    }>()
</script>
