<template>
    <div class="flex flex-col items-center gap-4 p-4">
        <h1 class="text-display-medium font-bold">Role Editor</h1>
        <Dialog v-model:visible="dialogVisibility" modal header="Rolle Hinzufügen" class="w-full max-w-xl">
            <div class="flex flex-col items-center gap-2">
                <div>
                    <div class="flex gap-2">
                        <div class="font-bold">Name:</div>
                        {{ user.name }}
                    </div>
                    <div class="flex gap-2">
                        <div class="font-bold">Username:</div>
                        {{ user.username }}
                    </div>
                    <div class="flex gap-2">
                        <div class="font-bold">E-Mail:</div>
                        {{ user.email }}
                    </div>
                    <div class="flex gap-2">
                        <div class="font-bold">Group:</div>
                        {{ group.name }}
                    </div>
                </div>
                <InputText v-model="role" @keyup.enter="addRole()" />
            </div>
            <template #footer>
                <Button label="Hinzufügen" @click="addRole()" />
                <Button label="Abbrechen" severity="danger" @click="dialogVisibility = false" />
            </template>
        </Dialog>
        <DataTable :value="roles" data-key="id" :loading="rolesPending">
            <Column field="name" header="Name" />
            <Column field="username" header="Benutzername" />
            <Column field="email" header="E-Mail" />
            <Column field="groups" header="Gruppen und Rollen">
                <template #body="{ data }">
                    <div v-if="!data.groups?.['158a70e3-64c0-49a5-b52f-37ed2b9b9b80']">
                        <Button
                            outlined
                            label="Add to admin"
                            class="mb-4"
                            @click="openDialog(data.id, { name: 'admin', roles: [] }, '158a70e3-64c0-49a5-b52f-37ed2b9b9b80')">
                            <template #icon>
                                <Icon name="material-symbols:add" class="mr-2" />
                            </template>
                        </Button>
                    </div>
                    <div
                        v-for="(group, groupId) in <Record<string, { name: string; roles: string[] }>>data.groups"
                        :key="groupId">
                        <div class="flex items-start gap-4">
                            <div>
                                <div class="font-bold">{{ group.name }}:</div>
                                <Button text rounded class="aspect-square" @click="openDialog(data.id, group, groupId)">
                                    <template #icon>
                                        <Icon name="material-symbols:add" />
                                    </template>
                                </Button>
                            </div>
                            <div class="flex flex-wrap gap-1">
                                <Chip
                                    v-for="role in group.roles"
                                    :key="role"
                                    :label="role"
                                    removable
                                    :pt="{ label: 'm-0', root: 'px-2 py-1' }"
                                    @remove.prevent="
                                        () =>
                                            confirm.require({
                                                message: 'Are you sure you want to delete role ' + role + '?',
                                                accept: () => {
                                                    deleteRole(data.id, groupId, role)
                                                },
                                                reject: () => {
                                                    refreshRoles()
                                                },
                                            })
                                    " />
                            </div>
                        </div>
                        <Divider />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
    import { useToast } from "primevue/usetoast"
    import { useConfirm } from "primevue/useconfirm"

    definePageMeta({
        title: "IndieZone - Roles",
        middleware: ["admin"],
        layout: "admin",
    })

    const confirm = useConfirm()
    const toast = useToast()
    const supabase = useSupabaseClient<Database>()

    const dialogVisibility = ref(false)
    const user = ref()
    const group = ref()
    const role = ref("")
    const groupId = ref()

    const { roles, refreshRoles, rolesPending } = await useRoles()

    function openDialog(editingUserId: string, editingGroup: any, editingGroupId: string) {
        console.log(editingUserId, editingGroup, editingGroupId)
        dialogVisibility.value = true
        user.value = roles.value?.find((role) => role.id === editingUserId)
        group.value = editingGroup
        groupId.value = editingGroupId
    }

    async function addRole() {
        if (!user.value || !group.value || !role.value) return
        console.log(group.value)
        const { error } = await supabase.from("group_users").insert({
            group_id: groupId.value,
            user_id: user.value.id,
            role: role.value,
        })
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim hinzuügen der Rolle",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Rolle hinzugefügt",
                detail: "Die Rolle wurde erfolgreich hinzugefügt",
                life: 3000,
            })
        }
        dialogVisibility.value = false
        refreshRoles()
    }

    async function deleteRole(userId: string, groupId: string, role: string) {
        const { error } = await supabase
            .from("group_users")
            .delete()
            .eq("user_id", userId)
            .eq("group_id", groupId)
            .eq("role", role)
        if (error) {
            toast.add({
                severity: "error",
                summary: "Fehler beim löschen der Rolle",
                detail: error.message,
                life: 3000,
            })
        } else {
            toast.add({
                severity: "success",
                summary: "Rolle gelöscht",
                detail: "Die Rolle wurde erfolgreich gelöscht",
                life: 3000,
            })
        }
        refreshRoles()
    }
</script>
