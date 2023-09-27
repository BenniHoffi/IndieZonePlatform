<template>
    <section class="w-full">
        <div class="mx-auto w-full max-w-6xl pb-2 pl-4 pt-4 text-title-large text-primary">Schaufenster</div>
        <div class="flex h-56 gap-x-6 overflow-x-scroll bg-primary p-6">
            <div v-for="item in 16" :key="item" class="h-full rounded-lg bg-user-surface-container-low">
                <img class="h-4/5 max-w-none rounded-t-lg" src="~/assets/dummyImages/media.png" />
                <div class="flex h-1/5 items-center rounded-b-lg pl-4 text-primary">
                    <div>Ladenname?</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>
