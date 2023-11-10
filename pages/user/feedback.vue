<template>
    <div class="flex justify-center">
        <h1>FEETBACK</h1>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "User Feedback",
        layout: "user",
        middleware: ["auth"],
    })
</script>
