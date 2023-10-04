<template>
    <div class="flex h-screen w-full flex-col items-center">
        <MainHeader />
        <main class="w-full grow py-4">
            <slot />
        </main>
        <MainFooter />
    </div>
</template>

<script lang="ts" setup></script>
