<template>
    <div class="flex w-full max-w-screen-xl flex-col items-center gap-2 p-4">
        <h1 class="text-3xl font-bold">Kategorieneditor</h1>
        <Tree v-model:expanded-keys="expandedKeys" :value="nodes" class="w-full">
            <template #default="{ node }">
                <div class="flex items-center gap-2">
                    <i class="pi pi-plus cursor-pointer rounded-md p-1 text-primary hover:bg-gray-300" @click="addChild(node)" />
                    <div class="cursor-pointer" @click="node.type = 'edit'">
                        {{ node.label }}
                    </div>
                    <i
                        class="pi pi-trash cursor-pointer rounded-md p-1 text-primary hover:bg-gray-300"
                        @click="deleteNode(node)" />
                    <div v-if="attributes" class="flex items-center gap-1">
                        <div>Attribute:</div>
                        <div v-for="attribute in node.data.attributes as CategoryAttribute[]" :key="attribute.id">
                            <Chip
                                :label="attribute.name[locale]"
                                removable
                                class="h-6 p-1"
                                @remove="removeAttribute(node, attribute.id)" />
                        </div>
                        <i
                            class="pi pi-pencil cursor-pointer rounded-md p-1 text-primary hover:bg-gray-300"
                            @click="node.type = 'editAttributes'" />
                    </div>
                </div>
            </template>
            <template #edit="{ node }">
                <div>
                    <InputText v-model="node.data.name[locale]" @keyup.enter.self="editCategory(node)" />
                </div>
            </template>
            <template #editAttributes="{ node }">
                <div class="flex items-center gap-4">
                    <div>
                        {{ node.label }}
                    </div>
                    <div v-if="attributes">
                        <MultiSelect
                            v-model="node.data.attributes"
                            display="chip"
                            filter
                            class="max-w-full"
                            :options="attributes"
                            :option-label="'name.' + locale"
                            placeholder="Attribute wählen" />
                    </div>
                    <i
                        class="pi pi-check cursor-pointer rounded-md p-1 text-primary hover:bg-gray-300"
                        @click="editAttributes(node)" />
                    <i
                        class="pi pi-times cursor-pointer rounded-md p-1 text-primary hover:bg-gray-300"
                        @click="cancelEditAttributes(node)" />
                </div>
            </template>
        </Tree>
    </div>
</template>

<script setup lang="ts">
    import { TreeExpandedKeys, TreeNode } from "primevue/tree"
    import { useToast } from "primevue/usetoast"
    import { useConfirm } from "primevue/useconfirm"

    definePageMeta({
        layout: "admin",
        middleware: ["admin"],
    })

    const client = useSupabaseClient<Database>()
    const toast = useToast()
    const confirm = useConfirm()

    const nodes = ref<TreeNode[]>([])
    const expandedKeys = ref<TreeExpandedKeys>({})

    const locale = ref("de")

    const { attributes } = await useAttributes()
    const { categories, refreshCategories } = await useCategories()

    watch(
        categories,
        () => {
            if (!categories.value) return
            nodes.value = []
            const map: Record<string, TreeNode> = {}
            // create Record for each item in categories
            categories.value.forEach((category) => {
                map[category.id] = {
                    key: category.id.toString(),
                    label: category.name[locale.value],
                    data: {
                        id: category.id,
                        path: category.path,
                        name: { ...category.name },
                        attributes: attributes.value?.filter((attribute) => category.attributes?.includes(attribute.id)),
                    },
                }
                expandedKeys.value[category.id] = true
            })
            // connect nodes to their parent nodes
            categories.value.forEach((category) => {
                const node = map[category.id]
                const parentId = category.path.split(".")[category.path.split(".").length - 2]

                if (parentId) {
                    const parent = map[parentId]
                    if (!parent.children) {
                        parent.children = []
                    }
                    parent.children.push(node)
                } else {
                    nodes.value.push(node)
                }
            })
        },
        { immediate: true, deep: true }
    )

    async function editCategory(node: TreeNode) {
        if (!categories.value) return

        const { error } = await client
            .from("categories")
            .update({
                name: node.data.name,
            })
            .eq("id", node.data.id)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolgreich",
                detail: "Änderungen gespeichert",
                life: 3000,
            })
        }
        node.type = "default"
        refreshCategories()
    }

    async function addChild(node: TreeNode) {
        const { data: id, error } = await client
            .from("categories")
            .insert({
                name: { de: "Neue Kategorie", en: "New category" },
                attributes: node.data.attributes.map((attribute: CategoryAttribute) => attribute.id),
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
            const { error } = await client
                .from("categories")
                .update({ path: node.data.path + "." + id.id })
                .eq("id", id.id)
            if (error) {
                toast.add({
                    severity: "error",
                    summary: "Fehler",
                    detail: error.message,
                    life: 3000,
                })
            } else {
                toast.add({
                    severity: "success",
                    summary: "Erfolgreich",
                    detail: "Kategorie erstellt",
                    life: 3000,
                })
            }
        }
        refreshCategories()
    }

    function deleteNode(node: TreeNode) {
        confirm.require({
            message: "Are you sure you want to delete " + node.label + "?",
            header: "Delete confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
                const { error } = await client.from("categories").delete().eq("id", node.data.id)
                if (error) {
                    toast.add({
                        severity: "error",
                        summary: "Fehler",
                        detail: error.message,
                        life: 3000,
                    })
                } else {
                    toast.add({
                        severity: "success",
                        summary: "Erfolgreich",
                        detail: "Kategorie gelöscht",
                        life: 3000,
                    })
                }
                refreshCategories()
            },
        })
    }

    async function editAttributes(node: TreeNode) {
        if (!categories.value) return

        node.children?.forEach((child) => {
            node.data.attributes.forEach((attribute: CategoryAttribute) => {
                if (!(child.data.attributes as CategoryAttribute[]).includes(attribute)) {
                    ;(child.data.attributes as CategoryAttribute[]).push(attribute)
                }
            })
            editAttributes(child)
        })

        const { error } = await client
            .from("categories")
            .update({
                attributes: node.data.attributes.map((attribute: CategoryAttribute) => attribute.id),
            })
            .eq("id", node.data.id)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolgreich",
                detail: "Änderungen gespeichert",
                life: 3000,
            })
        }
        node.type = "default"
        refreshCategories()
    }

    function cancelEditAttributes(node: TreeNode) {
        node.data.attributes = attributes.value?.filter(
            (attribute) => categories.value?.find((category) => category.id === node.data.id)?.attributes?.includes(attribute.id)
        )
        node.type = "default"
    }

    async function removeAttribute(node: TreeNode, attributeID: number) {
        node.data.attributes = node.data.attributes.filter((attribute: CategoryAttribute) => attribute.id !== attributeID)

        const { error } = await client
            .from("categories")
            .update({
                attributes: node.data.attributes.map((attribute: CategoryAttribute) => attribute.id),
            })
            .eq("id", node.data.id)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Erfolgreich",
                detail: "Änderungen gespeichert",
                life: 3000,
            })
        }
        refreshCategories()
    }
</script>
