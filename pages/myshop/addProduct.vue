<template>
    <div class="space-y-4 md:space-y-10">
        <h1 class="text-headline-large font-bold">Artikel hinzufügen</h1>
        <div class="flex w-full flex-wrap justify-center gap-4">
            <ShopImageUpload v-model:img="mainImg" label="Hauptbild" />
            <ShopImageUpload v-model:img="sideImg" label="Seitenansicht" class="hidden sm:block" />
            <ShopImageUpload v-model:img="topImg" label="Ansicht von Oben" class="hidden sm:block" />
        </div>
        <DevOnly>
            <UploadTestProduct :main-img="mainImg" />
        </DevOnly>
        <FormKit type="form" v-model="formData" id="addProductForm" @submit="addProduct" submit-label="Artikel hinzufügen">
            <FormKitSchema :schema="schema" />
            <FormKit v-if="formData.category" type="group" name="attributes">
                <ShopAttributeForm v-for="attribute in categoryAttributes" :key="attribute.id" :attribute="attribute" />
            </FormKit>
        </FormKit>
        <DevOnly>
            <pre>
                {{ formData }}
            </pre>
        </DevOnly>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Artikel hinzufügen",
        description: "Fügen Sie ein neues Artikel zu Ihrem Shop hinzu.",
        layout: "myshop",
    })

    const supabase = useSupabaseClient<Database>()
    const toast = useToast()
    const { myshop } = await useMyshop()

    const mainImg = ref<File>()
    const sideImg = ref<File>()
    const topImg = ref<File>()

    const { categories } = await useCategories()
    const { attributes } = await useAttributes()

    const categoryAttributes = computed(() => {
        return attributes.value?.filter((attribute: CategoryAttribute) =>
            formData.value.category?.attributes.includes(attribute.id)
        )
    })

    const formData = ref()

    async function addProduct(formData: {
        name: string
        price: string
        description: string
        category: Category
        attributes: Record<string, string>
    }) {
        console.log(formData)
        if (!myshop.value) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "ShopID not found",
                life: 5000,
            })
            return
        }
        if (!mainImg.value) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "Mindestens ein Bild ist erforderlich",
                life: 5000,
            })
            return
        }
        const { data: productId, error: idError } = await supabase
            .from("products")
            .insert([
                {
                    name: formData.name,
                    price: formData.price,
                    description: formData.description,
                    shop_id: myshop.value!.id,
                    category: 2,
                    attributes: formData.attributes,
                },
            ])
            .select("id")
            .single()
        if (idError) {
            toast.add({ severity: "error", summary: "Fehler", detail: idError.message, life: 5000 })
        }
        if (!productId) return
        const { error } = await supabase.storage
            .from(myshop.value.id)
            .upload("productImgs/" + productId.id + "/mainImg", mainImg.value)
        if (error) {
            toast.add({ severity: "error", summary: "Fehler", detail: error.message, life: 5000 })
            return
        }
        toast.add({
            severity: "success",
            summary: "Erfolg",
            detail: "Artikel wurde hinzugefügt",
        })
    }

    const schema = [
        {
            $formkit: "primeInputText",
            name: "name",
            label: "Name",
            validation: "length:6|required",
            placeholder: "Name",
            class: "w-full",
        },
        {
            $formkit: "primeInputNumber",
            name: "price",
            label: "Preis",
            mode: "currency",
            currency: "EUR",
            locale: "de-DE",
            validation: "number|required",
            placeholder: "Preis",
            class: "w-full",
        },
        {
            $formkit: "primeTextarea",
            name: "description",
            label: "Beschreibung",
            validation: "length:10|required",
            placeholder: "Beschreibung",
            class: "w-full",
        },
        {
            $formkit: "primeDropdown",
            name: "category",
            label: "Kategorie",
            validation: "required",
            placeholder: "Kategorie",
            optionLabel: "name.de",
            options: categories.value,
            editable: true,
            showClear: true,

            class: "w-full",
        },
    ]
</script>
