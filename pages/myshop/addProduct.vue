<template>
    <div class="space-y-4 md:space-y-10">
        <h1 class="text-headline-large font-bold">Artikel hinzufügen</h1>
        <div class="flex w-full flex-wrap justify-center gap-4">
            <ShopImageUpload v-model:img="mainImg" label="Hauptbild" />
            <ShopImageUpload v-model:img="sideImg" label="Seitenansicht" class="hidden sm:block" />
            <ShopImageUpload v-model:img="topImg" label="Ansicht von Oben" class="hidden sm:block" />
        </div>
        <DevOnly>
            <UploadTestProduct />
        </DevOnly>
        <FormKit type="form" v-model="data" id="addProductForm" @submit="addProduct" submit-label="Artikel hinzufügen">
            <FormKitSchema :schema="schema" />
            <div v-if="data.category">
                <ShopAttributeForm v-for="attribute in categoryAttributes" :key="attribute.id" :attribute="attribute" />
            </div>
        </FormKit>
        <pre>
            {{ data }}
        </pre>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        title: "Artikel hinzufügen",
        description: "Fügen Sie ein neues Artikel zu Ihrem Shop hinzu.",
        layout: "myshop",
    })

    const mainImg = ref<File>()
    const sideImg = ref<File>()
    const topImg = ref<File>()

    const { categories } = await useCategories()
    const { attributes } = await useAttributes()

    const categoryAttributes = computed(() => {
        return attributes.value?.filter((attribute: CategoryAttribute) => data.value.category?.attributes.includes(attribute.id))
    })

    const data = ref()

    async function addProduct(data: any) {
        console.log(data)
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
