<template>
    <div class="w-full">
        <FormKit type="form" id="loginForm" @submit="signIn" submit-label="Einloggen">
            <FormKitSchema :schema="schema" />
        </FormKit>
    </div>
</template>
<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    const toast = useToast()
    const supabase = useSupabaseClient()

    async function signIn(loginData: { email: string; password: string }) {
        const { error } = await supabase.auth.signInWithPassword({
            email: loginData.email,
            password: loginData.password,
        })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Login fehlgeschlagen",
                detail: error.message,
                life: 5000,
            })
        } else {
            navigateTo("/")
        }
    }

    const schema = [
        {
            $formkit: "primeInputText",
            name: "email",
            label: "Email",
            validation: "required|email",
            placeholder: "Email",
            class: "w-full",
        },
        {
            $formkit: "primePassword",
            name: "password",
            label: "Password",
            validation: "required",
            placeholder: "Password",
            class: "w-full",
            pt: { root: { class: "w-full" } },
        },
    ]
</script>
