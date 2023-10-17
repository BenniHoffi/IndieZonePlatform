<template>
    <FormKit type="multi-step" tab-style="progress">
        <FormKit type="step" name="stepOne" label="Custom Label">
            <FormKit type="text" label="Name" validation="required" />

            <div class="text-secondary">Cool dass das geht</div>
        </FormKit>
        <FormKit type="step" name="stepTwo">
            <FormKit type="textarea" label="Your story" validation="required" />
        </FormKit>
        <FormKit type="step" name="stepThree">
            <FormKit type="textarea" label="Something else" validation="required" />

            <template #stepNext>
                <FormKit type="submit" />
            </template>
        </FormKit>
    </FormKit>
</template>
