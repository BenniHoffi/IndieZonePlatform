<template>
    <div class="flex flex-col items-center p-4">
        <div>
            <NuxtLink v-if="'158a70e3-64c0-49a5-b52f-37ed2b9b9b80' in groups" to="/admin">Admin</NuxtLink>
        </div>
        <div>{{ groups }}</div>
        <Button label="Ausloggen" @click="signOut" />
    </div>
</template>

<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    definePageMeta({
        title: "Profil",
        middleware: ["auth"],
    })

    const user = useSupabaseUser()

    const groups = computed(() => {
        return user.value?.app_metadata.groups
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
