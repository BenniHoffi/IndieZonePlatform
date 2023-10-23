<template>
    <div v-if="!submitted" class="w-full">
        <FormKit id="shopownerRegistration" type="form" :actions="false" @submit="onSubmit">
            <FormKit name="multistep" type="multi-step" tab-style="progress" :hide-progress-labels="true">
                <FormKit type="step" name="shopname">
                    <FormKitSchema :schema="schemaShopname" />
                </FormKit>
                <FormKit type="step" name="owner">
                    <FormKitSchema :schema="schemaOwner" />
                </FormKit>
                <FormKit type="step" name="address" previous-label="Zurück">
                    <FormKitSchema :schema="schemaAddress" />
                </FormKit>
                <FormKit type="step" name="category" previous-label="Zurück">
                    <FormKitSchema :schema="schemaCategory" />
                </FormKit>
                <FormKit type="step" name="slogan" previous-label="Zurück">
                    <FormKitSchema :schema="schemaSlogan" />
                </FormKit>
                <FormKit type="step" name="image" previous-label="Zurück">
                    <h2 class="mb-5 text-headline-small">
                        Die perfekte Beschreibung wird durch ein Foto natürlich noch abgerundet.
                    </h2>
                    <div class="mx-auto max-w-xs">
                        <FormImageUpload
                            v-model:img="shopImg"
                            label="Klicken zum hochladen / Kamera."
                            @clear="shopImg = undefined" />
                        <div class="text-label-small">
                            Falls du gerade kein Foto hast, kannst du dies auch später in deinem IndieZone Shop hinzufügen.
                        </div>
                    </div>
                </FormKit>
                <FormKit type="step" name="telephone" previous-label="Zurück">
                    <FormKitSchema :schema="schemaTelephone" />
                </FormKit>
                <FormKit type="step" name="openingHours" previous-label="Zurück">
                    <h2 class="mb-5 text-headline-small">Wann hat dein Laden geöffnet?</h2>
                    <FormOpeningHours v-model="openingHours" />
                    <template #stepNext>
                        <FormKit type="submit" label="Speichern" />
                    </template>
                </FormKit>
            </FormKit>
        </FormKit>
    </div>
    <div v-else-if="!verification" class="w-full">
        <h3 class="mb-10">
            Geschafft! Du kannst schonmal den Händlerbereich anschauen und bis zu 50 Produkte einstellen. Bisher ist er jedoch
            noch nicht für Kunden freigeschaltet. Dafür brauchen wir noch deine Gewerbeanmeldung.
        </h3>
        <div class="flex flex-col items-center gap-4">
            <Button label="Zum Händlerbereich" @click="navigateTo('/myshop')">
                <template #icon>
                    <Icon name="material-symbols:storefront-outline" />
                </template>
            </Button>
            <Button label="Gewerbeanmeldung hochladen" @click="verification = true">
                <template #icon>
                    <Icon name="material-symbols:upload-file-outline" />
                </template>
            </Button>
            <small class="cursor-pointer underline" @click="whyVerificationDialog = true"
                >Warum braucht ihr meine Gewerbeanmeldung?</small
            >
            <Dialog v-model:visible="whyVerificationDialog" modal header="Die Frage nach der Gewerbeanmeldung." class="max-w-lg">
                <div>
                    Leider passiert es auch uns, wie vielen anderen Webseiten, dass Bots oder gelangweilte Menschen unechte
                    Profile erstellen. Das hinterlässt enttäuschte Kunden und schadet damit auch all unseren Händlern. Um unsere
                    und eure Kunden davor zu schützen, haben wir uns entschieden die Gewerbeanmeldung als Kontrolle einzuführen ob
                    ein registrierter Laden auch wirklich existiert.
                </div>
                <template #footer>
                    <Button label="Verstanden" @click="whyVerificationDialog = false" />
                </template>
            </Dialog>
        </div>
    </div>
    <div v-else-if="!finished">
        <h3 class="mb-10">Lade hier deine Gewerbeanmeldung hoch.</h3>
        <FormPdfUpload v-model="pdf" label="Klicken zum hochladen." />
        <div class="text-label-small text-error-40">{{ verificationError }}</div>
        <div class="mb-3 mt-1 cursor-pointer text-label-small underline" @click="whoVerifiesDialog = true">
            Wer prüft meine Gewerbeanmeldung?
        </div>
        <Dialog v-model:visible="whoVerifiesDialog" modal header="Das Prüfen der Gewerbeanmeldung." class="max-w-lg">
            <div>
                Deine Gewerbeanmeldung wird von einem Mitarbeiter oder einer Mitarbeiterin in unseren Standorten in Leipzig oder
                Stuttgart geprüft. Näheres zum Datenschutz erfährst du hier.
            </div>
            <template #footer>
                <Button label="Verstanden" @click="whoVerifiesDialog = false" />
            </template>
        </Dialog>
        <div class="mt-2 flex w-full justify-between">
            <Button label="Zurück" size="small" @click="verification = false" />
            <Button label="Absenden" size="small" type="submit" @click="uploadPdf" />
        </div>
    </div>
    <div v-else>
        <h3 class="mb-10">
            Perfekt. Jetzt kannst du dich zurücklehnen. Du bekommst eine Nachricht sobald wir deinen Laden freigeschaltet haben.
            In der Zwischenzeit kannst du auch schon erste Artikel einstellen und den Händlerbereich von IndieZone entdecken.
        </h3>
        <div class="flex w-full flex-col items-center gap-4">
            <Button label="Zur Ladenvorschau" @click="navigateTo('/shop/shopview')">
                <template #icon>
                    <Icon name="material-symbols:visibility-outline" />
                </template>
            </Button>
            <Button label="Zum Händlerbereich" icon="pi pi-home" @click="navigateTo('/shop')">
                <template #icon>
                    <Icon name="material-symbols:storefront-outline" />
                </template>
            </Button>
        </div>
    </div>
    <DevOnly>
        <pre>
            {{ submit }}
        </pre>
    </DevOnly>
