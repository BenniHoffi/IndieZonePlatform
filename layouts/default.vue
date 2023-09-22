<template>
    <div class="flex flex-col items-center h-screen w-full">
        <MainHeader />
        <main class="grow lg:max-w-7xl py-4">
            <slot />
        </main>
        <MainFooter />
    </div>
</template>

<script lang="ts" setup></script>
