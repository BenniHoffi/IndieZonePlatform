<template>
    <div class="flex gap-4">
        <div v-if="type === 'select'" class="flex flex-col gap-1">
            <div v-for="locale in locales">
                <div class="font-bold">{{ locale }}:</div>
                <div v-for="(value, index) in <I18n[]>valuesCopy" :key="index" class="flex items-center gap-1">
                    <InputText v-model="value[locale]" class="p-2" />
                    <Button
                        rounded
                        text
                        icon="pi pi-times"
                        size="small"
                        severity="danger"
                        @click="(<I18n[]>valuesCopy).splice(index, 1)" />
                </div>
                <Button
                    rounded
                    text
                    class="self-start"
                    icon="pi pi-plus"
                    size="small"
                    @click="(<I18n[]>valuesCopy).push({ de: '', en: '' })" />
            </div>
        </div>
        <div v-else-if="type === 'min/max'" class="mt-3 flex flex-col gap-2">
            <div class="p-float-label">
                <InputNumber id="min" v-model="(<MinMax>valuesCopy).min" :pt="{ input: 'p-2' }" />
                <label for="min">Min</label>
            </div>
            <div class="p-float-label">
                <InputNumber id="max" v-model="(<MinMax>valuesCopy).max" :pt="{ input: 'p-2' }" />
                <label for="max">Max</label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const { type, locales, modelValue } = defineProps<{
        type: string
        locales: string[]
        modelValue: MinMax | I18n[]
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", modelValue: any | any[]): void
    }>()

    const { cloned: valuesCopy } = useCloned(modelValue)

    watch(
        valuesCopy,
        () => {
            emit("update:modelValue", valuesCopy.value)
        },
        { deep: true }
    )
</script>
