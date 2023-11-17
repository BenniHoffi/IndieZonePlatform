<template>
    <div class="flex flex-col items-center gap-4 p-4">
        <div class="text-blue-700 underline">
            <NuxtLink v-if="groups && '158a70e3-64c0-49a5-b52f-37ed2b9b9b80' in groups" to="/admin">Admin</NuxtLink>
        </div>
        <DevOnly>
            <div class="w-fit max-w-full overflow-auto">
                <pre>groups: {{ groups }}</pre>
                <pre>shops: {{ shops }}</pre>
            </div>
        </DevOnly>
        <Button label="Ausloggen" @click="signOut" />
    </div>
</template>

<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    definePageMeta({
        title: "Profil",
        middleware: ["auth"],
        layout: "user",
    })

    const user = useSupabaseUser()

    const groups = computed(() => {
        return user.value?.app_metadata.groups
    })

    const shops = computed(() => {
        return user.value?.app_metadata.shops
    })

    const toast = useToast()
    const supabase = useSupabaseClient()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.add({
                severity: "error",
                summary: "Ausloggen fehlgeschlagen",
                detail: error.message,
                life: 5000,
            })
        } else {
            navigateTo("/")
        }
    }
</script>
