<template>
    <div class="flex justify-center w-full">
        <div>
            <h1 class="text-headline-large font-bold py-4">Login</h1>
            <FormKit class="w-72" type="form" id="loginForm" @submit="signIn" submit-label="Einloggen">
                <FormKitSchema :schema="schema" />
            </FormKit>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useToast } from "primevue/usetoast"
    definePageMeta({
        title: "Login",
    })

    const toast = useToast()
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    async function signIn(loginData: { email: string; password: string }) {
        const { error } = await supabase.auth.signInWithPassword({
            email: loginData.email,
            password: loginData.password,
            options: {},
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
        },
        {
            $formkit: "primePassword",
            name: "password",
            label: "Password",
            validation: "required",
            placeholder: "Password",
        },
    ]
</script>
