<template>
    <FormKit type="form" :actions="false">
        <FormKit type="multi-step" tab-style="progress" :hide-progress-labels="false">
            <FormKit type="step" name="stepOne">
                <FormKitSchema :schema="schemaStep1" />
            </FormKit>
            <FormKit type="step" name="stepTwo">
                <FormKitSchema :schema="schemaStep1" />
            </FormKit>
            <FormKit type="step" name="stepThree">
                <FormKitSchema :schema="schemaStep1" />

                <template #stepNext>
                    <FormKit type="submit" />
                </template>
            </FormKit>
        </FormKit>
    </FormKit>
</template>
<script setup lang="ts">
    const schemaStep1 = [
        {
            $formkit: "primeInputText",
            name: "name",
            label: "Name",
            validation: "length:6",
            placeholder: "Name",
            class: "w-full",
        },
    ]

    const schemaStep2 = [
        {
            $formkit: "primeInputText",
            name: "name",
            label: "Name",
            validation: "length:6",
            placeholder: "Name",
            class: "w-full",
        },
    ]
    const schemaStep3 = [
        {
            $formkit: "primeInputText",
            name: "name",
            label: "Name",
            validation: "length:6",
            placeholder: "Name",
            class: "w-full",
        },
    ]
</script>
