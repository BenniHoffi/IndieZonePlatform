<template>
    <FileUpload
        capture="environment"
        custom-upload
        accept="image/*"
        :max-file-size="5000000"
        @select="emit('update:img', $event.files[0])">
        <template #header="{ chooseCallback, clearCallback, files }">
            <div v-if="img" class="flex w-full flex-col items-center justify-center gap-2">
                <i class="pi pi-times cursor-pointer self-end" style="font-size: 1rem" @click="emit('clear')" />
                <NuxtImg :src="img.objectURL" class="border border-primary" />
            </div>
            <div v-else-if="files.length > 0" class="flex w-full flex-col items-center justify-center gap-2">
                <i class="pi pi-times cursor-pointer self-end" style="font-size: 1rem" @click="clearCallback()" />
                <NuxtImg :src="files[0].objectURL" class="border border-primary" />
            </div>
            <div v-else class="flex w-full cursor-pointer flex-col items-center justify-center gap-2" @click="chooseCallback()">
                <i class="pi pi-image" style="font-size: 5rem"></i>
                <small>{{ label }}</small>
            </div>
        </template>
    </FileUpload>
</template>

<script setup lang="ts">
    const props = defineProps<{
        label: string
        img?: File
    }>()

    const emit = defineEmits<{
        (e: "update:img", newImg: File): void
        (e: "clear"): void
    }>()
</script>

<style scoped>
    :deep(.p-fileupload-content) {
        display: none;
    }
    :deep(.p-fileupload-buttonbar) {
        border-radius: 6px;
        border: 1px solid #dee2e6;
    }
</style>
