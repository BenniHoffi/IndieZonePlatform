<template>
    <div class="w-full">
        <FormKit type="form" id="loginForm" @submit="signIn" :actions="false">
            <FormKitSchema :schema="schema" />
            <div class="w-full text-right text-label-medium">
                <NuxtLink to="/" class="text-blue-700 underline">Passwort vergessen?</NuxtLink>
            </div>
            <FormKit type="submit" wrapper-class="flex justify-center" label="Jetzt Einloggen" :disabled="!turnstileToken" />
            <NuxtTurnstile ref="turnstile" v-model="turnstileToken" />
        </FormKit>
    </div>
</template>
<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    const toast = useToast()
    const supabase = useSupabaseClient()

    const turnstileToken = ref()
    const turnstile = ref()

    async function signIn(loginData: { email: string; password: string }) {
        const { error } = await supabase.auth.signInWithPassword({
            email: loginData.email,
            password: loginData.password,
            options: {
                captchaToken: turnstileToken.value,
            },
        })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Login fehlgeschlagen",
                detail: error.message,
                life: 5000,
            })
            turnstile.value?.reset()
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
