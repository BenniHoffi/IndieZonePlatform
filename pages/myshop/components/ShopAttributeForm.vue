<template>
    <FormKit
        v-if="attribute.type === 'text'"
        type="primeInputText"
        :name="attribute.id"
        :label="attribute.name.de"
        class="w-full" />
    <FormKit
        v-if="attribute.type === 'select'"
        type="primeDropdown"
        :name="attribute.id"
        :label="attribute.name.de"
        :options="attribute.values"
        option-label="de"
        showClear
        class="w-full" />
    <FormKit
        v-if="attribute.type === 'number'"
        type="primeInputNumber"
        :name="attribute.id"
        :label="attribute.name.de"
        class="w-full" />
    <FormKit
        v-if="attribute.type === 'min/max'"
        type="primeInputNumber"
        :name="attribute.id"
        :label="attribute.name.de"
        :min="(attribute.values as MinMax).min"
        :max="(attribute.values as MinMax).max"
        class="w-full" />
</template>

<script lang="ts" setup>
    const { attribute } = defineProps<{
        attribute: CategoryAttribute
    }>()
</script>
