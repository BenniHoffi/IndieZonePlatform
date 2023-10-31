<template>
    <footer class="relative flex w-full items-center gap-4 border-t p-4 pb-12">
        <small class="absolute right-3 top-1">&copy; IndieZone 2023</small>
        <NuxtImg src="/images/indiezoneTextLogo.png" alt="IndieZone Logo" class="w-20" />
        <div class="flex flex-col gap-2">
            <NuxtLink to="/imprint">Impressum</NuxtLink>
            <NuxtLink to="/privacy">Datenschutz</NuxtLink>
        </div>
    </footer>
</template>

<script lang="ts" setup></script>
