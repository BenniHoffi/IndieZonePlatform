<template>
    <section class="w-full">
        <div class="mx-auto w-full max-w-6xl pb-2 pl-4 pt-4 text-title-large text-primary">Schaufenster</div>
        <div class="w-full bg-primary">
            <div class="mx-auto max-w-6xl pl-4">
                <div class="flex snap-x snap-mandatory items-start gap-x-6 overflow-x-auto py-6 pr-6">
                    <div v-for="item in 16" class="h-44 snap-start overflow-y-clip rounded-lg bg-user-surface-container-low">
                        <img class="h-4/5 max-w-none" src="~/assets/dummyImages/media.png" />
                        <div class="flex h-1/5 items-center rounded-b-lg px-4 text-primary">
                            <div>Ladenname?</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>
