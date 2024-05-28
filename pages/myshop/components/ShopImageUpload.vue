<template>
    <div class="w-full sm:max-w-72">
        <FileUpload
            capture="environment"
            custom-upload
            accept="image/*"
            :max-file-size="5000000"
            :pt="{ buttonbar: 'text-primary border-1 border rounded-xl', content: 'hidden' }"
            @select="emit('update:img', $event.files[0])">
            <template #header="{ chooseCallback, clearCallback, files }">
                <div v-if="files.length > 0" class="relative flex max-w-sm flex-col gap-2">
                    <img class="rounded-xl" :src="files[0].objectURL" />
                    <Icon name="material-symbols:delete" class="absolute right-1 top-1 cursor-pointer text-white" />
                    <Icon
                        name="material-symbols:delete-outline"
                        class="absolute right-1 top-1 cursor-pointer"
                        @click="clearCallback()" />
                </div>
                <div v-else class="flex cursor-pointer flex-col items-center justify-center gap-2 p-10" @click="chooseCallback()">
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
