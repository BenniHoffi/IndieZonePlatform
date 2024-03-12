<template>
    <div class="max-w-72">
        <FileUpload
            capture="environment"
            custom-upload
            accept="image/*"
            :max-file-size="5000000"
            :pt="{ buttonbar: 'text-primary border-1 border rounded-xl p-10', content: '' }"
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
                <div v-else class="flex cursor-pointer flex-col items-center justify-center gap-2" @click="chooseCallback()">
                    <Icon name="material-symbols:add-a-photo-outline" size="60px" />
                    <small>{{ label }}</small>
                </div>
            </template>
        </FileUpload>
    </div>
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
