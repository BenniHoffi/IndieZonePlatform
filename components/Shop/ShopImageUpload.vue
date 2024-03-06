<template>
    <!-- <FileUpload
        capture="environment"
        custom-upload
        accept="image/*"
        :max-file-size="5000000"
        @select="emit('update:img', $event.files[0])">
        <template #header="{ chooseCallback, clearCallback, files }">
            <div
                v-if="files.length > 0"
                class="flex max-w-sm cursor-pointer flex-col gap-2"
                @click.self="
                    () => {
                        clearCallback(), chooseCallback()
                    }
                ">
                <i class="pi pi-times cursor-pointer self-end" style="font-size: 1rem" @click="clearCallback()"></i>
                <img :src="files[0].objectURL" />
            </div>
            <div
                v-else
                class="flex aspect-square w-36 cursor-pointer flex-col items-center justify-center gap-2"
                @click="chooseCallback()">
                <i class="pi pi-image" style="font-size: 5rem"></i>
                <small>{{ label }}</small>
            </div>
        </template>
    </FileUpload> -->
    <FileUpload> </FileUpload>
</template>
<script setup lang="ts">
    defineProps<{
        label: string
        img?: File
    }>()

    const emit = defineEmits<{
        (e: "update:img", newImg: File): void
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
