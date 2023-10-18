<template>
    <div class="w-full">
        <FormKit type="form" id="signupForm" @submit="signUp" submit-label="Registrieren">
            <FormKitSchema :schema="schema" />
            <NuxtTurnstile v-model="turnstileToken" />
        </FormKit>
    </div>
</template>

<script lang="ts" setup>
    import { useToast } from "primevue/usetoast"

    const toast = useToast()
    const supabase = useSupabaseClient()

    const turnstileToken = ref()

    async function signUp(signupData: { email: string; password: string; name: string; username: string; bday: Date }) {
        const { error } = await supabase.auth.signUp({
            email: signupData.email,
            password: signupData.password,
            options: {
                data: {
                    name: signupData.name,
                    username: signupData.username,
                    bday: signupData.bday.toISOString().split("T")[0],
                },
                captchaToken: turnstileToken.value,
            },
        })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Registrierung fehlgeschlagen",
                detail: error.message,
                life: 5000,
            })
        } else {
            navigateTo("/signup/confirmEmail")
        }
    }

    const today = new Date()
    const dateBefore = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

    const schema = [
        {
            $formkit: "primeInputText",
            name: "name",
            label: "Name",
            validation: "length:6",
            placeholder: "Name",
            class: "w-full",
        },
        {
            $formkit: "primeInputText",
            name: "username",
            label: "Benutzername",
            validation: "length:6",
            placeholder: "Benutzername",
            class: "w-full",
        },
        {
            $formkit: "primeCalendar",
            name: "bday",
            label: "Geburtstag",
            validation: "required",
            dateFormat: "dd.mm.yy",
            showIcon: true,
            maxDate: dateBefore,
            touchUI: true,
            class: "w-full",
            pt: { root: { class: "w-full" } },
        },
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
            label: "Passwort",
            validation: "required|length:6",
            placeholder: "Passwort",
            class: "w-full",
            pt: { root: { class: "w-full" } },
        },
        {
            $formkit: "primePassword",
            name: "password_confirm",
            label: "Passwort bestätigen",
            validation: "required|confirm:password",
            placeholder: "Passwort bestätigen",
            class: "w-full",
            pt: { root: { class: "w-full" } },
        },
    ]
</script>
