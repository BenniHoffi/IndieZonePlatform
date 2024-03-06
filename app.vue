<template>
    <div>
        <VitePwaManifest />
        <div class="w-full font-montserrat text-primary">
            <Toast />
            <ConfirmDialog />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
