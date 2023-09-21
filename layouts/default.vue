<template>
    <div class="flex flex-col h-screen w-full items-center">
        <MainHeader />
        <main class="grow max-w-7xl">
            <slot />
        </main>
        <MainFooter />
    </div>
</template>

<script lang="ts" setup></script>
