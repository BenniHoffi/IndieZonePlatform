<template>
    <FileUpload
        custom-upload
        accept="application/pdf"
        :max-file-size="5000000"
        @select="emit('update:modelValue', $event.files[0])">
        <template #header="{ chooseCallback, clearCallback, files }">
            <div v-if="files.length > 0" class="flex w-full items-center justify-center gap-4">
                <h4>{{ files[0].name }}</h4>
                <Button class="p-button-rounded p-button-text" severity="danger" @click="clearCallback()">
                    <template #icon>
                        <Icon name="material-symbols:close-rounded" />
                    </template>
                </Button>
            </div>
            <div v-else class="flex w-full cursor-pointer flex-col items-center justify-center gap-2" @click="chooseCallback()">
                <Icon name="material-symbols:upload-file-outline" size="3rem" />
                <div class="text-label-large">{{ label }}</div>
            </div>
        </template>
    </FileUpload>
</template>

<script setup lang="ts">
    const { label } = defineProps<{
        label: string
        modelValue: File | undefined
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: File): void
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
