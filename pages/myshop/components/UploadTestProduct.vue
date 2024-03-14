<template>
    <div>
        <Button label="Testprodukt erstellen" @click="uploadTestProduct" />
        <pre>{{ product }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const supabase = useSupabaseClient<Database>()
    const toast = useToast()
    const { myshop } = await useMyshop()
    const product = ref()

    const { mainImg } = defineProps<{
        mainImg?: File
    }>()

    async function uploadTestProduct() {
        if (!myshop.value) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "ShopID not found",
            })
            return
        }
        if (!mainImg) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: "Mindestens ein Bild ist erforderlich",
            })
            return
        }
        const { data, error: idError } = await supabase
            .from("products")
            .insert([
                {
                    name: "Testprodukt",
                    price: "100",
                    description: "Das ist ein Testprodukt",
                    shop_id: myshop.value!.id,
                    category: 2,
                    attributes: {
                        "5": 12,
                        "6": { de: "Regional", en: "regional" },
                    },
                },
            ])
            .select()
            .single()
        if (idError) {
            toast.add({ severity: "error", summary: "Fehler", detail: idError.message })
        }
        product.value = data
        if (!product.value) return
        const { error } = await supabase.storage
            .from(myshop.value.id)
            .upload("productImgs/" + product.value.id + "/mainImg", mainImg)
        if (error) {
            toast.add({ severity: "error", summary: "Fehler", detail: error.message })
            return
        }
        toast.add({
            severity: "success",
            summary: "Erfolg",
            detail: "Artikel wurde hinzugefügt",
        })
    }
</script>