</template>
<script setup lang="ts">
    import { useToast } from "primevue/usetoast"

    const toast = useToast()
    const user = useSupabaseUser()
    const supabase = useSupabaseClient<Database>()
    const shopImg = ref<File>()
    const pdf = ref<File>()
    const openingHours = ref<OpeningHoursDay[][]>([
        [{ from: "09:00", to: "18:00" }],
        [{ from: "09:00", to: "18:00" }],
        [{ from: "09:00", to: "18:00" }],
        [{ from: "09:00", to: "18:00" }],
        [{ from: "09:00", to: "18:00" }],
        [{ from: "09:00", to: "12:00" }],
        [],
    ])

    const shopID = ref("")
    const submitted = ref(false)
    const verification = ref(false)
    const whyVerificationDialog = ref(false)
    const verificationError = ref<string>()
    const whoVerifiesDialog = ref(false)
    const finished = ref(false)

    const submit = ref()

    async function onSubmit(submitData: {
        multistep: {
            shopname: { shopname: string }
            owner: { shopowner_name: string }
            address: {
                street_address: string
                zip_code: string
                city: string
            }
            category: { category: string }
            slogan: { slogan: string }
            telephone: { telephone: string }
        }
    }) {
        submit.value = submitData
        console.log(submitData)
        if (!user.value) return
        const { data: shop, error } = await supabase
            .from("shops")
            .insert({
                name: submitData.multistep.shopname.shopname,
                shopowner_name: submitData.multistep.owner.shopowner_name,
                category: submitData.multistep.category.category,
                slogan: submitData.multistep.slogan.slogan,
                telephone: submitData.multistep.telephone.telephone,
                street_adress: submitData.multistep.address.street_address,
                zip_code: submitData.multistep.address.zip_code,
                city: submitData.multistep.address.city,
                country: "Deutschland",
                opening_hours: openingHours.value,
            })
            .select("id")
            .single()
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        } else {
            supabase.auth.refreshSession()
            shopID.value = shop.id
            if (shopImg.value) {
                const success = await useUploadFile(shop.id, "shopImages/img1", shopImg.value)
                if (!success) {
                    toast.add({
                        severity: "error",
                        summary: "Fehler",
                        detail: "Das Bild konnte nicht hochgeladen werden. Du kannst es in deiner Shopansicht erneut versuchen",
                        life: 10000,
                    })
                }
            }
            toast.add({
                severity: "success",
                summary: "Erfolg",
                detail: "Deine Daten wurden erfolgreich übermittelt.",
                life: 3000,
            })
            submitted.value = true
        }
    }

    async function uploadPdf() {
        if (!pdf.value) {
            verificationError.value = "Bitte wähle eine Datei aus"
            return
        }
        if (!shopID.value) {
            verificationError.value = "ShopID konnte nicht gefunden werden"
            return
        }
        const success = await useUploadFile(shopID.value, "shopImages/pdf", pdf.value)
        if (!success) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "Das PDF konnte nicht hochgeladen werden. Du kannst es in deiner Shopansicht erneut versuchen",
                life: 10000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolg",
                detail: "Deine Daten wurden erfolgreich übermittelt.",
                life: 3000,
            })
            finished.value = true
        }
    }

    const schemaShopname = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Wie heißt dein Laden?",
        },
        {
            $formkit: "primeInputText",
            name: "shopname",
            label: "Ladenname",
            validation: "required|length:6",
            placeholder: "Ladenname",
            class: "w-full",
            labelClass: "hidden",
        },
    ]

    const schemaOwner = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Wie heißt der Besitzer des Ladens?",
        },
        {
            $formkit: "primeInputText",
            name: "shopowner_name",
            value: user.value?.user_metadata.name,
            label: "Ladenbesitzer",
            validation: "required|length:6",
            placeholder: "Name des Ladenbesitzers",
            class: "w-full",
            labelClass: "hidden",
        },
    ]

    const schemaAddress = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Und wo können ihn deine Kunden finden?",
        },
        {
            $formkit: "primeInputText",
            name: "street_address",
            label: "Straße und Hausnummer",
            validation: "required",
            placeholder: "Straße und Hausnummer",
            class: "w-full",
        },
        {
            $formkit: "primeInputText",
            name: "zip_code",
            label: "Postleitzahl",
            validation: "required",
            placeholder: "Postleitzahl",
            class: "w-full",
        },
        {
            $formkit: "primeInputText",
            name: "city",
            label: "Ort",
            validation: "required",
            placeholder: "Ort",
            class: "w-full",
        },
    ]
    const schemaCategory = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Was ist es für ein Laden?",
        },
        {
            $formkit: "primeInputText",
            name: "category",
            label: "Kategorie",
            validation: "required",
            placeholder: "zB. Buchladen, Schuhgeschäft...",
            class: "w-full",
            labelClass: "hidden",
        },
    ]
    const schemaSlogan = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Wie willst du deinen neuen Kunden deinen Laden in einem Satz vorstellen?",
        },
        {
            $formkit: "primeInputText",
            name: "slogan",
            label: "Kurzbeschreibung",
            validation: "required",
            placeholder: "Kurzbeschreibung",
            class: "w-full",
            labelClass: "hidden",
        },
    ]

    const schemaTelephone = [
        {
            $el: "h2",
            attrs: {
                class: "text-headline-small mb-3",
            },
            children: "Hast du eine Telefonnummer, unter der Kunden dich erreichen können?",
        },
        {
            $formkit: "primeInputText",
            name: "telephone",
            label: "Telefonnummer",
            validation: "required",
            placeholder: "Telefonnummer",
            class: "w-full",
            labelClass: "hidden",
        },
    ]
</script>
